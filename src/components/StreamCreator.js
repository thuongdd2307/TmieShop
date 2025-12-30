import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './StreamCreator.css';

const StreamCreator = ({ currentLanguage, translations }) => {
  const navigate = useNavigate();
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamTitle, setStreamTitle] = useState('');
  const [streamDescription, setStreamDescription] = useState('');
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const [streamKey, setStreamKey] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Mock products for selection
  const mockProducts = [
    { id: 1, name: 'Summer Dress', price: 450000, image: '/api/placeholder/100/100' },
    { id: 2, name: 'Casual Shirt', price: 350000, image: '/api/placeholder/100/100' },
    { id: 3, name: 'Designer Bag', price: 1200000, image: '/api/placeholder/100/100' },
    { id: 4, name: 'Fashion Shoes', price: 850000, image: '/api/placeholder/100/100' },
    { id: 5, name: 'Accessories Set', price: 250000, image: '/api/placeholder/100/100' },
    { id: 6, name: 'Premium Watch', price: 2500000, image: '/api/placeholder/100/100' }
  ];

  useEffect(() => {
    // Generate mock stream key
    const mockStreamKey = `sk_${Math.random().toString(36).substr(2, 9)}`;
    setStreamKey(mockStreamKey);
    setStreamUrl(`rtmp://live.tmie.com/live/${mockStreamKey}`);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      streamRef.current = stream;
      setIsCameraOn(true);
      setIsMicrophoneOn(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert(currentLanguage === 'vi' 
        ? 'Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.' 
        : 'Cannot access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setIsCameraOn(false);
    setIsMicrophoneOn(false);
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  const toggleMicrophone = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMicrophoneOn(!isMicrophoneOn);
    }
  };

  const handleProductToggle = (product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const startStream = async () => {
    if (!streamTitle.trim()) {
      alert(currentLanguage === 'vi' 
        ? 'Vui lòng nhập tiêu đề livestream' 
        : 'Please enter stream title');
      return;
    }

    if (!isCameraOn) {
      alert(currentLanguage === 'vi' 
        ? 'Vui lòng bật camera trước khi bắt đầu livestream' 
        : 'Please turn on camera before starting livestream');
      return;
    }

    setIsStreaming(true);
    
    // Simulate viewer count increase
    const viewerInterval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);

    // Simulate stream creation and redirect
    setTimeout(() => {
      clearInterval(viewerInterval);
      const streamId = Math.random().toString(36).substr(2, 9);
      navigate(`/livestream/${streamId}`);
    }, 2000);
  };

  const stopStream = () => {
    setIsStreaming(false);
    setViewerCount(0);
    stopCamera();
  };

  return (
    <div className="stream-creator">
      <BackButton />
      
      <div className="creator-container">
        <h1>
          {currentLanguage === 'vi' ? 'Tạo Livestream Mới' : 'Create New Livestream'}
        </h1>
        
        <div className="creator-layout">
          <div className="creator-main">
            <div className="video-section">
              <div className="video-container">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="preview-video"
                />
                
                {!isCameraOn && (
                  <div className="video-placeholder">
                    <div className="camera-icon">📹</div>
                    <p>
                      {currentLanguage === 'vi' 
                        ? 'Bật camera để xem trước' 
                        : 'Turn on camera to preview'}
                    </p>
                  </div>
                )}
                
                {isStreaming && (
                  <div className="streaming-indicator">
                    <span className="live-dot"></span>
                    {currentLanguage === 'vi' ? 'ĐANG PHÁT' : 'LIVE'}
                    <span className="viewer-count">{viewerCount} viewers</span>
                  </div>
                )}
              </div>
              
              <div className="video-controls">
                <button
                  className={`control-btn ${isCameraOn ? 'active' : ''}`}
                  onClick={toggleCamera}
                  disabled={isStreaming}
                >
                  {isCameraOn ? '📹' : '📹'}
                  <span>{isCameraOn ? 
                    (currentLanguage === 'vi' ? 'Tắt Camera' : 'Turn Off Camera') : 
                    (currentLanguage === 'vi' ? 'Bật Camera' : 'Turn On Camera')
                  }</span>
                </button>
                
                <button
                  className={`control-btn ${isMicrophoneOn ? 'active' : ''}`}
                  onClick={toggleMicrophone}
                  disabled={!isCameraOn || isStreaming}
                >
                  {isMicrophoneOn ? '🎤' : '🔇'}
                  <span>{isMicrophoneOn ? 
                    (currentLanguage === 'vi' ? 'Tắt Mic' : 'Mute Mic') : 
                    (currentLanguage === 'vi' ? 'Bật Mic' : 'Unmute Mic')
                  }</span>
                </button>
              </div>
            </div>
            
            <div className="stream-settings">
              <div className="form-group">
                <label>
                  {currentLanguage === 'vi' ? 'Tiêu đề Livestream' : 'Stream Title'}
                </label>
                <input
                  type="text"
                  value={streamTitle}
                  onChange={(e) => setStreamTitle(e.target.value)}
                  placeholder={currentLanguage === 'vi' 
                    ? 'Nhập tiêu đề livestream hấp dẫn...' 
                    : 'Enter an attractive stream title...'}
                  disabled={isStreaming}
                />
              </div>
              
              <div className="form-group">
                <label>
                  {currentLanguage === 'vi' ? 'Mô tả' : 'Description'}
                </label>
                <textarea
                  value={streamDescription}
                  onChange={(e) => setStreamDescription(e.target.value)}
                  placeholder={currentLanguage === 'vi' 
                    ? 'Mô tả về sản phẩm sẽ được giới thiệu...' 
                    : 'Describe the products that will be featured...'}
                  rows={3}
                  disabled={isStreaming}
                />
              </div>
              
              <div className="form-group">
                <label>
                  {currentLanguage === 'vi' ? 'Stream Key (dành cho phần mềm bên thứ ba)' : 'Stream Key (for third-party software)'}
                </label>
                <div className="stream-key-container">
                  <input
                    type="text"
                    value={streamKey}
                    readOnly
                    className="stream-key"
                  />
                  <button
                    className="copy-btn"
                    onClick={() => navigator.clipboard.writeText(streamKey)}
                  >
                    {currentLanguage === 'vi' ? 'Sao chép' : 'Copy'}
                  </button>
                </div>
                <small className="stream-url">
                  RTMP URL: {streamUrl}
                </small>
              </div>
              
              <div className="stream-actions">
                {!isStreaming ? (
                  <button
                    className="start-stream-btn"
                    onClick={startStream}
                    disabled={!streamTitle.trim() || !isCameraOn}
                  >
                    {currentLanguage === 'vi' ? 'Bắt đầu Livestream' : 'Start Livestream'}
                  </button>
                ) : (
                  <button
                    className="stop-stream-btn"
                    onClick={stopStream}
                  >
                    {currentLanguage === 'vi' ? 'Kết thúc Livestream' : 'End Livestream'}
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="creator-sidebar">
            <div className="product-selection">
              <h3>
                {currentLanguage === 'vi' ? 'Chọn sản phẩm để giới thiệu' : 'Select Products to Feature'}
              </h3>
              
              <div className="product-list">
                {mockProducts.map(product => (
                  <div
                    key={product.id}
                    className={`product-item ${selectedProducts.some(p => p.id === product.id) ? 'selected' : ''}`}
                    onClick={() => handleProductToggle(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p className="price">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(product.price)}
                      </p>
                    </div>
                    <div className="product-checkbox">
                      {selectedProducts.some(p => p.id === product.id) && '✓'}
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedProducts.length > 0 && (
                <div className="selected-summary">
                  <p>
                    {currentLanguage === 'vi' 
                      ? `Đã chọn ${selectedProducts.length} sản phẩm` 
                      : `${selectedProducts.length} products selected`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamCreator;