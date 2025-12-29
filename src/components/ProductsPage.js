import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ProductsPage.css';
import BackButton from './BackButton';

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Sample product data with featured, best-selling, and regular products
  const [products] = useState([
    // Featured products
    { id: 1, name: 'Váy dạ hội cao cấp', category: 'Váy dạ hội', price: 2500000, rentalPrice: 500000, image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg', isFeatured: true, isBestSeller: false, description: 'Váy dạ hội thiết kế cao cấp, phù hợp cho các sự kiện quan trọng', brand: 'TMie Collection', material: 'Silk', sizes: ['S', 'M', 'L'] },
    { id: 2, name: 'Vest công sở sang trọng', category: 'Vest', price: 3200000, rentalPrice: 400000, image: 'https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg', isFeatured: true, isBestSeller: false, description: 'Vest công sở cao cấp, thiết kế hiện đại và thanh lịch', brand: 'TMie Business', material: 'Wool', sizes: ['M', 'L', 'XL'] },
    { id: 3, name: 'Đầm cocktail thời trang', category: 'Đầm', price: 1800000, rentalPrice: 350000, image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg', isFeatured: true, isBestSeller: false, description: 'Đầm cocktail thiết kế độc đáo, phù hợp cho các buổi tiệc', brand: 'TMie Evening', material: 'Chiffon', sizes: ['S', 'M', 'L'] },
    
    // Best-selling products
    { id: 4, name: 'Áo sơ mi cao cấp', category: 'Áo sơ mi', price: 950000, rentalPrice: 150000, image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg', isFeatured: false, isBestSeller: true, description: 'Áo sơ mi cao cấp, chất liệu cotton thoáng mát', brand: 'TMie Office', material: 'Cotton', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 5, name: 'Quần tây công sở', category: 'Quần', price: 1200000, rentalPrice: 200000, image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg', isFeatured: false, isBestSeller: true, description: 'Quần tây công sở, form dáng chuẩn, chất liệu cao cấp', brand: 'TMie Business', material: 'Polyester', sizes: ['28', '29', '30', '31', '32'] },
    { id: 6, name: 'Váy hoa nữ tính', category: 'Váy', price: 1500000, rentalPrice: 300000, image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', isFeatured: false, isBestSeller: true, description: 'Váy hoa thiết kế nữ tính, phù hợp cho các buổi dạo phố', brand: 'TMie Casual', material: 'Rayon', sizes: ['S', 'M', 'L'] },
    
    // Regular products
    { id: 7, name: 'Áo blazer thời trang', category: 'Áo khoác', price: 2200000, rentalPrice: 380000, image: 'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg', isFeatured: false, isBestSeller: false, description: 'Áo blazer thiết kế hiện đại, phù hợp cho công sở và dạo phố', brand: 'TMie Style', material: 'Tweed', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 8, name: 'Chân váy bút chì', category: 'Chân váy', price: 1100000, rentalPrice: 180000, image: 'https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg', isFeatured: false, isBestSeller: false, description: 'Chân váy bút chì form dáng chuẩn, phù hợp cho công sở', brand: 'TMie Office', material: 'Polyester', sizes: ['S', 'M', 'L'] },
    { id: 9, name: 'Áo thun premium', category: 'Áo thun', price: 650000, rentalPrice: 100000, image: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg', isFeatured: false, isBestSeller: false, description: 'Áo thun cao cấp, chất liệu cotton 100%', brand: 'TMie Basic', material: 'Cotton', sizes: ['S', 'M', 'L', 'XL'] },
    { id: 10, name: 'Quần jeans thời trang', category: 'Quần', price: 1400000, rentalPrice: 220000, image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg', isFeatured: false, isBestSeller: false, description: 'Quần jeans form dáng đẹp, chất liệu denim cao cấp', brand: 'TMie Denim', material: 'Denim', sizes: ['28', '29', '30', '31', '32'] },
    { id: 11, name: 'Váy maxi mùa hè', category: 'Váy', price: 1700000, rentalPrice: 280000, image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg', isFeatured: false, isBestSeller: false, description: 'Váy maxi thiết kế thoải mái, phù hợp cho mùa hè', brand: 'TMie Summer', material: 'Rayon', sizes: ['S', 'M', 'L'] },
    { id: 12, name: 'Áo khoác denim', category: 'Áo khoác', price: 1900000, rentalPrice: 320000, image: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg', isFeatured: false, isBestSeller: false, description: 'Áo khoác denim phong cách trẻ trung, năng động', brand: 'TMie Casual', material: 'Denim', sizes: ['S', 'M', 'L', 'XL'] }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const productsPerPage = 6;
  
  // Check if there's a search query or category from navigation
  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchTerm(location.state.searchQuery);
      setActiveSection('all'); // Show all products when searching
      setCurrentPage(1); // Reset to first page
    }
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
      setActiveSection('all'); // Show all products when filtering by category
      setCurrentPage(1); // Reset to first page
    }
  }, [location.state]);

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return ['all', ...uniqueCategories];
  }, [products]);

  // Filter products based on active section, search term, and category
  const getFilteredProducts = useMemo(() => {
    let filtered = products;
    
    // Filter by section
    switch (activeSection) {
      case 'featured':
        filtered = filtered.filter(product => product.isFeatured);
        break;
      case 'bestSelling':
        filtered = filtered.filter(product => product.isBestSeller);
        break;
      case 'all':
      default:
        // Keep all products
        break;
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    return filtered;
  }, [products, activeSection, searchTerm, selectedCategory]);

  const filteredProducts = getFilteredProducts;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setCurrentPage(1); // Reset to first page when changing sections
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setCurrentPage(1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="products-page">
      <div className="container">
        <BackButton text="Quay lại" />
        <h1 className="page-title">
          {selectedCategory !== 'all' ? `${selectedCategory}` : 'Sản phẩm'}
        </h1>
        
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
          
          <div className="filter-container">
            <select
              className="category-filter"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">Tất cả danh mục</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
            {(searchTerm || selectedCategory !== 'all') && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
        
        {/* Product category tabs */}
        <div className="product-tabs">
          <button 
            className={`tab-button ${activeSection === 'featured' ? 'active' : ''}`}
            onClick={() => handleSectionChange('featured')}
          >
            Sản phẩm nổi bật
          </button>
          <button 
            className={`tab-button ${activeSection === 'bestSelling' ? 'active' : ''}`}
            onClick={() => handleSectionChange('bestSelling')}
          >
            Sản phẩm bán chạy
          </button>
          <button 
            className={`tab-button ${activeSection === 'all' ? 'active' : ''}`}
            onClick={() => handleSectionChange('all')}
          >
            Tất cả sản phẩm
          </button>
        </div>

        {/* Results count */}
        <div className="results-count">
          Hiển thị {filteredProducts.length} sản phẩm
          {searchTerm && ` cho tìm kiếm "${searchTerm}"`}
          {selectedCategory !== 'all' && ` trong danh mục "${selectedCategory}"`}
          {selectedCategory !== 'all' && activeSection !== 'all' && (
            <span> - {activeSection === 'featured' ? 'Nổi bật' : 'Bán chạy'}</span>
          )}
        </div>

        {/* Products grid */}
        <div className="products-grid">
          {currentProducts.map(product => (
            <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                {product.isFeatured && <span className="product-badge featured">Nổi bật</span>}
                {product.isBestSeller && <span className="product-badge best-seller">Bán chạy</span>}
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-brand">Thương hiệu: {product.brand}</p>
                <p className="product-material">Chất liệu: {product.material}</p>
                <p className="product-sizes">Kích thước: {product.sizes.join(', ')}</p>
                <p className="product-description">{product.description}</p>
                <div className="product-price">
                  <span className="purchase-price">Mua: {formatPrice(product.price)}</span>
                  <span className="rental-price">Thuê: {formatPrice(product.rentalPrice)}/ngày</span>
                </div>
                <div className="product-actions">
                  <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); handleProductClick(product.id); }}>Xem chi tiết</button>
                  <button className="btn btn-outline" onClick={(e) => { e.stopPropagation(); handleProductClick(product.id); }}>Thuê</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-button" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
            {[...Array(totalPages).keys()].map(pageNumber => (
              <button 
                key={pageNumber + 1} 
                className={`pagination-button ${currentPage === pageNumber + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            ))}
            <button 
              className="pagination-button" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &raquo;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;