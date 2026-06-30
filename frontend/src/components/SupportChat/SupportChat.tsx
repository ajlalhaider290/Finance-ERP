import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles } from 'lucide-react';
import apiClient from '@/services/apiClient';
import './SupportChat.css';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    const userMessage: ChatMessage = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await apiClient.post('/support-agent', {
        message: trimmed,
        history: messages,
      });

      const aiMessage: ChatMessage = {
        role: 'model',
        content: response.data.reply,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        'Failed to get a response. Please try again.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple markdown rendering for AI messages
  const renderMarkdown = (text: string) => {
    // Split into lines and process
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let listType: 'ul' | 'ol' | null = null;

    const flushList = () => {
      if (listItems.length > 0 && listType) {
        const Tag = listType;
        elements.push(
          <Tag key={`list-${elements.length}`}>
            {listItems.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: inlineFormat(item) }} />
            ))}
          </Tag>
        );
        listItems = [];
        listType = null;
      }
    };

    const inlineFormat = (line: string): string => {
      return line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/`(.+?)`/g, '<code>$1</code>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>');
    };

    for (const line of lines) {
      const bulletMatch = line.match(/^[-*]\s+(.+)/);
      const orderedMatch = line.match(/^\d+\.\s+(.+)/);

      if (bulletMatch) {
        if (listType !== 'ul') {
          flushList();
          listType = 'ul';
        }
        listItems.push(bulletMatch[1]);
      } else if (orderedMatch) {
        if (listType !== 'ol') {
          flushList();
          listType = 'ol';
        }
        listItems.push(orderedMatch[1]);
      } else {
        flushList();
        if (line.trim()) {
          elements.push(
            <p
              key={`p-${elements.length}`}
              dangerouslySetInnerHTML={{ __html: inlineFormat(line) }}
            />
          );
        }
      }
    }
    flushList();

    return <>{elements}</>;
  };

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          className="support-chat-trigger"
          onClick={handleOpen}
          aria-label="Open support chat"
          id="support-chat-trigger"
        >
          <MessageCircle />
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className={`support-chat-panel ${isClosing ? 'closing' : ''}`} role="dialog" aria-label="Support Chat">
          {/* Header */}
          <div className="support-chat-header">
            <div className="support-chat-header-info">
              <div className="support-chat-header-avatar">
                <Bot />
              </div>
              <div className="support-chat-header-text">
                <h3>Finance ERP Assistant</h3>
                <p>Powered by Gemini AI</p>
              </div>
            </div>
            <button className="support-chat-close" onClick={handleClose} aria-label="Close chat">
              <X />
            </button>
          </div>

          {/* Messages */}
          <div className="support-chat-messages">
            {messages.length === 0 && !isLoading && (
              <div className="support-chat-welcome">
                <div className="support-chat-welcome-icon">
                  <Sparkles />
                </div>
                <h4>Hi there! 👋</h4>
                <p>
                  I'm your Finance ERP assistant. Ask me about reimbursements,
                  invoices, approvals, or anything else in the system.
                </p>
              </div>
            )}

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`support-msg ${msg.role === 'user' ? 'support-msg-user' : 'support-msg-ai'}`}
              >
                {msg.role === 'user' ? msg.content : renderMarkdown(msg.content)}
              </div>
            ))}

            {isLoading && (
              <div className="support-msg support-msg-ai">
                <div className="support-msg-loading">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {error && (
              <div className="support-msg-error">{error}</div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="support-chat-input-area">
            <textarea
              ref={inputRef}
              className="support-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              rows={1}
              disabled={isLoading}
              id="support-chat-input"
            />
            <button
              className="support-chat-send"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              id="support-chat-send"
            >
              <Send />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SupportChat;
