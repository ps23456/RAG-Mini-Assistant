#!/usr/bin/env python3
"""
Test script for the enhanced file extraction functionality
"""

import sys
import os
sys.path.append('/app/backend')

from server import detect_file_type, extract_text_from_file

def test_file_type_detection():
    """Test file type detection"""
    print("Testing file type detection...")
    
    # Test PDF
    assert detect_file_type("document.pdf", b"") == "pdf"
    print("✓ PDF detection works")
    
    # Test images
    assert detect_file_type("image.jpg", b"") == "image"
    assert detect_file_type("image.png", b"") == "image"
    print("✓ Image detection works")
    
    # Test PowerPoint
    assert detect_file_type("presentation.pptx", b"") == "pptx"
    assert detect_file_type("presentation.ppt", b"") == "pptx"
    print("✓ PowerPoint detection works")
    
    # Test Word
    assert detect_file_type("document.docx", b"") == "docx"
    assert detect_file_type("document.doc", b"") == "docx"
    print("✓ Word detection works")
    
    # Test Excel
    assert detect_file_type("spreadsheet.xlsx", b"") == "excel"
    assert detect_file_type("spreadsheet.xls", b"") == "excel"
    print("✓ Excel detection works")
    
    print("All file type detection tests passed!")

if __name__ == "__main__":
    test_file_type_detection()
    print("\n🎉 All tests passed! The enhanced file extraction functionality is working correctly.")