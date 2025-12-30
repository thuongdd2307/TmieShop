import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './LiveStreamPage.css';

const LiveStreamPage = ({ currentLanguage, translations }) => {
  const { streamId } = useParams();
  const navigate = useNavigate();
  const [stream, setStream] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  
  const videoRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Simulated stream data
  useEffect(() => {
    // Simulate fetching stream data
    const mockStream = {
      id: streamId,
      title: currentLanguage === 'vi' ? 'Livestream Thời Trang Mới Nhất' : 'Latest Fashion Livestream',
      streamer: currentLanguage === 'vi' ? 'TMie Fashion' : 'TMie Fashion',
      viewers: Math.floor(Math.random() * 1000) + 100,
      description: currentLanguage === 'vi' 
        ? 'Khám phá bộ sưu tập thời trang mới nhất của chúng tôi với ưu đãi đặc biệt chỉ có trong livestream!'
        : 'Discover our latest fashion collection with special offers only available during the livestream!',
      products: [
        { id: 1, name: 'Summer Dress', price: 450000, image: '/api/placeholder/200/200' },
        { id: 2, name: 'Casual Shirt', price: 350000, image: '/api/placeholder/200/200' },
        { id: 3, name: 'Designer Bag', price: 1200000, image: '/api/placeholder/200/200' }
      ]
    };
    
    setStream(mockStream);
    setViewerCount(mockStream.viewers);
    
    // Simulate connection
    setTimeout(() => {
      setIsConnected(true);
    }, 1000);
    
    // Simulate viewer count updates
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 5000);
    
    // Simulate chat messages
    const chatInterval = setInterval(() => {
      const mockMessages = [
        currentLanguage === 'vi' ? 'Tuyệt vời!' : 'Amazing!',
        currentLanguage === 'vi' ? 'Mình thích chiếc váy đó' : 'I love that dress',
        currentLanguage === 'vi' ? 'Giá bao nhiêu?' : 'How much is it?',
        currentLanguage === 'vi' ? 'Có giảm giá không?' : 'Is there a discount?',
        currentLanguage === 'vi' ? 'Mua ngay!' : 'Buy it now!'
      ];
      
      const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
      const randomUser = `User${Math.floor(Math.random() * 1000)}`;
      
      setChatMessages(prev => [
        ...prev,
        { user: randomUser, message: randomMessage, timestamp: new Date() }
      ]);
    }, 8000);
    
    return () => {
      clearInterval(viewerInterval);
      clearInterval(chatInterval);
    };
  }, [streamId, currentLanguage]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setChatMessages(prev => [
        ...prev,
        { user: 'You', message: message, timestamp: new Date() }
      ]);
      setMessage('');
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (!stream) {
    return (
      <div className="livestream-loading">
        <div className="loading-spinner"></div>
        <p>{currentLanguage === 'vi' ? 'Đang tải livestream...' : 'Loading livestream...'}</p>
      </div>
    );
  }

  return (
    <div className="livestream-page">
      <BackButton />
      
      <div className="livestream-container">
        <div className="livestream-main">
          <div className="livestream-video-container">
            <video
              ref={videoRef}
              className="livestream-video"
              autoPlay
              playsInline
              muted={isMuted}
              poster="/api/placeholder/800/450"
            />
            
            {!isConnected && (
              <div className="livestream-connecting">
                <div className="connecting-spinner"></div>
                <p>{currentLanguage === 'vi' ? 'Đang kết nối...' : 'Connecting...'}</p>
              </div>
            )}
            
            <div className="livestream-overlay">
              <div className="livestream-info">
                <h1>{stream.title}</h1>
                <div className="livestream-stats">
                  <span className="viewer-count">
                    <span className="live-indicator"></span>
                    {viewerCount} {currentLanguage === 'vi' ? 'người xem' : 'viewers'}
                  </span>
                </div>
              </div>
              
              <div className="livestream-controls">
                <button 
                  className="volume-control"
                  onClick={toggleMute}
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="volume-slider"
                />
              </div>
            </div>
          </div>
          
          <div className="livestream-products">
            <h3>{currentLanguage === 'vi' ? 'Sản phẩm trong livestream' : 'Products in livestream'}</h3>
            <div className="products-grid">
              {stream.products.map(product => (
                <div 
                  key={product.id}
                  className="product-card"
                  onClick={() => handleProductClick(product.id)}
                >
                  <img src={product.image} alt={product.name} />
                  <h4>{product.name}</h4>
                  <p className="price">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(product.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="livestream-sidebar">
          <div className="livestream-chat">
            <h3>{currentLanguage === 'vi' ? 'Trò chuyện' : 'Chat'}</h3>
            
            <div className="chat-messages" ref={chatContainerRef}>
              {chatMessages.map((msg, index) => (
                <div key={index} className="chat-message">
                  <span className="chat-user">{msg.user}:</span>
                  <span className="chat-text">{msg.message}</span>
                </div>
              ))}
            </div>
            
            <form className="chat-input" onSubmit={handleSendMessage}>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={currentLanguage === 'vi' ? 'Nhập tin nhắn...' : 'Type a message...'}
              />
              <button type="submit">
                {currentLanguage === 'vi' ? 'Gửi' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStreamPage;