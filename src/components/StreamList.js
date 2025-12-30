import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './StreamList.css';

const StreamList = ({ currentLanguage, translations }) => {
  const navigate = useNavigate();
  const [streams, setStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, live, upcoming
  const [searchTerm, setSearchTerm] = useState('');

  // Mock streams data
  useEffect(() => {
    // Simulate loading streams
    const mockStreams = [
      {
        id: 'stream1',
        title: currentLanguage === 'vi' ? 'Bộ sưu tập Xuân Hè 2024' : 'Spring Summer 2024 Collection',
        streamer: 'TMie Fashion',
        thumbnail: '/api/placeholder/400/225',
        viewers: 523,
        isLive: true,
        startTime: new Date(),
        category: 'fashion',
        description: currentLanguage === 'vi' 
          ? 'Khám phá xu hướng thời trang mới nhất cho mùa xuân hè'
          : 'Discover the latest fashion trends for spring summer',
        products: [
          { id: 1, name: 'Summer Dress', price: 450000, discount: 20 },
          { id: 2, name: 'Beach Wear', price: 350000, discount: 15 }
        ]
      },
      {
        id: 'stream2',
        title: currentLanguage === 'vi' ? 'Giảm giá Sốc - Đồ Thể Thao' : 'Shock Sale - Sportswear',
        streamer: 'TMie Sports',
        thumbnail: '/api/placeholder/400/225',
        viewers: 289,
        isLive: true,
        startTime: new Date(Date.now() - 3600000),
        category: 'sports',
        description: currentLanguage === 'vi' 
          ? 'Ưu đãi lên đến 50% cho các sản phẩm thể thao'
          : 'Up to 50% off on sportswear products',
        products: [
          { id: 3, name: 'Running Shoes', price: 850000, discount: 30 },
          { id: 4, name: 'Yoga Set', price: 650000, discount: 25 }
        ]
      },
      {
        id: 'stream3',
        title: currentLanguage === 'vi' ? 'Phụ kiện Thời trang Cao cấp' : 'Premium Fashion Accessories',
        streamer: 'TMie Luxury',
        thumbnail: '/api/placeholder/400/225',
        viewers: 156,
        isLive: false,
        startTime: new Date(Date.now() + 7200000),
        category: 'accessories',
        description: currentLanguage === 'vi' 
          ? 'Bộ sưu tập phụ kiện độc quyền'
          : 'Exclusive accessories collection',
        products: [
          { id: 5, name: 'Designer Bag', price: 2500000, discount: 10 },
          { id: 6, name: 'Premium Watch', price: 3500000, discount: 15 }
        ]
      },
      {
        id: 'stream4',
        title: currentLanguage === 'vi' ? 'Thời trang Công sở Thanh lịch' : 'Elegant Office Fashion',
        streamer: 'TMie Professional',
        thumbnail: '/api/placeholder/400/225',
        viewers: 412,
        isLive: true,
        startTime: new Date(Date.now() - 1800000),
        category: 'office',
        description: currentLanguage === 'vi' 
          ? 'Trang phục công sở hiện đại và thanh lịch'
          : 'Modern and elegant office attire',
        products: [
          { id: 7, name: 'Business Suit', price: 1500000, discount: 20 },
          { id: 8, name: 'Office Shoes', price: 750000, discount: 15 }
        ]
      },
      {
        id: 'stream5',
        title: currentLanguage === 'vi' ? 'Đồ mặc nhà Thoải mái' : 'Comfortable Home Wear',
        streamer: 'TMie Comfort',
        thumbnail: '/api/placeholder/400/225',
        viewers: 198,
        isLive: true,
        startTime: new Date(Date.now() - 5400000),
        category: 'home',
        description: currentLanguage === 'vi' 
          ? 'Thời trang mặc nhà tiện dụng và phong cách'
          : 'Convenient and stylish home wear',
        products: [
          { id: 9, name: 'Lounge Set', price: 450000, discount: 25 },
          { id: 10, name: 'Pajamas', price: 350000, discount: 20 }
        ]
      },
      {
        id: 'stream6',
        title: currentLanguage === 'vi' ? 'Thời trang Trẻ em Mới nhất' : 'Latest Kids Fashion',
        streamer: 'TMie Kids',
        thumbnail: '/api/placeholder/400/225',
        viewers: 0,
        isLive: false,
        startTime: new Date(Date.now() + 14400000),
        category: 'kids',
        description: currentLanguage === 'vi' 
          ? 'Bộ sưu tập thời trang cho bé yêu'
          : 'Fashion collection for beloved kids',
        products: [
          { id: 11, name: 'Kids Dress', price: 250000, discount: 30 },
          { id: 12, name: 'Kids Shoes', price: 200000, discount: 25 }
        ]
      }
    ];

    setTimeout(() => {
      setStreams(mockStreams);
      setLoading(false);
    }, 1000);
  }, [currentLanguage]);

  const filteredStreams = streams.filter(stream => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'live' && stream.isLive) || 
      (filter === 'upcoming' && !stream.isLive);
    
    const matchesSearch = stream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stream.streamer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stream.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleStreamClick = (streamId) => {
    navigate(`/livestream/${streamId}`);
  };

  const formatTime = (date) => {
    if (date > new Date()) {
      // Upcoming stream
      const hours = Math.floor((date - new Date()) / (1000 * 60 * 60));
      const minutes = Math.floor((date - new Date()) / (1000 * 60)) % 60;
      
      if (hours > 0) {
        return currentLanguage === 'vi' 
          ? `Bắt đầu sau ${hours} giờ ${minutes} phút` 
          : `Starts in ${hours}h ${minutes}m`;
      } else {
        return currentLanguage === 'vi' 
          ? `Bắt đầu sau ${minutes} phút` 
          : `Starts in ${minutes}m`;
      }
    } else {
      // Live or past stream
      const duration = Math.floor((new Date() - date) / (1000 * 60));
      if (duration < 60) {
        return currentLanguage === 'vi' 
          ? `Đã phát ${duration} phút` 
          : `${duration} minutes ago`;
      } else {
        const hours = Math.floor(duration / 60);
        return currentLanguage === 'vi' 
          ? `Đã phát ${hours} giờ` 
          : `${hours} hours ago`;
      }
    }
  };

  const getMaxDiscount = (products) => {
    if (!products || products.length === 0) return 0;
    return Math.max(...products.map(p => p.discount || 0));
  };

  if (loading) {
    return (
      <div className="stream-list-loading">
        <div className="loading-spinner"></div>
        <p>{currentLanguage === 'vi' ? 'Đang tải danh sách livestream...' : 'Loading livestream list...'}</p>
      </div>
    );
  }

  return (
    <div className="stream-list">
      <BackButton />
      
      <div className="stream-list-container">
        <div className="stream-list-header">
          <h1>
            {currentLanguage === 'vi' ? 'Livestream' : 'Livestream'}
          </h1>
          
          <button 
            className="create-stream-btn"
            onClick={() => navigate('/create-stream')}
          >
            {currentLanguage === 'vi' ? 'Tạo Livestream' : 'Create Livestream'}
          </button>
        </div>
        
        <div className="stream-list-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder={currentLanguage === 'vi' ? 'Tìm kiếm livestream...' : 'Search livestreams...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="filter-tabs">
            <button
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              {currentLanguage === 'vi' ? 'Tất cả' : 'All'}
            </button>
            <button
              className={`filter-tab ${filter === 'live' ? 'active' : ''}`}
              onClick={() => setFilter('live')}
            >
              {currentLanguage === 'vi' ? 'Đang phát' : 'Live'}
            </button>
            <button
              className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              {currentLanguage === 'vi' ? 'Sắp phát' : 'Upcoming'}
            </button>
          </div>
        </div>
        
        {filteredStreams.length === 0 ? (
          <div className="no-streams">
            <div className="no-streams-icon">📺</div>
            <h3>
              {currentLanguage === 'vi' 
                ? 'Không tìm thấy livestream nào' 
                : 'No livestreams found'}
            </h3>
            <p>
              {currentLanguage === 'vi' 
                ? 'Thử thay đổi bộ lọc hoặc tìm kiếm với từ khóa khác' 
                : 'Try changing filters or search with different keywords'}
            </p>
          </div>
        ) : (
          <div className="streams-grid">
            {filteredStreams.map(stream => (
              <div 
                key={stream.id}
                className="stream-card"
                onClick={() => handleStreamClick(stream.id)}
              >
                <div className="stream-thumbnail">
                  <img src={stream.thumbnail} alt={stream.title} />
                  
                  {stream.isLive && (
                    <div className="live-badge">
                      <span className="live-dot"></span>
                      {currentLanguage === 'vi' ? 'LIVE' : 'LIVE'}
                    </div>
                  )}
                  
                  <div className="stream-stats">
                    {stream.isLive && stream.viewers > 0 && (
                      <span className="viewer-count">
                        👁 {stream.viewers}
                      </span>
                    )}
                    
                    {getMaxDiscount(stream.products) > 0 && (
                      <span className="discount-badge">
                        -{getMaxDiscount(stream.products)}%
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="stream-info">
                  <h3 className="stream-title">{stream.title}</h3>
                  <p className="stream-streamer">{stream.streamer}</p>
                  <p className="stream-description">{stream.description}</p>
                  
                  <div className="stream-meta">
                    <span className="stream-time">
                      {formatTime(stream.startTime)}
                    </span>
                    
                    {stream.products && stream.products.length > 0 && (
                      <span className="product-count">
                        {stream.products.length} {currentLanguage === 'vi' ? 'sản phẩm' : 'products'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamList;