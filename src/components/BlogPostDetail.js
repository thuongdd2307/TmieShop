import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./BlogPostDetail.css";

const BlogPostDetail = () => {
  const { postId } = useParams();
  const [activeTab, setActiveTab] = useState("content");

  // Sample blog post data - in real app, this would come from API
  const blogPost = {
    id: parseInt(postId),
    title: "Xu Hướng Thời Trang Thu Đông 2024",
    content: `
      <h2>Giới thiệu</h2>
      <p>Mùa thu đông 2024 đã mang đến nhiều xu hướng thời trang thú vị, kết hợp giữa sự cổ điển và hiện đại. Các nhà thiết kế đã tạo ra những bộ sưu tập ấn tượng với màu sắc, chất liệu và kiểu dáng đa dạng.</p>
      
      <h2>Màu sắc chủ đạo</h2>
      <p>Năm nay, các gam màu đất như nâu, be, olive xanh và burgundy đang là tâm điểm. Những màu sắc này không chỉ mang lại cảm giác ấm áp mà còn rất dễ phối đồ.</p>
      <ul>
        <li>Màu nâu chocolate - sang trọng và tinh tế</li>
        <li>Xanh olive - cá tính và hiện đại</li>
        <li>Màu be - thanh lịch và dễ phối</li>
        <li>Burgundy - quyến rũ và nổi bật</li>
      </ul>
      
      <h2>Chất liệu nổi bật</h2>
      <p>Các chất liệu được ưa chuộng trong mùa thu đông 2024 bao gồm:</p>
      <ul>
        <li>Len cashmere - mềm mại và ấm áp</li>
        <li>Dạ tweed - cổ điển và sang trọng</li>
        <li>Da thật - bền đẹp và đẳng cấp</li>
        <li>Lông thú nhân tạo - thân thiện với môi trường</li>
      </ul>
      
      <h2>Kiểu dáng hot nhất</h2>
      <p>Các kiểu dáng đang làm mưa làm gió trên sàn diễn quốc tế:</p>
      <ul>
        <li>Áo khoác oversize</li>
        <li>Quần ống rộng</li>
        <li>Váy len dài</li>
        <li>Đồ đôi (matching sets)</li>
      </ul>
      
      <h2>Cách phối đồ theo xu hướng</h2>
      <p>Để bắt kịp xu hướng thu đông 2024, bạn có thể:</p>
      <ol>
        <li>Chọn 1-2 món đồ theo xu hướng và kết hợp với các món đồ cơ bản</li>
        <li>Tập trung vào chất liệu thay vì chỉ màu sắc</li>
        <li>Kết hợp các lớp đồ để tạo chiều sâu</li>
        <li>Thêm phụ kiện để hoàn thiện bộ trang phục</li>
      </ol>
      
      <h2>Kết luận</h2>
      <p>Xu hướng thời trang thu đông 2024 mang đến nhiều lựa chọn đa dạng, phù hợp với nhiều phong cách khác nhau. Hãy chọn những món đồ phù hợp với cá tính và nhu cầu của bạn để tạo nên phong cách riêng.</p>
    `,
    author: "Nguyễn Thị Mai",
    date: "15/12/2024",
    category: "thoi-trang",
    image: "https://picsum.photos/seed/fashion2024/800/400",
    readTime: "5 phút đọc",
    tags: ["thời trang", "xu hướng", "thu đông", "2024"],
    linkedProducts: [
      { id: 1, name: "Áo khoác dạ cao cấp", price: "1.200.000đ", image: "https://picsum.photos/seed/coat1/100/100", link: "/products/1" },
      { id: 2, name: "Quần jeans skinny", price: "850.000đ", image: "https://picsum.photos/seed/jeans1/100/100", link: "/products/2" },
      { id: 3, name: "Áo len cashmere", price: "950.000đ", image: "https://picsum.photos/seed/sweater1/100/100", link: "/products/3" },
      { id: 4, name: "Váy len dài", price: "750.000đ", image: "https://picsum.photos/seed/dress1/100/100", link: "/products/4" }
    ],
    relatedPosts: [
      { id: 2, title: "Cách Chọn Quần Áo Thuê Phù Hợp", image: "https://picsum.photos/seed/rentalguide/150/100" },
      { id: 3, title: "Mix & Match: Phong Cách Street Style", image: "https://picsum.photos/seed/streetstyle/150/100" },
      { id: 5, title: "Thời Trang Bền Vững: Lựa Chối Xanh", image: "https://picsum.photos/seed/sustainable/150/100" }
    ],
    comments: [
      { id: 1, author: "Trần Thị Hoa", content: "Bài viết rất hay và hữu ích! Cảm ơn chia sẻ của tác giả.", date: "16/12/2024", avatar: "https://i.pravatar.cc/40?img=1" },
      { id: 2, author: "Lê Văn Nam", content: "Mình rất thích các gợi ý phối đồ. Rất thực tế và dễ áp dụng.", date: "16/12/2024", avatar: "https://i.pravatar.cc/40?img=2" },
      { id: 3, author: "Phạm Thị Mai", content: "Xu hướng năm nay thật sự thú vị. Mình đã mua được vài món đồ theo gợi ý và rất ưng ý!", date: "17/12/2024", avatar: "https://i.pravatar.cc/40?img=3" }
    ]
  };

  const renderContent = () => (
    <div className="post-content">
      <div className="post-header">
        <div className="post-image">
          <img src={blogPost.image} alt={blogPost.title} />
        </div>
        <div className="post-meta">
          <div className="meta-left">
            <span className="author">👤 {blogPost.author}</span>
            <span className="date">📅 {blogPost.date}</span>
            <span className="read-time">⏱️ {blogPost.readTime}</span>
          </div>
          <div className="meta-right">
            <button className="share-btn">🔗 Chia sẻ</button>
            <button className="bookmark-btn">🔖 Lưu lại</button>
          </div>
        </div>
      </div>

      <div className="post-body">
        <h1>{blogPost.title}</h1>
        
        <div className="tags">
          {blogPost.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>

        <div 
          className="post-text"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="products-section">
      <h3>Sản phẩm liên quan</h3>
      <div className="products-grid">
        {blogPost.linkedProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h4>{product.name}</h4>
              <p className="product-price">{product.price}</p>
              <Link to={product.link} className="view-product-btn">
                Xem sản phẩm
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderComments = () => (
    <div className="comments-section">
      <h3>Bình luận ({blogPost.comments.length})</h3>
      
      <div className="comment-form">
        <div className="comment-input">
          <img src="https://i.pravatar.cc/40?img=current" alt="User" className="user-avatar" />
          <textarea 
            placeholder="Viết bình luận của bạn..."
            rows="3"
          />
        </div>
        <button className="submit-comment-btn">Gửi bình luận</button>
      </div>

      <div className="comments-list">
        {blogPost.comments.map(comment => (
          <div key={comment.id} className="comment">
            <img src={comment.avatar} alt={comment.author} className="comment-avatar" />
            <div className="comment-content">
              <div className="comment-header">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-date">{comment.date}</span>
              </div>
              <p className="comment-text">{comment.content}</p>
              <div className="comment-actions">
                <button className="like-btn">👍 Thích</button>
                <button className="reply-btn">💬 Trả lời</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="blog-post-detail">
      <div className="post-container">
        <div className="post-main">
          <div className="post-tabs">
            <button 
              className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              📄 Nội dung
            </button>
            <button 
              className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              🛍️ Sản phẩm ({blogPost.linkedProducts.length})
            </button>
            <button 
              className={`tab-btn ${activeTab === 'comments' ? 'active' : ''}`}
              onClick={() => setActiveTab('comments')}
            >
              💬 Bình luận ({blogPost.comments.length})
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'content' && renderContent()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'comments' && renderComments()}
          </div>
        </div>

        <aside className="post-sidebar">
          <div className="author-card">
            <h3>Tác giả</h3>
            <div className="author-info">
              <img src="https://i.pravatar.cc/80?img=author" alt={blogPost.author} />
              <div>
                <h4>{blogPost.author}</h4>
                <p>Chuyên gia thời trang với 10 năm kinh nghiệm</p>
              </div>
            </div>
          </div>

          <div className="related-posts">
            <h3>Bài viết liên quan</h3>
            <div className="related-list">
              {blogPost.relatedPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.id}`} className="related-item">
                  <img src={post.image} alt={post.title} />
                  <div>
                    <h4>{post.title}</h4>
                    <span>Đọc thêm →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="subscribe-card">
            <h3>Đăng ký nhận tin</h3>
            <p>Nhận những bài viết mới nhất về thời trang và xu hướng</p>
            <div className="subscribe-form">
              <input type="email" placeholder="Email của bạn" />
              <button>Đăng ký</button>
            </div>
          </div>
        </aside>
      </div>

      <div className="back-to-blog">
        <Link to="/blog" className="back-link">
          ← Quay lại danh sách bài viết
        </Link>
      </div>
    </div>
  );
};

export default BlogPostDetail;