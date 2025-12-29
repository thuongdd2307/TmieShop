# Thiết kế hệ thống TMie - E-commerce với chức năng thuê

## I. Kiến trúc hệ thống

### 1. Mô hình tổng thể
```
Frontend (User / Admin)
↓
Backend API
↓
Business Services (Order, Rental, Inventory, Payment, Notification…)
↓
Database + Media + Message Queue
```

### 2. Công nghệ đề xuất

#### Frontend
- **Framework**: React.js với TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Material-UI hoặc Ant Design
- **Styling**: CSS Modules + Styled Components
- **Routing**: React Router
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios

#### Backend (Được phát triển riêng bằng Java)
- API endpoints sẽ được cung cấp bởi team Java
- Frontend sẽ tích hợp qua REST API

#### DevOps & Infrastructure
- **Deployment**: Vercel hoặc Netlify
- **Monitoring**: Sentry cho error tracking
- **Performance**: Google PageSpeed Insights

## II. Frontend Data Models (TypeScript Interfaces)

### 1. Core Data Types

```typescript
// User types
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'customer' | 'admin' | 'warehouse' | 'support' | 'content';
  status: 'active' | 'blocked' | 'pending';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Product types
interface Product {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  images: string[];
  variants: ProductVariant[];
  category?: Category;
  averageRating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  price: number;
  rentalPricePerDay: number;
  rentalPricePerWeek: number;
  depositAmount: number;
  condition: 'new' | 'used';
  inventoryCount: number;
  rentalInventoryCount: number;
  images: string[];
  attributes: Record<string, string>; // size, color, etc.
  rentalOption?: RentalOption;
}

interface RentalOption {
  id: string;
  variantId: string;
  isAvailableForRental: boolean;
  minRentalDays: number;
  maxRentalDays: number;
  maintenanceStatus: 'available' | 'rented' | 'maintenance' | 'damaged';
}

// Order types
interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  type: 'purchase' | 'rental';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
  subtotal: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;
  depositAmount?: number;
  rentalStartDate?: string;
  rentalEndDate?: string;
  actualReturnDate?: string;
  lateFee: number;
  shippingAddress: Address;
  billingAddress: Address;
  notes?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  id: string;
  orderId: string;
  variantId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variant?: ProductVariant;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Category types
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  imageUrl?: string;
  sortOrder: number;
  children?: Category[];
}

// Review types
interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number; // 1-5
  comment: string;
  verifiedPurchase: boolean;
  user?: User;
  createdAt: string;
}

// Blog/Content types
interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  status: 'published' | 'draft';
  authorId: string;
  author?: User;
  products?: Product[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Notification types
interface Notification {
  id: string;
  userId: string;
  type: 'rental_due' | 'rental_overdue' | 'order_confirmed' | 'deposit_refunded';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// Cart types
interface CartItem {
  id: string;
  variantId: string;
  quantity: number;
  type: 'purchase' | 'rental';
  rentalStartDate?: string;
  rentalEndDate?: string;
  variant?: ProductVariant;
}

interface Cart {
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;
  depositAmount: number;
}
```

## III. API Integration (Frontend sẽ gọi các endpoints này)

### 1. Authentication Endpoints
- `POST /api/auth/register` - Đăng ký người dùng mới
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất
- `POST /api/auth/refresh-token` - Làm mới token
- `POST /api/auth/forgot-password` - Quên mật khẩu
- `POST /api/auth/reset-password` - Đặt lại mật khẩu

### 2. User Endpoints
- `GET /api/users/profile` - Lấy thông tin người dùng
- `PUT /api/users/profile` - Cập nhật thông tin người dùng
- `GET /api/users/orders` - Lấy danh sách đơn hàng
- `GET /api/users/notifications` - Lấy thông báo
- `PUT /api/users/notifications/:id/read` - Đánh dấu đã đọc thông báo

### 3. Product Endpoints
- `GET /api/products` - Danh sách sản phẩm (với filters, pagination, sorting)
- `GET /api/products/:id` - Chi tiết sản phẩm
- `GET /api/products/:slug` - Chi tiết sản phẩm theo slug
- `GET /api/products/:id/variants` - Danh sách variants của sản phẩm
- `GET /api/products/featured` - Sản phẩm nổi bật
- `GET /api/products/rental-featured` - Sản phẩm thuê nổi bật
- `GET /api/products/search` - Tìm kiếm sản phẩm

### 4. Category Endpoints
- `GET /api/categories` - Danh sách danh mục
- `GET /api/categories/:slug` - Chi tiết danh mục
- `GET /api/categories/:slug/products` - Sản phẩm trong danh mục

