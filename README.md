# 🚀 Multi-Modal RAG Assistant

<div align="center">

![RAG Assistant](https://img.shields.io/badge/RAG-Assistant-00FF94?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

**An AI-powered document search and question-answering system with multi-modal support**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Contributing](#-contributing)

deployment link: https://rag-vector.emergent.host/


</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Supported File Types](#-supported-file-types)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Project Structure](#-project-structure)
- [Performance](#-performance)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**Multi-Modal RAG Assistant** is a production-ready Retrieval-Augmented Generation (RAG) system that enables intelligent document search and question-answering across multiple file formats. Built with modern AI technologies, it processes documents, generates embeddings, performs vector similarity search, and provides accurate, context-aware responses using GPT-5.1.

### Key Highlights

- 🤖 **Advanced RAG Pipeline** - Multi-step retrieval with context-aware answer generation
- 📄 **Multi-Modal Support** - Process PDF, Word, PowerPoint, Excel, Images, and Screenshots
- 🔍 **Intelligent Search** - Vector similarity search with source attribution
- 📊 **Real-time Analytics** - Track latency, token usage, costs, and performance metrics
- 🎨 **Beautiful UI** - Dark-themed glass-morphism design with neon accents
- ⚡ **Production-Ready** - Async architecture, optimized queries, comprehensive error handling

---

## ✨ Features

### Core Capabilities

- **📤 Multi-Format Document Upload**
  - PDF documents (text-based and scanned)
  - Microsoft Word (.docx, .doc)
  - PowerPoint presentations (.pptx, .ppt)
  - Excel spreadsheets (.xlsx, .xls)
  - Images (PNG, JPG, JPEG, BMP, TIFF, GIF)
  - Screenshots with OCR support

- **🔎 Advanced RAG Pipeline**
  - Intelligent chunking strategy (~500 words per chunk)
  - Vector embeddings generation
  - Cosine similarity-based retrieval
  - Multi-step processing: Retrieve → Refine → Answer
  - Source attribution with similarity scores

- **🧠 AI-Powered Responses**
  - Powered by OpenAI GPT-5.1
  - Context-aware answer generation
  - Bullet-point formatted responses for readability
  - Structured outputs with schema validation

- **📊 Comprehensive Analytics**
  - Query latency tracking
  - Token usage monitoring
  - Cost estimation ($0.01 per 1K tokens)
  - Success rate metrics
  - Interactive performance charts

- **🎨 Modern UI/UX**
  - Dark theme with neon green (#00FF94) accents
  - Glass-morphism effects with backdrop blur
  - Responsive design (mobile-first)
  - Real-time notifications
  - 5 functional pages: Dashboard, Upload, Query, Documents, Analytics

---

## 🛠 Tech Stack

### Backend
- **Framework:** FastAPI (Async)
- **AI/ML:** 
  - OpenAI GPT-5.1 (via Emergent LLM key)
  - LangChain for RAG orchestration
  - Scikit-learn for vector similarity
- **Database:** MongoDB (with Atlas support)
- **Document Processing:**
  - PyMuPDF (PDF extraction)
  - Tesseract OCR (image text extraction)
  - python-pptx (PowerPoint)
  - python-docx (Word)
  - pandas + openpyxl (Excel)
- **Other:** Motor (async MongoDB), Pydantic (validation)

### Frontend
- **Framework:** React 19
- **Routing:** React Router DOM v7
- **UI Library:** Shadcn/UI (Radix UI primitives)
- **Styling:** TailwindCSS v3.4
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Notifications:** Sonner

### DevOps
- **Containerization:** Docker (Kubernetes-ready)
- **Process Manager:** Supervisor
- **Build Tool:** Craco (Create React App Configuration Override)

---

## 🏗 Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Interface                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Dashboard │  │ Upload   │  │  Query   │  │Analytics │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      FastAPI Backend                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Document Processing Layer                │  │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  │  │
│  │  │ PDF  │  │ DOCX │  │ PPTX │  │ XLSX │  │Image │  │  │
│  │  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  │  │
│  │     │          │          │          │         │     │  │
│  │     └──────────┴──────────┴──────────┴─────────┘     │  │
│  │                      │                                 │  │
│  │                 Text Extraction                       │  │
│  │                      │                                 │  │
│  │                 Text Chunking                         │  │
│  │                      │                                 │  │
│  │              Embedding Generation                     │  │
│  └──────────────────────┬────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────▼────────────────────────────────┐  │
│  │                 RAG Query Engine                       │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐     │  │
│  │  │  Vector    │→ │  Context   │→ │  GPT-5.1   │     │  │
│  │  │  Search    │  │  Assembly  │  │  Answer    │     │  │
│  │  └────────────┘  └────────────┘  └────────────┘     │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Telemetry & Analytics                    │  │
│  │  • Latency Tracking  • Token Counting                │  │
│  │  • Cost Estimation   • Performance Metrics           │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      MongoDB Database                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Documents   │  │    Chunks    │  │  Telemetry   │     │
│  │  Collection  │  │  Collection  │  │  Collection  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

### RAG Pipeline Flow

**1. Ingestion Phase**
```
Document Upload → Type Detection → Text Extraction → Chunking 
                                                       ↓
MongoDB Storage ← Embedding Generation ← Vector Creation
```

**2. Query Phase**
```
User Query → Embedding → Vector Search → Top-K Retrieval
                                            ↓
     Formatted Answer ← GPT-5.1 ← Context Assembly
```

**3. Telemetry Phase**
```
Every Query → Latency + Tokens + Cost → Performance Metrics → Dashboard
```

---

## 📁 Supported File Types

| Type | Formats | Features |
|------|---------|----------|
| **PDF** | `.pdf` | Text extraction + OCR fallback for scanned documents |
| **Word** | `.doc`, `.docx` | Full text + table extraction |
| **PowerPoint** | `.ppt`, `.pptx` | Slides text + table extraction |
| **Excel** | `.xls`, `.xlsx` | All sheets + formatted tables |
| **Images** | `.png`, `.jpg`, `.jpeg`, `.bmp`, `.tiff`, `.gif` | OCR text extraction |
| **Screenshots** | All image formats | OCR-based text recognition |

---

## 🚀 Installation

### Prerequisites

- Python 3.11+
- Node.js 18+ and Yarn
- MongoDB (local or Atlas)
- Tesseract OCR
- Poppler utilities

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/multi-modal-rag-assistant.git
   cd multi-modal-rag-assistant
   ```

2. **Backend Setup**
   ```bash
   cd backend
   
   # Create virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Install system dependencies (Ubuntu/Debian)
   sudo apt-get update
   sudo apt-get install -y tesseract-ocr poppler-utils
   
   # Configure environment
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   
   # Install dependencies
   yarn install
   
   # Configure environment
   cp .env.example .env
   # Edit .env with your backend URL
   ```

4. **Start the application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   uvicorn server:app --host 0.0.0.0 --port 8001 --reload
   
   # Terminal 2 - Frontend
   cd frontend
   yarn start
   ```

5. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8001`
   - API Docs: `http://localhost:8001/docs`

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# MongoDB Configuration
MONGO_URL=mongodb://localhost:27017
DB_NAME=rag_assistant_db

# For MongoDB Atlas
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/

# API Keys
EMERGENT_LLM_KEY=your-emergent-llm-key

# CORS
CORS_ORIGINS=*
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
REACT_APP_BACKEND_URL=http://localhost:8001

# WebSocket Configuration
WDS_SOCKET_PORT=443

# Feature Flags
REACT_APP_ENABLE_VISUAL_EDITS=false
ENABLE_HEALTH_CHECK=false
```

### Getting API Keys

#### Emergent LLM Key (Recommended)
- Supports OpenAI GPT-5.1, Claude, and Gemini
- Sign up at [Emergent AI](https://emergent.sh)
- Navigate to Profile → Universal Key
- Copy your key and add to `.env`

#### Direct OpenAI Key
- Visit [OpenAI Platform](https://platform.openai.com)
- Generate API key
- Modify integration in `server.py`

---

## 📖 Usage

### 1. Upload Documents

Navigate to the **Upload** page and drag & drop or select files:

- Upload single or multiple documents
- Automatic format detection
- Text extraction with table preservation
- OCR for images and scanned PDFs
- Embedding generation and storage

### 2. Query Documents

Go to the **Query** page and ask questions:

**Example queries:**
- "What are the key findings in the research paper?"
- "Summarize the quarterly financial report"
- "What are the main points from the presentation?"
- "Extract the data from the uploaded spreadsheet"

### 3. Manage Documents

Visit the **Documents** page to:
- View all uploaded documents
- See chunk count and file size
- Delete documents (removes all associated chunks)

### 4. View Analytics

Check the **Analytics** page for:
- Total queries processed
- Average latency
- Token usage statistics
- Cost estimation
- Performance charts (latency, tokens)
- Success rate tracking

---

## 📡 API Documentation

### Base URL
```
http://localhost:8001/api
```

### Endpoints

#### 1. Health Check
```http
GET /api/
```

**Response:**
```json
{
  "message": "RAG Assistant API"
}
```

---

#### 2. Upload Document
```http
POST /api/documents/upload
```

**Request:**
- Content-Type: `multipart/form-data`
- Body: `file` (PDF, DOCX, PPTX, XLSX, or image)

**Response:**
```json
{
  "id": "uuid-string",
  "filename": "document.pdf",
  "chunk_count": 15,
  "upload_date": "2025-12-03T10:00:00Z",
  "file_size": 102400
}
```

---

#### 3. List Documents
```http
GET /api/documents
```

**Response:**
```json
[
  {
    "id": "uuid-string",
    "filename": "document.pdf",
    "chunk_count": 15,
    "upload_date": "2025-12-03T10:00:00Z",
    "file_size": 102400
  }
]
```

---

#### 4. Delete Document
```http
DELETE /api/documents/{document_id}
```

**Response:**
```json
{
  "message": "Document deleted successfully"
}
```

---

#### 5. Query RAG System
```http
POST /api/query
```

**Request:**
```json
{
  "query": "What is the main topic?",
  "top_k": 3
}
```

**Response:**
```json
{
  "answer": "• Main point 1\n• Main point 2\n• Main point 3",
  "sources": [
    {
      "text": "chunk text...",
      "document_id": "uuid-string",
      "chunk_index": 0,
      "similarity": 0.89
    }
  ],
  "latency_ms": 1250.5,
  "token_count": 450,
  "retrieved_chunks": ["chunk1", "chunk2", "chunk3"]
}
```

---

#### 6. Telemetry Stats
```http
GET /api/telemetry/stats
```

**Response:**
```json
{
  "total_queries": 100,
  "avg_latency_ms": 1200.5,
  "total_tokens": 45000,
  "total_cost": 0.45,
  "success_rate": 98.5
}
```

---

#### 7. Telemetry History
```http
GET /api/telemetry/history?limit=50
```

**Response:**
```json
[
  {
    "id": "uuid-string",
    "query": "example query",
    "answer": "example answer",
    "latency_ms": 1250.5,
    "token_count": 450,
    "timestamp": "2025-12-03T10:00:00Z",
    "success": true
  }
]
```

---

#### 8. Dashboard Stats
```http
GET /api/dashboard/stats
```

**Response:**
```json
{
  "document_count": 10,
  "chunk_count": 150,
  "query_count": 100,
  "recent_queries": [
    {
      "query": "example query",
      "timestamp": "2025-12-03T10:00:00Z",
      "success": true
    }
  ]
}
```

---

## 🌐 Deployment

### Docker Deployment

```bash
# Build images
docker build -t rag-assistant-backend ./backend
docker build -t rag-assistant-frontend ./frontend

# Run with Docker Compose
docker-compose up -d
```

### Kubernetes Deployment

The application is Kubernetes-ready and optimized for containerized deployment.

**Key Features:**
- Lazy-loading database connections
- Environment-based configuration
- Health check endpoints
- Graceful shutdown handling
- MongoDB Atlas support

### Emergent Platform Deployment

1. Push code to GitHub
2. Connect repository to Emergent
3. Configure environment variables:
   ```
   MONGO_URL=mongodb+srv://...
   EMERGENT_LLM_KEY=sk-emergent-...
   ```
4. Deploy with one click
5. Access via provided URL

---

## 📂 Project Structure

```
multi-modal-rag-assistant/
├── backend/
│   ├── server.py              # Main FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Custom styles
│   │   ├── index.js          # Entry point
│   │   ├── index.css         # Global styles
│   │   ├── pages/            # Page components
│   │   │   ├── Dashboard.js
│   │   │   ├── DocumentUpload.js
│   │   │   ├── DocumentManagement.js
│   │   │   ├── RAGQuery.js
│   │   │   └── Telemetry.js
│   │   └── components/
│   │       └── ui/           # Shadcn UI components
│   ├── public/               # Static assets
│   ├── package.json          # Node dependencies
│   ├── tailwind.config.js    # Tailwind configuration
│   └── .env                  # Environment variables
├── tests/                     # Test files
├── docs/                      # Documentation
├── .gitignore
├── README.md
├── docker-compose.yml
└── MULTIMODAL_RAG_FEATURES.md # Detailed feature docs
```

---

## ⚡ Performance

### Benchmarks

| Metric | Value |
|--------|-------|
| Document Upload | 2-10 seconds (size/OCR dependent) |
| Query Processing | 500-2000ms |
| Embedding Generation | 100-300ms per chunk |
| Vector Search | <100ms for 1000 chunks |

### Optimization Features

- ✅ Async FastAPI architecture
- ✅ Lazy database connection loading
- ✅ Query result limits (max 1000)
- ✅ Field projections in database queries
- ✅ Efficient chunking strategy
- ✅ Hot reload for development
- ✅ Production-ready error handling
- ✅ Optimized MongoDB queries

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow PEP 8 for Python code
- Use ESLint/Prettier for JavaScript
- Write tests for new features
- Update documentation
- Add comments for complex logic

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **OpenAI** - GPT-5.1 and embeddings API
- **LangChain** - RAG orchestration framework
- **Shadcn/UI** - Beautiful React components
- **FastAPI** - High-performance Python framework
- **MongoDB** - Flexible document database
- **Tesseract** - Open-source OCR engine
- **React Community** - Amazing ecosystem

---

## 🗺 Roadmap

### Phase 1 (Completed ✅)
- [x] Multi-modal document support
- [x] RAG pipeline with GPT-5.1
- [x] Vector similarity search
- [x] Telemetry and analytics
- [x] Beautiful dark-themed UI
- [x] Production deployment ready

### Phase 2 (Planned)
- [ ] Add support for video/audio transcription
- [ ] Implement semantic chunking strategies
- [ ] Add re-ranking models for better relevance
- [ ] Multi-language OCR support
- [ ] Real-time collaboration features

### Phase 3 (Future)
- [ ] Advanced analytics dashboard
- [ ] Batch document processing
- [ ] Document versioning
- [ ] Export query results
- [ ] User authentication & RBAC
- [ ] API rate limiting

---

## 📞 Support & Contact

- **GitHub Issues:** [Create an issue](https://github.com/yourusername/multi-modal-rag-assistant/issues)
- **GitHub Discussions:** [Join discussions](https://github.com/yourusername/multi-modal-rag-assistant/discussions)
- **Email:** your.email@example.com

---

## 📊 Project Stats

![GitHub repo size](https://img.shields.io/github/repo-size/yourusername/multi-modal-rag-assistant)
![GitHub language count](https://img.shields.io/github/languages/count/yourusername/multi-modal-rag-assistant)
![GitHub top language](https://img.shields.io/github/languages/top/yourusername/multi-modal-rag-assistant)

---

<div align="center">

**Built with ❤️ using cutting-edge AI and modern web technologies**

**Star ⭐ this repository if you find it helpful!**

[⬆ Back to Top](#-multi-modal-rag-assistant)

</div>
