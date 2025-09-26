import React from 'react';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  image: string;
}

const Blog = () => {
  const blogPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Understanding Telepsychiatry: How Online Mental Health Care Works',
      excerpt: 'Discover how telepsychiatry is revolutionizing mental health care delivery across North Carolina, making professional psychiatric services more accessible than ever.',
      content: 'Full article content would go here...',
      author: 'Dr. Sarah Johnson, MD',
      date: '2025-01-10',
      readTime: '5 min read',
      category: 'Telepsychiatry',
      slug: 'understanding-telepsychiatry-online-mental-health-care',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '2',
      title: 'ADHD Treatment Through Telehealth: Benefits and Best Practices',
      excerpt: 'Learn how telepsychiatry provides effective ADHD treatment for children and adults in North Carolina through secure video consultations.',
      content: 'Full article content would go here...',
      author: 'Dr. Michael Chen, MD',
      date: '2025-01-08',
      readTime: '6 min read',
      category: 'ADHD',
      slug: 'adhd-treatment-telehealth-benefits-best-practices',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '3',
      title: 'Managing Depression and Anxiety with Online Psychiatric Care',
      excerpt: 'Explore evidence-based approaches to treating depression and anxiety through telepsychiatry, including medication management and therapy options.',
      content: 'Full article content would go here...',
      author: 'Dr. Emily Rodriguez, MD',
      date: '2025-01-05',
      readTime: '7 min read',
      category: 'Depression & Anxiety',
      slug: 'managing-depression-anxiety-online-psychiatric-care',
      image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '4',
      title: 'Psychiatric Medication Management via Telehealth: What to Expect',
      excerpt: 'Understanding how psychiatric medication management works through telepsychiatry, including monitoring, adjustments, and safety protocols.',
      content: 'Full article content would go here...',
      author: 'Dr. James Wilson, MD',
      date: '2025-01-03',
      readTime: '4 min read',
      category: 'Medication Management',
      slug: 'psychiatric-medication-management-telehealth-what-to-expect',
      image: 'https://images.unsplash.com/photo-1563213126-a4273aed2016?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '5',
      title: 'Mental Health Crisis Support: When and How to Seek Help',
      excerpt: 'Learn about mental health crisis resources in North Carolina and how telepsychiatry can provide immediate support during difficult times.',
      content: 'Full article content would go here...',
      author: 'Dr. Lisa Thompson, MD',
      date: '2025-01-01',
      readTime: '5 min read',
      category: 'Crisis Support',
      slug: 'mental-health-crisis-support-when-how-seek-help',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      id: '6',
      title: 'Preparing for Your First Telepsychiatry Appointment',
      excerpt: 'A comprehensive guide to preparing for your first online psychiatric consultation, including technical setup and what to expect.',
      content: 'Full article content would go here...',
      author: 'Dr. Robert Lee, MD',
      date: '2024-12-28',
      readTime: '3 min read',
      category: 'Getting Started',
      slug: 'preparing-first-telepsychiatry-appointment',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ];

  const categories = ['All', 'Telepsychiatry', 'ADHD', 'Depression & Anxiety', 'Medication Management', 'Crisis Support', 'Getting Started'];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mental Health Resources & Insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Expert insights on telepsychiatry, mental health treatment, and wellness from our 
            board-certified psychiatrists serving North Carolina patients.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 text-white">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-blue-100 text-sm font-medium rounded-full mb-4">
                    Featured Article
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-blue-100 text-lg leading-relaxed mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                </div>
                <div className="flex items-center text-blue-200 text-sm mb-6">
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4">{blogPosts[0].author}</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="mr-4">{new Date(blogPosts[0].date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <button className="inline-flex items-center px-6 py-3 bg-white text-blue-800 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200 group">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="lg:p-8">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-64 lg:h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-blue-800 text-white text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4 truncate">{post.author}</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="mr-4">{new Date(post.date).toLocaleDateString()}</span>
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{post.readTime}</span>
                </div>
                
                <button className="inline-flex items-center text-blue-800 font-medium hover:text-blue-900 group/link">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-gray-100 text-gray-800 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200">
            Load More Articles
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Stay Updated on Mental Health Insights
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Subscribe to receive the latest articles on telepsychiatry, mental health tips, 
            and updates from our North Carolina psychiatric team.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Structured Data for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "NC Telepsychiatry Mental Health Blog",
            "description": "Expert insights on telepsychiatry, mental health treatment, and wellness from board-certified psychiatrists",
            "url": "https://yoursite.com/blog",
            "publisher": {
              "@type": "MedicalOrganization",
              "name": "NC Telepsychiatry Services",
              "url": "https://yoursite.com"
            },
            "blogPost": blogPosts.map(post => ({
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.excerpt,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "datePublished": post.date,
              "category": post.category,
              "url": `https://yoursite.com/blog/${post.slug}`,
              "image": post.image,
              "publisher": {
                "@type": "MedicalOrganization",
                "name": "NC Telepsychiatry Services"
              }
            }))
          })
        }}
      />
    </section>
  );
};

export default Blog;