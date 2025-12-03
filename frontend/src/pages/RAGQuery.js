import React, { useState } from 'react';
import axios from 'axios';
import { Send, Sparkles, Clock, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function RAGQuery() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);

  const handleQuery = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error('Please enter a question');
      return;
    }

    setLoading(true);

    try {
      const result = await axios.post(`${API}/query`, {
        query: query,
        top_k: 3,
      });

      const newResponse = {
        query: query,
        ...result.data,
        timestamp: new Date().toISOString(),
      };

      setResponse(newResponse);
      setHistory([newResponse, ...history]);
      setQuery('');
      toast.success('Answer generated successfully!');
    } catch (error) {
      console.error('Error querying RAG:', error);
      toast.error(error.response?.data?.detail || 'Failed to generate answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" data-testid="rag-query-page">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-2">
          RAG Query
        </h1>
        <p className="text-muted-foreground">Ask questions and get AI-powered answers from your documents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-16rem)]">
        {/* Query Input Section */}
        <div className="space-y-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <form onSubmit={handleQuery} className="space-y-4">
                <div>
                  <label className="text-sm font-heading mb-2 block">Your Question</label>
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="What is the main topic of the documents?"
                    className="bg-secondary border-border"
                    data-testid="query-input"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  data-testid="query-submit-button"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="animate-spin" size={16} />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={16} />
                      Ask Question
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Current Response */}
          {response && (
            <Card className="glass-card" data-testid="query-response">
              <CardContent className="p-6 space-y-4">
                <div className="chat-message-user p-4 rounded-sm">
                  <p className="font-heading font-semibold text-sm mb-1">Your Question</p>
                  <p className="font-mono text-sm">{response.query}</p>
                </div>

                <div className="chat-message-ai p-4 rounded-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-primary" size={16} />
                    <p className="font-heading font-semibold text-sm">AI Answer</p>
                  </div>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{response.answer}</div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{response.latency_ms.toFixed(0)}ms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={12} />
                    <span>{response.token_count} tokens</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {response.sources.length} sources
                  </Badge>
                </div>

                {response.sources && response.sources.length > 0 && (
                  <div className="border-t border-border pt-4">
                    <p className="font-heading font-semibold text-sm mb-3">Sources</p>
                    <div className="space-y-2">
                      {response.sources.map((source, idx) => (
                        <div
                          key={idx}
                          className="bg-secondary/30 p-3 rounded-sm text-xs"
                          data-testid={`source-${idx}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-mono text-muted-foreground">Chunk {source.chunk_index + 1}</span>
                            <Badge variant="secondary" className="text-xs">
                              {(source.similarity * 100).toFixed(1)}% match
                            </Badge>
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{source.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Query History */}
        <Card className="glass-card" data-testid="query-history">
          <CardContent className="p-6">
            <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
              <Clock size={18} />
              Query History
            </h3>
            <ScrollArea className="h-[calc(100vh-24rem)]">
              {history.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-8">
                  No queries yet. Ask your first question!
                </p>
              ) : (
                <div className="space-y-4">
                  {history.map((item, idx) => (
                    <div
                      key={idx}
                      className="border border-border rounded-sm p-4 hover:border-primary/30 transition-all duration-200 cursor-pointer"
                      onClick={() => setResponse(item)}
                      data-testid={`history-item-${idx}`}
                    >
                      <p className="font-mono text-sm mb-2">{item.query}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                        <span>•</span>
                        <span>{item.latency_ms.toFixed(0)}ms</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}