### 5. Order Endpoints
- `POST /api/orders` - Tạo đơn hàng mới
- `GET /api/orders` - Danh sách đơn hàng
- `GET /api/orders/:id` - Chi tiết đơn hàng
- `PUT /api/orders/:id/cancel` - Hủy đơn hàng
- `POST /api/orders/:id/return` - Trả hàng thuê
- `POST /api/orders/:id/extend-rental` - Gia hạn thuê

### 6. Cart Endpoints
- `GET /api/cart` - Lấy giỏ hàng
- `POST /api/cart/add` - Thêm vào giỏ hàng
- `PUT /api/cart/update` - Cập nhật giỏ hàng
- `DELETE /api/cart/remove/:itemId` - Xóa item khỏi giỏ
- `DELETE /api/cart/clear` - Xóa toàn bộ giỏ hàng

### 7. Review Endpoints
- `GET /api/products/:id/reviews` - Đánh giá sản phẩm
- `POST /api/products/:id/reviews` - Thêm đánh giá
- `PUT /api/reviews/:id` - Cập nhật đánh giá
- `DELETE /api/reviews/:id` - Xóa đánh giá

### 8. Post Endpoints
- `GET /api/posts` - Danh sách bài viết
- `GET /api/posts/:slug` - Chi tiết bài viết
- `GET /api/posts/featured` - Bài viết nổi bật

### 9. Admin Endpoints
- `GET /api/admin/users` - Quản lý người dùng
- `PUT /api/admin/users/:id` - Cập nhật người dùng
- `GET /api/admin/products` - Quản lý sản phẩm
- `POST /api/admin/products` - Thêm sản phẩm mới
- `PUT /api/admin/products/:id` - Cập nhật sản phẩm
- `DELETE /api/admin/products/:id` - Xóa sản phẩm
- `GET /api/admin/orders` - Quản lý đơn hàng
- `PUT /api/admin/orders/:id/status` - Cập nhật trạng thái đơn hàng
- `GET /api/admin/analytics` - Thống kê analytics

## IV. UI/UX Design Guidelines

### 1. Design System
- **Color Palette**: 
  - Primary: #FF6B6B (vibrant coral)
  - Secondary: #4ECDC4 (turquoise)
  - Accent: #FFCC00 (yellow)
  - Neutral: #F8F9FA, #636E72, #2D3436
- **Typography**: 
  - Headings: Montserrat or Poppins
  - Body: Inter or Roboto
- **Spacing**: 8px base unit
- **Border Radius**: 8px for cards, 4px for buttons
- **Shadows**: Subtle with 0-2px blur for depth

### 2. Component Library
- **Buttons**: Primary, Secondary, Outline, Ghost variants
- **Cards**: Product cards, Order cards, User cards
- **Forms**: Controlled components with validation
- **Modals**: Confirmation, Product details, Image gallery
- **Navigation**: Header with search, cart, user menu
- **Footer**: Links, social media, newsletter signup

### 3. Responsive Design
- **Mobile First**: 320px and up
- **Breakpoints**: 
  - Mobile: 320px - 768px
  - Tablet: 768px - 1024px
  - Desktop: 1024px+

### 4. Accessibility
- WCAG 2.1 AA compliance
- Semantic HTML5
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast ratios

## V. Frontend Security Considerations

### 1. Authentication & Authorization
- JWT token storage in httpOnly cookies or secure localStorage
- Token refresh mechanism
- Role-based access control (RBAC) on frontend
- Rate limiting on auth endpoints
- Auto-logout on token expiration

### 2. Data Protection
- Input validation and sanitization
- XSS protection with proper escaping
- CSRF protection with tokens
- Secure handling of sensitive data
- HTTPS enforcement in production

### 3. Payment Security
- PCI DSS compliance on frontend
- Secure payment gateway integration (Stripe, PayPal)
- Webhook signature verification
- Secure handling of payment data

## VI. Frontend Performance Optimization

### 1. Code Optimization
- Code splitting and lazy loading
- Bundle size optimization with webpack
- Tree shaking for unused code
- Dynamic imports for heavy components

### 2. Asset Optimization
- Image optimization and lazy loading
- WebP format support with fallbacks
- Font optimization and subsetting
- SVG optimization

### 3. Caching Strategies
- Service Workers for offline support
- Browser caching headers
- CDN for static assets
- API response caching with React Query

### 4. Rendering Optimization
- React.memo for component memoization
- useMemo and useCallback hooks
- Virtual scrolling for long lists
- Debouncing for search inputs

## VII. Frontend Testing Strategy

### 1. Unit Testing
- Jest + React Testing Library
- Component testing
- Hook testing
- Utility function testing

### 2. Integration Testing
- API integration testing
- Component integration
- User flow testing

### 3. E2E Testing
- Cypress for end-to-end testing
- Critical user journey testing
- Cross-browser testing

### 4. Performance Testing
- Lighthouse CI integration
- Bundle analysis
- Load testing
- Core Web Vitals monitoring