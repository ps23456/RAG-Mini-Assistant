import requests
import sys
import json
import time
from datetime import datetime
from pathlib import Path

class RAGAssistantTester:
    def __init__(self, base_url="https://rag-vector.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test_name": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if details:
            print(f"    Details: {details}")

    def test_api_root(self):
        """Test API root endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Response: {data}"
            self.log_test("API Root Endpoint", success, details)
            return success
        except Exception as e:
            self.log_test("API Root Endpoint", False, f"Error: {str(e)}")
            return False

    def test_dashboard_stats(self):
        """Test dashboard stats endpoint"""
        try:
            response = requests.get(f"{self.api_url}/dashboard/stats", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                required_fields = ['document_count', 'chunk_count', 'query_count', 'recent_queries']
                has_all_fields = all(field in data for field in required_fields)
                success = has_all_fields
                details += f", Fields present: {has_all_fields}, Data: {data}"
            self.log_test("Dashboard Stats", success, details)
            return success, response.json() if success else {}
        except Exception as e:
            self.log_test("Dashboard Stats", False, f"Error: {str(e)}")
            return False, {}

    def test_get_documents(self):
        """Test get documents endpoint"""
        try:
            response = requests.get(f"{self.api_url}/documents", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Document count: {len(data)}"
            self.log_test("Get Documents", success, details)
            return success, response.json() if success else []
        except Exception as e:
            self.log_test("Get Documents", False, f"Error: {str(e)}")
            return False, []

    def test_document_upload(self):
        """Test document upload with a sample PDF"""
        try:
            # Create a simple test PDF content (mock)
            test_content = b"%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n72 720 Td\n(Test document content) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000206 00000 n \ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n299\n%%EOF"
            
            files = {'file': ('test_document.pdf', test_content, 'application/pdf')}
            response = requests.post(f"{self.api_url}/documents/upload", files=files, timeout=30)
            
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                required_fields = ['id', 'filename', 'chunk_count', 'upload_date', 'file_size']
                has_all_fields = all(field in data for field in required_fields)
                success = has_all_fields
                details += f", Fields present: {has_all_fields}, Data: {data}"
                if success:
                    return success, data['id']
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Raw response: {response.text}"
            
            self.log_test("Document Upload", success, details)
            return success, None
        except Exception as e:
            self.log_test("Document Upload", False, f"Error: {str(e)}")
            return False, None

    def test_delete_document(self, doc_id):
        """Test document deletion"""
        if not doc_id:
            self.log_test("Delete Document", False, "No document ID provided")
            return False
            
        try:
            response = requests.delete(f"{self.api_url}/documents/{doc_id}", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Response: {data}"
            self.log_test("Delete Document", success, details)
            return success
        except Exception as e:
            self.log_test("Delete Document", False, f"Error: {str(e)}")
            return False

    def test_rag_query(self):
        """Test RAG query endpoint"""
        try:
            query_data = {
                "query": "What is the main topic of the documents?",
                "top_k": 3
            }
            response = requests.post(f"{self.api_url}/query", json=query_data, timeout=30)
            
            success = response.status_code in [200, 404]  # 404 is acceptable if no documents
            details = f"Status: {response.status_code}"
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['answer', 'sources', 'latency_ms', 'token_count', 'retrieved_chunks']
                has_all_fields = all(field in data for field in required_fields)
                success = has_all_fields
                details += f", Fields present: {has_all_fields}"
                if has_all_fields:
                    details += f", Answer length: {len(data['answer'])}, Sources: {len(data['sources'])}"
            elif response.status_code == 404:
                details += " (No documents available - expected)"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Raw response: {response.text}"
            
            self.log_test("RAG Query", success, details)
            return success
        except Exception as e:
            self.log_test("RAG Query", False, f"Error: {str(e)}")
            return False

    def test_telemetry_stats(self):
        """Test telemetry stats endpoint"""
        try:
            response = requests.get(f"{self.api_url}/telemetry/stats", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                required_fields = ['total_queries', 'avg_latency_ms', 'total_tokens', 'total_cost', 'success_rate']
                has_all_fields = all(field in data for field in required_fields)
                success = has_all_fields
                details += f", Fields present: {has_all_fields}, Data: {data}"
            self.log_test("Telemetry Stats", success, details)
            return success
        except Exception as e:
            self.log_test("Telemetry Stats", False, f"Error: {str(e)}")
            return False

    def test_telemetry_history(self):
        """Test telemetry history endpoint"""
        try:
            response = requests.get(f"{self.api_url}/telemetry/history?limit=10", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", History records: {len(data)}"
            self.log_test("Telemetry History", success, details)
            return success
        except Exception as e:
            self.log_test("Telemetry History", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting RAG Assistant Backend Tests")
        print(f"Testing API at: {self.api_url}")
        print("=" * 50)
        
        # Test basic connectivity
        if not self.test_api_root():
            print("❌ API root test failed - stopping tests")
            return self.get_results()
        
        # Test dashboard and stats
        self.test_dashboard_stats()
        self.test_telemetry_stats()
        self.test_telemetry_history()
        
        # Test document management
        documents_success, documents = self.test_get_documents()
        
        # Test document upload and deletion
        upload_success, doc_id = self.test_document_upload()
        if upload_success and doc_id:
            # Wait a moment for processing
            time.sleep(2)
            # Test query with uploaded document
            self.test_rag_query()
            # Clean up - delete the test document
            self.test_delete_document(doc_id)
        else:
            # Test query without documents (should return 404)
            self.test_rag_query()
        
        return self.get_results()

    def get_results(self):
        """Get test results summary"""
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%" if self.tests_run > 0 else "No tests run")
        
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "success_rate": (self.tests_passed/self.tests_run*100) if self.tests_run > 0 else 0,
            "test_details": self.test_results
        }

def main():
    tester = RAGAssistantTester()
    results = tester.run_all_tests()
    
    # Save results to file
    results_file = "/app/backend_test_results.json"
    with open(results_file, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n📁 Results saved to: {results_file}")
    
    # Return appropriate exit code
    return 0 if results["success_rate"] >= 80 else 1

if __name__ == "__main__":
    sys.exit(main())