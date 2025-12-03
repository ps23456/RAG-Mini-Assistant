import React, { useState } from 'react';
import axios from 'axios';
import { Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedDoc, setUploadedDoc] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/bmp',
        'image/tiff',
        'image/gif'
      ];
      
      if (allowedTypes.includes(selectedFile.type) || 
          selectedFile.name.match(/\.(pdf|docx?|pptx?|xlsx?|png|jpe?g|bmp|tiff?|gif)$/i)) {
        setFile(selectedFile);
        setUploadedDoc(null);
      } else {
        toast.error('Please select a supported file (PDF, DOCX, PPTX, XLSX, or Image)');
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await axios.post(`${API}/documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      clearInterval(progressInterval);
      setProgress(100);
      setUploadedDoc(response.data);
      toast.success(`Document "${file.name}" uploaded successfully!`);
      setFile(null);
    } catch (error) {
      console.error('Error uploading document:', error);
      toast.error(error.response?.data?.detail || 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl" data-testid="document-upload-page">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight mb-2">
          Upload Documents
        </h1>
        <p className="text-muted-foreground">Upload PDF documents to build your knowledge base</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-heading">Document Upload</CardTitle>
          <CardDescription>Select a PDF file to process and embed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            data-testid="upload-dropzone"
            className="border-2 border-dashed border-border rounded-sm p-12 text-center hover:border-primary/50 transition-all duration-300 cursor-pointer"
            onClick={() => document.getElementById('file-input').click()}
          >
            <Upload className="mx-auto mb-4 text-muted-foreground" size={48} />
            <p className="text-lg font-heading mb-2">
              {file ? file.name : 'Click to select a PDF file'}
            </p>
            <p className="text-sm text-muted-foreground">
              Supported format: PDF (Max 10MB)
            </p>
            <input
              id="file-input"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              data-testid="file-input"
            />
          </div>

          {file && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full"
                  data-testid="upload-button"
                >
                  {uploading ? 'Processing...' : 'Upload & Process'}
                </Button>
              </div>

              {uploading && (
                <div className="space-y-2">
                  <Progress value={progress} data-testid="upload-progress" />
                  <p className="text-sm text-muted-foreground text-center">
                    Processing document and generating embeddings... {progress}%
                  </p>
                </div>
              )}
            </div>
          )}

          {uploadedDoc && (
            <div
              data-testid="upload-success"
              className="bg-primary/10 border border-primary/30 rounded-sm p-4 flex items-start gap-3"
            >
              <CheckCircle2 className="text-primary flex-shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-heading font-semibold">Upload Successful!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Document: {uploadedDoc.filename}
                </p>
                <p className="text-sm text-muted-foreground">
                  Chunks created: {uploadedDoc.chunk_count}
                </p>
                <p className="text-sm text-muted-foreground">
                  File size: {(uploadedDoc.file_size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="glass-card mt-6">
        <CardHeader>
          <CardTitle className="font-heading text-lg">How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
              <span className="text-primary font-bold font-mono">1</span>
            </div>
            <p>PDF text is extracted and cleaned</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
              <span className="text-primary font-bold font-mono">2</span>
            </div>
            <p>Text is split into semantic chunks (~500 words)</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
              <span className="text-primary font-bold font-mono">3</span>
            </div>
            <p>Embeddings are generated for each chunk using OpenAI</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 rounded-full p-2 flex-shrink-0">
              <span className="text-primary font-bold font-mono">4</span>
            </div>
            <p>Vectors are stored in MongoDB for fast retrieval</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}