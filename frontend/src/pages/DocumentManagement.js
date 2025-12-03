import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText, Trash2, Calendar, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${API}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (docId, filename) => {
    try {
      await axios.delete(`${API}/documents/${docId}`);
      toast.success(`Document "${filename}" deleted successfully`);
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document');
    }
  };

  return (
    <div className="animate-fade-in" data-testid="document-management-page">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-2">
          Document Management
        </h1>
        <p className="text-muted-foreground">View and manage your uploaded documents</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading documents...</p>
        </div>
      ) : documents.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-lg font-heading mb-2">No documents yet</p>
            <p className="text-muted-foreground">Upload your first document to get started</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {documents.map((doc) => (
            <Card
              key={doc.id}
              className="glass-card"
              data-testid={`document-item-${doc.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-primary/10 p-3 rounded-sm flex-shrink-0">
                      <FileText className="text-primary" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-lg mb-2 truncate">
                        {doc.filename}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Layers size={14} />
                          <span>{doc.chunk_count} chunks</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <FileText size={14} />
                          <span>{(doc.file_size / 1024).toFixed(2)} KB</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar size={14} />
                          <span>{new Date(doc.upload_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="flex-shrink-0"
                        data-testid={`delete-button-${doc.id}`}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-card border border-border">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Document?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{doc.filename}"? This action cannot be undone.
                          All {doc.chunk_count} chunks will be removed from the system.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel data-testid="delete-cancel">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(doc.id, doc.filename)}
                          className="bg-destructive text-destructive-foreground"
                          data-testid="delete-confirm"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}