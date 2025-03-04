import React, { useEffect } from "react";
import { useNotification } from "@/components/NotificationProvider";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

const BlogPage = () => {
  const { showNotification } = useNotification();

  useEffect(() => {
    // Show a funny notification when blog page loads
    showNotification(
      "📝 Reading our blog burns calories! Science* says so! (*not actual science)",
      "info",
      5000,
    );
  }, [showNotification]);
  const blogPosts = [
    {
      id: "1",
      title: "Top 10 Neighborhoods in Ahmedabad for Families",
      excerpt:
        "Discover the best family-friendly neighborhoods in Ahmedabad with great schools, parks, and amenities.",
      imageUrl:
        "https://images.unsplash.com/photo-1599940824399-b87987ceb969?w=800",
      category: "Neighborhoods",
      date: "June 15, 2024",
      author: "Rahul Sharma",
    },
    {
      id: "2",
      title: "Investment Opportunities in Surat's Real Estate Market",
      excerpt:
        "Learn about the emerging investment hotspots in Surat and why they offer great returns.",
      imageUrl:
        "https://images.unsplash.com/photo-1572508588813-77abd219e994?w=800",
      category: "Investment",
      date: "June 10, 2024",
      author: "Priya Patel",
    },
    {
      id: "3",
      title: "Home Buying Guide: Everything You Need to Know",
      excerpt:
        "A comprehensive guide to navigating the home buying process in Gujarat's competitive market.",
      imageUrl:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
      category: "Buying Guide",
      date: "June 5, 2024",
      author: "Amit Desai",
    },
    {
      id: "4",
      title: "Interior Design Trends for 2024",
      excerpt:
        "Stay updated with the latest interior design trends to make your property stand out.",
      imageUrl:
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
      category: "Interior Design",
      date: "May 28, 2024",
      author: "Neha Mehta",
    },
    {
      id: "5",
      title: "Understanding Property Taxes in Gujarat",
      excerpt:
        "Everything you need to know about property taxes, rates, and exemptions in Gujarat.",
      imageUrl:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
      category: "Legal",
      date: "May 20, 2024",
      author: "Vikram Singh",
    },
    {
      id: "6",
      title: "The Rise of Smart Homes in Gujarat",
      excerpt:
        "Explore how smart home technology is transforming residential properties across Gujarat.",
      imageUrl:
        "https://images.unsplash.com/photo-1558002038-1055e2dae2d7?w=800",
      category: "Technology",
      date: "May 15, 2024",
      author: "Meera Joshi",
    },
  ];

  const categories = [
    "All",
    "Buying Guide",
    "Selling Tips",
    "Investment",
    "Neighborhoods",
    "Interior Design",
    "Legal",
    "Technology",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-3xl font-bold mb-2">Real Estate Blog</h1>
        <p className="text-muted-foreground mb-8">
          Insights, tips, and trends in Gujarat's real estate market
        </p>

        {/* Featured Post */}
        <div className="mb-12">
          <div className="relative rounded-xl overflow-hidden">
            <div className="aspect-[21/9] md:aspect-[3/1]">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600"
                alt="Featured post"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 md:p-8">
              <Badge className="mb-2 w-fit">Featured</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                The Future of Real Estate in Gujarat: Trends to Watch in 2024
              </h2>
              <p className="text-white/80 mb-4 max-w-3xl">
                Discover the emerging trends shaping Gujarat's real estate
                market, from sustainable development to technology integration
                and changing buyer preferences.
              </p>
              <div className="flex items-center text-white/70 text-sm">
                <span className="flex items-center mr-4">
                  <Calendar className="h-4 w-4 mr-1" /> June 20, 2024
                </span>
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" /> Vikram Singh
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() =>
                showNotification(
                  `📚 "${post.title}" - Reading time: ${Math.floor(Math.random() * 5) + 3} mins`,
                  "info",
                  3000,
                )
              }
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-5">
                  <Badge className="mb-2">{post.category}</Badge>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span className="mr-3">{post.date}</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="p-0 h-auto">
                      Read <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-16 bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Stay updated with the latest real estate news, market trends, and
            exclusive property listings
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
