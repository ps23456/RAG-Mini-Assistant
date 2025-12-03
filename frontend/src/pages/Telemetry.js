import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, TrendingUp, DollarSign, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const StatCard = ({ title, value, icon: Icon, subtitle, testId }) => (
  <Card className="glass-card" data-testid={testId}>
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        <Icon className="text-primary" size={18} />
      </div>
      <p className="text-2xl font-bold font-heading text-primary">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </CardContent>
  </Card>
);

export default function Telemetry() {
  const [stats, setStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTelemetry();
  }, []);

  const fetchTelemetry = async () => {
    try {
      const [statsRes, historyRes] = await Promise.all([
        axios.get(`${API}/telemetry/stats`),
        axios.get(`${API}/telemetry/history?limit=20`),
      ]);

      setStats(statsRes.data);
      setHistory(historyRes.data);
    } catch (error) {
      console.error('Error fetching telemetry:', error);
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data
  const latencyData = history.slice(0, 10).reverse().map((item, idx) => ({
    name: `Q${idx + 1}`,
    latency: item.latency_ms,
  }));

  const tokenData = history.slice(0, 10).reverse().map((item, idx) => ({
    name: `Q${idx + 1}`,
    tokens: item.token_count || 0,
  }));

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" data-testid="telemetry-page">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-2">
          Analytics & Telemetry
        </h1>
        <p className="text-muted-foreground">Monitor system performance and usage metrics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Queries"
          value={stats?.total_queries || 0}
          icon={Activity}
          testId="stat-total-queries"
        />
        <StatCard
          title="Avg Latency"
          value={`${(stats?.avg_latency_ms || 0).toFixed(0)}ms`}
          icon={Clock}
          testId="stat-avg-latency"
        />
        <StatCard
          title="Total Tokens"
          value={stats?.total_tokens || 0}
          icon={TrendingUp}
          subtitle="Processed"
          testId="stat-total-tokens"
        />
        <StatCard
          title="Success Rate"
          value={`${(stats?.success_rate || 0).toFixed(1)}%`}
          icon={CheckCircle2}
          testId="stat-success-rate"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card" data-testid="latency-chart">
          <CardHeader>
            <CardTitle className="font-heading">Query Latency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={latencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(0,255,148,0.3)',
                    borderRadius: '0.3rem',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="latency"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--chart-1))' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass-card" data-testid="token-chart">
          <CardHeader>
            <CardTitle className="font-heading">Token Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={tokenData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(0,255,148,0.3)',
                    borderRadius: '0.3rem',
                  }}
                />
                <Legend />
                <Bar dataKey="tokens" fill="hsl(var(--chart-2))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card mt-6" data-testid="cost-estimation">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <DollarSign size={20} />
            Cost Estimation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Cost</p>
              <p className="text-3xl font-bold font-heading text-primary">
                ${(stats?.total_cost || 0).toFixed(4)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Cost per Query</p>
              <p className="text-3xl font-bold font-heading text-chart-2">
                ${stats?.total_queries > 0 ? ((stats?.total_cost || 0) / stats.total_queries).toFixed(4) : '0.0000'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Tokens/Query</p>
              <p className="text-3xl font-bold font-heading text-chart-3">
                {stats?.total_queries > 0 ? Math.round((stats?.total_tokens || 0) / stats.total_queries) : 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}