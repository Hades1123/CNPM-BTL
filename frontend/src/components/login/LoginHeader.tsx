import { useNavigate } from 'react-router';

const STATS = [
  { icon: 'people', text: '500+ Tutors' },
  { icon: 'school', text: '10,000+ Sinh viên' },
  { icon: 'event', text: '1,000+ Buổi học/tuần' },
];

export const LoginHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="login-header">
      <button className="login-logo flex-center gap-15" onClick={() => navigate('/')}>
        <img src="https://sfile.chatglm.cn/images-ppt/47f595050ee8.svg" alt="HCMUT Logo" className="logo-image" />
        <div className="logo-text">Tutor Support System</div>
      </button>

      <p className="subtitle">
        Hệ thống hỗ trợ và quản lý chương trình Tutor/Mentor tại Trường Đại học Bách Khoa TP.HCM
      </p>

      <div className="header-stats flex-center gap-20">
        {STATS.map((stat) => (
          <div key={stat.icon} style={{ display: 'flex', gap: 5 }}>
            <i className="material-icons">{stat.icon}</i>
            <span>{stat.text}</span>
          </div>
        ))}
      </div>
    </header>
  );
};
