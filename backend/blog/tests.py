from django.test import TestCase

from blog.models import Blog

# Create your tests here.
class BlogTests(TestCase):
    def setUp(self):
        Blog.objects.create(
            title="Test Blog",
            content="This is a test blog content.",
        )
        Blog.objects.create(
            title="Another Blog",
            content="This is another test blog content.",
        )
        
    def test_api_blog(self):
        response = self.client.get('/api/blog/')
        self.assertEqual(response.status_code, 200)
        self.assertIsNotNone(response.json())
        
    def test_api_blog_detail(self):
        response = self.client.get('/api/blog/1/')
        self.assertEqual(response.status_code, 200)
        blog = response.json()
        self.assertEqual(blog['title'], "Test Blog")
        self.assertEqual(blog['content'], "This is a test blog content.")
        