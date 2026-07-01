import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, ChevronDown, LifeBuoy, Loader2, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import apiClient from '@/services/apiClient';
import { RootState, useAppSelector } from '@/store';
import './SupportChat.css';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

const quickPrompts = [
  'How do I submit a reimbursement?',
  'Why can I not see an invoice?',
  'What happens after invoice approval?',
];

const SupportChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const user = useAppSelector((state: RootState) => state.session.user);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      window.setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.style.height = 'auto';
    inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 112)}px`;
  }, [input]);

  const handleOpen = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 160);
  };

  const sendMessage = async (messageText: string) => {
    const trimmed = messageText.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    const userMessage: ChatMessage = { role: 'user', content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
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
      const errorMsg = err?.response?.data?.message || 'The assistant could not respond right now.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => sendMessage(input);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessage = (text: string) => {
    const blocks = text
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);

    if (blocks.length === 0) {
      return null;
    }

    return blocks.map((line, index) => {
      const bullet = line.match(/^[-*]\s+(.+)/);
      const ordered = line.match(/^\d+\.\s+(.+)/);

      if (bullet || ordered) {
        return (
          <div key={`${index}-${line}`} className="support-msg-list-row">
            <span className="support-msg-list-marker">{ordered ? `${line.split('.')[0]}.` : '-'}</span>
            <span>{bullet?.[1] || ordered?.[1]}</span>
          </div>
        );
      }

      return <p key={`${index}-${line}`}>{line}</p>;
    });
  };

  const roleLabel = user?.role ? user.role.replace(/([A-Z])/g, ' $1').trim() : 'Finance user';

  return (
    <>
      {!isOpen && (
        <button className="support-chat-trigger" onClick={handleOpen} aria-label="Open finance assistant" id="support-chat-trigger">
          <span className="support-chat-trigger-icon">
            <MessageCircle />
          </span>
          <span className="support-chat-trigger-text">Assistant</span>
        </button>
      )}

      {isOpen && (
        <section className={`support-chat-panel ${isClosing ? 'closing' : ''}`} role="dialog" aria-label="Finance ERP Assistant">
          <header className="support-chat-header">
            <div className="support-chat-header-info">
              <div className="support-chat-header-avatar">
                <Bot />
              </div>
              <div className="support-chat-header-text">
                <h3>Finance Assistant</h3>
                <p>{roleLabel} support</p>
              </div>
            </div>
            <button className="support-chat-close" onClick={handleClose} aria-label="Close assistant">
              <ChevronDown className="support-chat-minimize" />
              <X className="support-chat-close-icon" />
            </button>
          </header>

          <div className="support-chat-context">
            <LifeBuoy />
            <span>Connected to Finance ERP help</span>
          </div>

          <div className="support-chat-messages">
            {messages.length === 0 && !isLoading && (
              <div className="support-chat-welcome">
                <div className="support-chat-welcome-icon">
                  <Sparkles />
                </div>
                <h4>How can I help?</h4>
                <p>Ask about reimbursements, invoices, approvals, intercompany transactions, or access issues.</p>
                <div className="support-chat-prompts">
                  {quickPrompts.map((prompt) => (
                    <button key={prompt} type="button" onClick={() => sendMessage(prompt)} disabled={isLoading}>
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, index) => (
              <div key={`${msg.role}-${index}`} className={`support-msg-row ${msg.role === 'user' ? 'support-msg-row-user' : 'support-msg-row-ai'}`}>
                {msg.role === 'model' && (
                  <div className="support-msg-avatar">
                    <Bot />
                  </div>
                )}
                <div className={`support-msg ${msg.role === 'user' ? 'support-msg-user' : 'support-msg-ai'}`}>
                  {msg.role === 'user' ? <p>{msg.content}</p> : renderMessage(msg.content)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="support-msg-row support-msg-row-ai">
                <div className="support-msg-avatar">
                  <Bot />
                </div>
                <div className="support-msg support-msg-ai support-msg-loading-wrap">
                  <Loader2 className="support-msg-loader" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}

            {error && <div className="support-msg-error">{error}</div>}

            <div ref={messagesEndRef} />
          </div>

          <footer className="support-chat-input-area">
            <textarea
              ref={inputRef}
              className="support-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question"
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
          </footer>
        </section>
      )}
    </>
  );
};

export default SupportChat;
