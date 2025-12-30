import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import OtpVerification from './components/OtpVerification';
import WelcomePopup from './components/WelcomePopup';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import ProductDetailPage from './components/ProductDetailPage';
import CategoriesPage from './components/CategoriesPage';
import Cart from './components/Cart';
import NavBar from './components/NavBar';
import Navigation from './components/Navigation';
import BackButton from './components/BackButton';
import OrderManagement from './components/OrderManagement';
import UserProfile from './components/UserProfile';
import BlogPage from './components/BlogPage';
import BlogPostDetail from './components/BlogPostDetail';
import StreamList from './components/StreamList';
import StreamCreator from './components/StreamCreator';
import LiveStreamPage from './components/LiveStreamPage';
import translations from './translations/translations';
import './App.css';

// Layout component with NavBar
const MainLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
};

// Auth layout without NavBar
const AuthLayout = ({ children }) => {
  return <main>{children}</main>;
};

// Create a wrapper component for CreateAccount to handle navigation and props
const CreateAccountWrapper = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  
  const handleBack = () => {
    navigate('/login');
  };
  
  const handleSubmit = (accountData) => {
    // Navigate to OTP verification with email
    navigate('/otp-verification', { state: { email: accountData.email } });
  };
  
  return (
    <CreateAccount
      onBack={handleBack}
      onSubmit={handleSubmit}
      currentLanguage={currentLanguage}
      translations={translations}
    />
  );
};

// Create a wrapper component for OtpVerification to handle navigation and props
const OtpVerificationWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  
  // Get email from location state or use empty string
  const email = location.state?.email || '';
  
  const handleVerify = () => {
    navigate('/welcome');
  };
  
  const handleResend = () => {
    console.log('Resending OTP to:', email);
  };
  
  const handleBack = () => {
    navigate('/create-account');
  };
  
  return (
    <OtpVerification
      email={email}
      onVerify={handleVerify}
      onResend={handleResend}
      onBack={handleBack}
      currentLanguage={currentLanguage}
      translations={translations}
    />
  );
};

// Create a wrapper component for WelcomePopup to handle navigation and props
const WelcomePopupWrapper = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  
  const handleClose = () => {
    navigate('/');
  };
  
  return (
    <WelcomePopup
      onClose={handleClose}
      currentLanguage={currentLanguage}
      translations={translations}
    />
  );
};

// Create a wrapper component for OrderManagement to handle navigation and props
const OrderManagementWrapper = () => {
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  
  return (
    <OrderManagement
      currentLanguage={currentLanguage}
      translations={translations}
    />
  );
};

// Create a wrapper component for UserProfile to handle navigation and props
const UserProfileWrapper = () => {
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  
  return (
    <UserProfile
      currentLanguage={currentLanguage}
      translations={translations}
    />
  );
};

// Create a wrapper component for BlogPage to handle navigation and props
const BlogPageWrapper = () => {
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  
  return (
    <BlogPage
      currentLanguage={currentLanguage}
      translations={translations}
    />
  );
};

// Create a wrapper component for BlogPostDetail to handle navigation and props
const BlogPostDetailWrapper = () => {
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  
  return (
    <BlogPostDetail
      currentLanguage={currentLanguage}
      translations={translations}
    />
  );
};

// Create a wrapper component for StreamList to handle navigation and props
const StreamListWrapper = () => {
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  
  return (
    <StreamList
      currentLanguage={currentLanguage}
      translations={translations}
    />
  );
};

// Create a wrapper component for StreamCreator to handle navigation and props
const StreamCreatorWrapper = () => {
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  
  return (
    <StreamCreator
      currentLanguage={currentLanguage}
      translations={translations}
    />
  );
};

// Create a wrapper component for LiveStreamPage to handle navigation and props
const LiveStreamPageWrapper = () => {
  const [currentLanguage, setCurrentLanguage] = useState('vi');
  
  return (
    <LiveStreamPage
      currentLanguage={currentLanguage}
      translations={translations}
    />
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main routes with NavBar */}
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/products" element={<MainLayout><ProductsPage /></MainLayout>} />
          <Route path="/products/:productId" element={<MainLayout><ProductDetailPage /></MainLayout>} />
          <Route path="/categories" element={<MainLayout><CategoriesPage /></MainLayout>} />
          <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
          <Route path="/orders" element={<MainLayout><OrderManagementWrapper /></MainLayout>} />
          <Route path="/profile" element={<MainLayout><UserProfileWrapper /></MainLayout>} />
          <Route path="/blog" element={<MainLayout><BlogPageWrapper /></MainLayout>} />
          <Route path="/blog/:postId" element={<MainLayout><BlogPostDetailWrapper /></MainLayout>} />
          <Route path="/livestream" element={<MainLayout><StreamListWrapper /></MainLayout>} />
          <Route path="/livestream/:streamId" element={<MainLayout><LiveStreamPageWrapper /></MainLayout>} />
          <Route path="/create-stream" element={<MainLayout><StreamCreatorWrapper /></MainLayout>} />
          
          {/* Auth routes without NavBar */}
          <Route path="/login" element={<AuthLayout><Login /></AuthLayout>} />
          <Route path="/create-account" element={<AuthLayout><CreateAccountWrapper /></AuthLayout>} />
          <Route path="/otp-verification" element={<AuthLayout><OtpVerificationWrapper /></AuthLayout>} />
          <Route path="/welcome" element={<AuthLayout><WelcomePopupWrapper /></AuthLayout>} />
          
          {/* Navigation page for development/testing */}
          <Route path="/nav" element={<Navigation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;