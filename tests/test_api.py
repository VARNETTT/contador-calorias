import importlib.util
import pathlib
import unittest
from unittest.mock import patch

ROOT = pathlib.Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('calorietrack_server', ROOT / 'server.py')
server = importlib.util.module_from_spec(spec)
spec.loader.exec_module(server)

class ApiTests(unittest.TestCase):
    def setUp(self):
        self.client = server.app.test_client()

    def test_health(self):
        response = self.client.get('/health')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['status'], 'ok')

    def test_barcode_validation(self):
        for barcode in ['abc', '123', '12345678901234567890']:
            response = self.client.get('/api/products/barcode/' + barcode)
            self.assertEqual(response.status_code, 400)

    def test_barcode_found(self):
        with patch.object(server, 'off_get', return_value={'status': 1, 'product': {'product_name': 'Prueba'}}):
            response = self.client.get('/api/products/barcode/7791234567890')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json['status'], 1)
            self.assertIn('max-age=300', response.headers.get('Cache-Control', ''))

    def test_barcode_missing(self):
        with patch.object(server, 'off_get', return_value={'status': 0}):
            response = self.client.get('/api/products/barcode/7791234567890')
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json['status'], 0)

    def test_search_validation(self):
        self.assertEqual(self.client.get('/api/products/search?q=x').status_code, 400)

    def test_cors_rejects_unknown_origin(self):
        response = self.client.get('/api/products/search?q=arroz', headers={'Origin':'https://example.org'})
        self.assertEqual(response.status_code, 403)

    def test_cors_allows_local(self):
        response = self.client.get('/health', headers={'Origin':'http://localhost:5500'})
        self.assertEqual(response.headers.get('Access-Control-Allow-Origin'), 'http://localhost:5500')

if __name__ == '__main__':
    unittest.main()
