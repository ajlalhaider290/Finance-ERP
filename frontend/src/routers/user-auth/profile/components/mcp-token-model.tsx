import React, { useState } from 'react';
import { Copy, Link, Check, AlertTriangle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Button,
  Label,
  Alert,
  AlertDescription,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui';
import { BASE_URL } from '@/config/app';

interface MCPTokenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type McpTab = 'standard' | 'developer';

const MCPTokenModal: React.FC<MCPTokenModalProps> = ({ open, onOpenChange }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<McpTab>('standard');
  const [serverName, setServerName] = useState('finance_erp');
  const [endpoint, setEndpoint] = useState(BASE_URL + '/mcp');

  const mcpUrl = BASE_URL + '/mcp';
  const generatedConfig = `{
  "mcpServers": {
    "${serverName}": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "${endpoint}"]
    }
  }
}`;

  const handleCopy = async () => {
    const text = activeTab === 'standard' ? mcpUrl : generatedConfig;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setCopied(false);
    setActiveTab('standard');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="h-5 w-5" />
            MCP Configuration
          </DialogTitle>
          <DialogDescription>
            Connect your MCP server using a hosted OAuth link or a local Claude Desktop config.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as McpTab)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="developer">Developer</TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="space-y-4 mt-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> This OAuth link is used to connect your MCP server via
                Custom Connectors. You must copy this link and configure it in your connector setup.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label className="text-sm font-medium">OAuth Connection URL</Label>
              <div className="flex gap-2">
                <Input
                  readOnly
                  value={mcpUrl}
                  className="font-mono text-sm min-w-0"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  title="Copy to clipboard"
                >
                  {copied && activeTab === 'standard' ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Copy this OAuth link and add it in Custom Connectors configuration to connect your MCP server.
            </p>

            <div className="rounded-md bg-muted p-3 text-sm">
              <p className="font-medium mb-1">How to use:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Copy the OAuth link</li>
                <li>Go to Custom Connectors</li>
                <li>Add a new connector</li>
                <li>Paste the link and complete setup</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="developer" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Server Name
                </Label>
                <Input
                  value={serverName}
                  onChange={(e) => setServerName(e.target.value)}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  MCP Endpoint URL
                </Label>
                <Input
                  readOnly
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  className="font-mono text-sm min-w-0"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Generated Config
                </Label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7 gap-1 text-xs"
                >
                  {copied && activeTab === 'developer' ? (
                    <>
                      <Check className="h-3 w-3 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <pre className="rounded-md border bg-muted/50 p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
                <code>{generatedConfig}</code>
              </pre>
            </div>

            <div className="rounded-md bg-muted p-3 text-sm">
              <p className="font-medium mb-1">How to use:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Copy the config snippet above</li>
                <li>Open your tool’s MCP config file (e.g., claude_desktop_config.json, Cursor MCP settings, or extension config in VS Code).</li>
                <li>Paste it inside the <code className="font-mono text-xs">"mcpServers": {'{}'}</code> block</li>
                <li>Save the file and restart the application.</li>
                <li>Make sure your MCP server is running at the given URL.</li>
                <li> After restart, the MCP tools will appear automatically.</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                {activeTab === 'developer' ? 'Copy Config' : 'Copy'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MCPTokenModal;
