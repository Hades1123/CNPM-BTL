import { useNavigate } from 'react-router';

export const PageHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    alert('Đăng xuất thành công!');
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon">
          <i className="material-icons">school</i>
        </div>
        <div className="logo-text">Tutor Support System</div>
      </div>
      <nav className="nav-menu">
        <button className="nav-item" onClick={() => navigate('/')}>
          Trang chủ
        </button>
        <button className="nav-item" onClick={() => navigate('/findTutor')}>
          Tìm tutor
        </button>
        <button className="nav-item" onClick={() => navigate('/myCourse')}>
          Lịch học
        </button>
        <button className="nav-item" onClick={() => navigate('/profile')}>
          Tài khoản
        </button>
        <button className="nav-item logout-btn" onClick={handleLogout}>
          Đăng xuất
        </button>
      </nav>
    </header>
  );
};
