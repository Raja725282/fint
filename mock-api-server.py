#!/usr/bin/env python3
"""
Simple mock API server for testing data pull functionality
"""
import json
import http.server
import socketserver
from urllib.parse import urlparse
import threading
import time

class MockAPIHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Handle CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        if path.startswith('/api/'):
            self.handle_api_request(path)
        else:
            # Serve static files normally
            super().do_GET()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def handle_api_request(self, path):
        try:
            # Load the API data from the JSON file
            with open('api-data.json', 'r') as f:
                data = json.load(f)
            
            if path == '/api/flint-values':
                response_data = data['flint_values']
            elif path == '/api/tech-stack':
                response_data = data['tech_stack']
            elif path == '/api/onboarding-steps':
                # Return empty to test fallback
                response_data = []
            elif path == '/api/testimonials':
                # Return empty to test fallback
                response_data = []
            elif path == '/api/resources':
                # Return empty to test fallback
                response_data = []
            else:
                self.send_error(404, "API endpoint not found")
                return
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response_data).encode())
            
        except Exception as e:
            self.send_error(500, f"Internal server error: {str(e)}")

if __name__ == "__main__":
    PORT = 8000
    with socketserver.TCPServer(("", PORT), MockAPIHandler) as httpd:
        print(f"Mock API server running at http://localhost:{PORT}")
        print("API endpoints available:")
        print("  /api/flint-values")
        print("  /api/tech-stack") 
        print("  /api/onboarding-steps (empty - will use fallback)")
        print("  /api/testimonials (empty - will use fallback)")
        print("  /api/resources (empty - will use fallback)")
        httpd.serve_forever()