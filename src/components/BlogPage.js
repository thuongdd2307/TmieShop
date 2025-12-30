import { useState } from "react";
import { Link } from "react-router-dom";
import "./BlogPage.css";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Xu Hướng Thời Trang Thu Đông 2024",
      excerpt: "Khám phá những xu hướng thời trang mới nhất cho mùa thu đông 2024 với các màu sắc, chất liệu và kiểu dáng đang làm mưa làm gió trên sàn diễn quốc tế.",
      author: "Nguyễn Thị Mai",
      date: "15/12/2024",
      category: "thoi-trang",
      image: "https://picsum.photos/seed/fashion2024/400/250",
      readTime: "5 phút đọc",
      featured: true,
      linkedProducts: [
        { id: 1, name: "Áo khoác dạ", price: "1.200.000đ" },
        { id: 2, name: "Quần jeans cao cấp", price: "850.000đ" }
      ]
    },
    {
      id: 2,
      title: "Cách Chọn Quần Áo Thuê Phù Hợp",
      excerpt: "Hướng dẫn chi tiết cách chọn lựa trang phục thuê cho các dịp đặc biệt, giúp bạn tiết kiệm chi phí mà vẫn đảm bảo phong cách thời thượng.",
      author: "Trần Văn Hùng",
      date: "12/12/2024",
      category: "thue-do",
      image: "https://picsum.photos/seed/rentalguide/400/250",
      readTime: "7 phút đọc",
      featured: false,
      linkedProducts: [
        { id: 3, name: "Váy dạ hội", price: "500.000đ/ngày" },
        { id: 4, name: "Suit công sở", price: "300.000đ/ngày" }
      ]
    },
    {
      id: 3,
      title: "Mix & Match: Phong Cách Street Style",
      excerpt: "Bí quyết phối đồ theo phong cách street style cho giới trẻ, giúp bạn tạo nên những bộ trang phục độc đáo và cá tính.",
      author: "Lê Minh Anh",
      date: "10/12/2024",
      category: "phong-cach",
      image: "https://picsum.photos/seed/streetstyle/400/250",
      readTime: "4 phút đọc",
      featured: true,
      linkedProducts: [
        { id: 5, name: "Áo thun oversize", price: "350.000đ" },
        { id: 6, name: "Giày sneaker", price: "1.500.000đ" }
      ]
    },
    {
      id: 4,
      title: "Bảo Quản Quần Áo Đúng Cách",
      excerpt: "Những mẹo vặt hữu ích giúp bạn bảo quản quần áo đúng cách, kéo dài tuổi thọ cho các món đồ thời trang yêu thích.",
      author: "Phạm Thị Lan",
      date: "08/12/2024",
      category: "meo-vat",
      image: "https://picsum.photos/seed/careguide/400/250",
      readTime: "6 phút đọc",
      featured: false,
      linkedProducts: []
    },
    {
      id: 5,
      title: "Thời Trang Bền Vững: Lựa Chối Xanh",
      excerpt: "Khám phá xu hướng thời trang bền vững và các thương hiệu đang tiên phong trong việc bảo vệ môi trường.",
      author: "Hoàng Văn Nam",
      date: "05/12/2024",
      category: "ben-vung",
      image: "https://picsum.photos/seed/sustainable/400/250",
      readTime: "8 phút đọc",
      featured: true,
      linkedProducts: [
        { id: 7, name: "Áo cotton organic", price: "450.000đ" },
        { id: 8, name: "Túi tái chế", price: "200.000đ" }
      ]
    },
    {
      id: 6,
      title: "Phong Cách Minimalist Cho Người Mới Bắt Đầu",
      excerpt: "Hướng dẫn xây dựng tủ đồ theo phong cách minimalist, giúp bạn có những bộ trang phục tinh tế và thanh lịch.",
      author: "Đỗ Thị Mai",
      date: "03/12/2024",
      category: "phong-cach",
      image: "https://picsum.photos/seed/minimalist/400/250",
      readTime: "5 phút đọc",
      featured: false,
      linkedProducts: [
        { id: 9, name: "Áo sơ mi trắng", price: "600.000đ" },
        { id: 10, name: "Quần tây đen", price: "750.000đ" }
      ]
    }
  ];

  const categories = [
    { id: "all", name: "Tất cả", icon: "📚" },
    { id: "thoi-trang", name: "Thời trang", icon: "👗" },
    { id: "thue-do", name: "Thuê đồ", icon: "🛍️" },
    { id: "phong-cach", name: "Phong cách", icon: "🎨" },
    { id: "meo-vat", name: "Mẹo vặt", icon: "💡" },
    { id: "ben-vung", name: "Bền vững", icon: "🌱" }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="hero-content">
          <h1>Blog TMie</h1>
          <p>Cập nhật xu hướng thời trang, mẹo phối đồ và những câu chuyện thú vị về thế giới thời trang bền vững</p>
        </div>
      </div>

      <div className="blog-container">
        {/* Search and Filter Section */}
        <div className="blog-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === "all" && !searchQuery && (
          <section className="featured-section">
            <h2>Bài viết nổi bật</h2>
            <div className="featured-grid">
              {featuredPosts.map(post => (
                <article key={post.id} className="featured-card">
                  <div className="featured-image">
                    <img src={post.image} alt={post.title} />
                    <div className="featured-badge">Nổi bật</div>
                  </div>
                  <div className="featured-content">
                    <div className="post-meta">
                      <span className="category-tag">{categories.find(c => c.id === post.category)?.name}</span>
                      <span className="read-time">{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <div className="post-footer">
                      <div className="author-info">
                        <span className="author">{post.author}</span>
                        <span className="date">{post.date}</span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="read-more">
                        Đọc thêm →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts Grid */}
        <section className="posts-section">
          <h2>
            {selectedCategory === "all" ? "Tất cả bài viết" : categories.find(c => c.id === selectedCategory)?.name}
            {searchQuery && ` cho "${searchQuery}"`}
          </h2>
          
          {regularPosts.length === 0 ? (
            <div className="no-posts">
              <p>Không tìm thấy bài viết nào phù hợp với tìm kiếm của bạn.</p>
            </div>
          ) : (
            <div className="posts-grid">
              {regularPosts.map(post => (
                <article key={post.id} className="post-card">
                  <div className="post-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="post-content">
                    <div className="post-meta">
                      <span className="category-tag">{categories.find(c => c.id === post.category)?.name}</span>
                      <span className="read-time">{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    
                    {post.linkedProducts && post.linkedProducts.length > 0 && (
                      <div className="linked-products">
                        <span className="products-label">Sản phẩm liên quan:</span>
                        <div className="products-list">
                          {post.linkedProducts.slice(0, 2).map(product => (
                            <span key={product.id} className="product-tag">
                              {product.name}
                            </span>
                          ))}
                          {post.linkedProducts.length > 2 && (
                            <span className="more-products">+{post.linkedProducts.length - 2}</span>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="post-footer">
                      <div className="author-info">
                        <span className="author">{post.author}</span>
                        <span className="date">{post.date}</span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="read-more">
                        Đọc thêm →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogPage;