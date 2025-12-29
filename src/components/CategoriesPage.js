import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoriesPage.css';
import BackButton from './BackButton';

const CategoriesPage = () => {
  const navigate = useNavigate();
  
  // Sample categories with images and descriptions
  const categories = [
    {
      id: 'vay-da-hoi',
      name: 'Váy dạ hội',
      description: 'Váy dạ hội thiết kế cao cấp cho các sự kiện quan trọng',
      image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg',
      productCount: 15
    },
    {
      id: 'vest',
      name: 'Vest',
      description: 'Vest công sở và dạo phố phong cách hiện đại',
      image: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg',
      productCount: 22
    },
    {
      id: 'dam',
      name: 'Đầm',
      description: 'Đầm công sở, dạo phố và cocktail đa dạng mẫu mã',
      image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg',
      productCount: 18
    },
    {
      id: 'ao-so-mi',
      name: 'Áo sơ mi',
      description: 'Áo sơ mi công sở cao cấp, thoáng mát',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
      productCount: 25
    },
    {
      id: 'quan',
      name: 'Quần',
      description: 'Quần tây, jeans và các loại quần thời trang',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
      productCount: 30
    },
    {
      id: 'ao-khoac',
      name: 'Áo khoác',
      description: 'Áo khoác blazer, denim và các loại áo khoác khác',
      image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg',
      productCount: 20
    },
    {
      id: 'chan-vay',
      name: 'Chân váy',
      description: 'Chân váy bút chì, chữ A và các kiểu chân váy khác',
      image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg',
      productCount: 16
    },
    {
      id: 'ao-thun',
      name: 'Áo thun',
      description: 'Áo thun premium cotton 100% thoáng mát',
      image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
      productCount: 28
    }
  ];

  const handleCategoryClick = (categoryName) => {
    // Navigate to products page with category filter
    navigate('/products', { state: { category: categoryName } });
  };

  return (
    <div className="categories-page">
      <div className="container">
        <BackButton text="Quay lại" />
        <h1 className="page-title">Danh mục sản phẩm</h1>
        <p className="page-description">Khám phá các danh mục sản phẩm đa dạng của TMie</p>
        
        <div className="categories-grid">
          {categories.map(category => (
            <div 
              key={category.id} 
              className="category-card"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="category-image-container">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="category-image"
                />
                <div className="category-overlay">
                  <span className="product-count">{category.productCount} sản phẩm</span>
                </div>
              </div>
              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <button className="view-category-btn">
                  Xem sản phẩm
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;