import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, MessageSquare, Database, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const StatCard = ({ title, value, icon: Icon, testId }) => (
  <Card className="glass-card" data-testid={testId}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold font-heading mt-2 text-primary">{value}</p>
        </div>
        <div className="p-3 bg-primary/10 rounded-sm">
          <Icon className="text-primary" size={24} />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    document_count: 0,
    chunk_count: 0,
    query_count: 0,
    recent_queries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${API}/dashboard/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" data-testid="dashboard-page">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground">Overview of your RAG system performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Documents"
          value={stats.document_count}
          icon={FileText}
          testId="stat-documents"
        />
        <StatCard
          title="Chunks"
          value={stats.chunk_count}
          icon={Database}
          testId="stat-chunks"
        />
        <StatCard
          title="Queries"
          value={stats.query_count}
          icon={MessageSquare}
          testId="stat-queries"
        />
      </div>

      <Card className="glass-card" data-testid="recent-queries-card">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <Clock size={20} />
            Recent Queries
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : stats.recent_queries.length === 0 ? (
            <p className="text-muted-foreground">No queries yet. Start by uploading documents and asking questions!</p>
          ) : (
            <div className="space-y-3">
              {stats.recent_queries.map((query, idx) => (
                <div
                  key={idx}
                  data-testid={`recent-query-${idx}`}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-sm border border-border hover:border-primary/30 transition-all duration-200"
                >
                  <div className="flex-1">
                    <p className="text-sm font-mono">{query.query}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(query.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <Badge
                    variant={query.success ? 'default' : 'destructive'}
                    className="ml-4"
                    data-testid={`query-status-${idx}`}
                  >
                    {query.success ? 'Success' : 'Failed'}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}