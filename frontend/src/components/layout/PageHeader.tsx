import { useNavigate } from 'react-router';

interface PageHeaderProps {
  userRole?: 'STUDENT' | 'TUTOR' | 'ADMIN';
}

export const PageHeader = ({ userRole = 'STUDENT' }: PageHeaderProps) => {
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
        <button
          className="nav-item"
          onClick={() => (userRole === 'STUDENT' ? navigate('/findTutor') : navigate('/tutor'))}
        >
          {userRole === 'STUDENT' ? 'Tìm tutor' : 'Lịch của tôi'}
        </button>
        <button
          className="nav-item"
          onClick={() => (userRole === 'STUDENT' ? navigate('/myCourse') : navigate('/tutorCourse'))}
        >
          {userRole === 'STUDENT' ? 'Lịch học' : 'Quản lý buổi học'}
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
