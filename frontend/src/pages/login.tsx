import '@/styles/login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

export const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem đã có token chưa
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');

    if (token && userStr) {
      // Nếu đã đăng nhập, tự động chuyển hướng dựa vào Role
      const user = JSON.parse(userStr);
      if (user.role === 'TUTOR') {
        navigate('/tutor');
      } else {
        navigate('/findTutor');
      }
    }
  }, [navigate]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    mssv: '',
    role: 'STUDENT',
  });
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    const emailRegex = /^[^\s@]+@hcmut\.edu\.vn$/; // Regex check email HCMUT (tùy chọn)

    // Validate chung
    if (!form.username.trim()) newErrors.username = 'Vui lòng nhập tên đăng nhập';
    if (!form.password) newErrors.password = 'Vui lòng nhập mật khẩu';
    else if (form.password.length < 4) newErrors.password = 'Mật khẩu phải có ít nhất 4 ký tự';

    // Validate riêng cho Register
    if (!isLogin) {
      if (!form.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên';

      if (!form.email.trim()) newErrors.email = 'Vui lòng nhập email';
      else if (!emailRegex.test(form.email)) newErrors.email = 'Email phải có định dạng @hcmut.edu.vn';

      if (!form.mssv.trim()) newErrors.mssv = 'Vui lòng nhập MSSV';

      if (!form.confirmPassword) newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
      else if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    try {
      const loginPayload = {
        username: form.username,
        password: form.password,
      };
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload),
      });

      const data = await res.json();
      if (res.ok) {
        // Lưu token và thông tin user vào localStorage
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Chuyển hướng dựa vào Role (nếu cần)
        if (data.user.role === 'STUDENT') navigate('/findTutor');
        else if (data.user.role === 'TUTOR') navigate('/tutor');
      } else {
        alert('Đăng nhập thất bại: ' + data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi kết nối server');
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    if (form.password !== form.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    try {
      const registerPayload = {
        username: form.username,
        email: form.email,
        password: form.password,
        mssv: String(form.mssv),
        name: form.name,
        role: form.role,
        faculty: 'Bách Khoa',
      };

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerPayload),
      });

      if (res.ok) {
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        setIsLogin(true); // Chuyển về tab Login
        setForm((prev) => ({ ...prev, password: '' }));
      } else {
        const data = await res.json();
        alert('Lỗi: ' + (data.message || 'Đăng ký thất bại'));
      }
    } catch (error) {
      console.error(error);
      alert('Lỗi kết nối server');
    }
  };

  const handleSubmit = () => {
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
    <div className="login-poster-container">
      <div className="login-content">
        {/* <!-- Header --> */}
        <div className="header-content">
          <header className="login-header">
            <button className="login-logo" onClick={() => navigate('/')}>
              <img src="https://sfile.chatglm.cn/images-ppt/47f595050ee8.svg" alt="HCMUT Logo" className="logo-image" />
              <div className="logo-text">Tutor Support System</div>
            </button>
            <p className="subtitle">
              Hệ thống hỗ trợ và quản lý chương trình Tutor/Mentor tại Trường Đại học Bách Khoa TP.HCM
            </p>

            {/* <!-- Stats --> */}
            <div className="header-stats">
              <div className="stat-item">
                <i className="material-icons">people</i>
                <span>500+ Tutors</span>
              </div>
              <div className="stat-item">
                <i className="material-icons">school</i>
                <span>10,000+ Sinh viên</span>
              </div>
              <div className="stat-item">
                <i className="material-icons">event</i>
                <span>1,000+ Buổi học/tuần</span>
              </div>
            </div>

            {/* <!-- Actions --> */}
            <div className="header-actions">
              <div className="contact-info">
                <i className="material-icons" style={{ fontSize: 16 }}>
                  phone
                </i>
                <span>Hotline: (028) 3864 7256</span>
              </div>
              <div className="lang-switch">
                <i className="material-icons" style={{ fontSize: 16 }}>
                  language
                </i>
                <span>Tiếng Việt</span>
              </div>
            </div>
          </header>

          {/* <!-- Login Form --> */}
          <div className="login-container">
            <h2 className="login-title">{isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}</h2>

            <form>
              {!isLogin && (
                <>
                  <div className="form-group">
                    <label className="form-label">Họ và tên</label>
                    <div className={`input-icon ${errors.name ? 'error-border' : ''}`}>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Nguyễn Văn A"
                      />
                      <i className="material-icons">badge</i>
                    </div>
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">MSSV</label>
                    <div className={`input-icon ${errors.mssv ? 'error-border' : ''}`}>
                      <input
                        type="number" // Đổi thành text để tránh lỗi scroll chuột ra số khác
                        name="mssv"
                        value={form.mssv}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Nhập mã số sinh viên"
                      />
                      <i className="material-icons">numbers</i>
                    </div>
                    {errors.mssv && <span className="error-text">{errors.mssv}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email trường (HCMUT)</label>
                    <div className={`input-icon ${errors.email ? 'error-border' : ''}`}>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="email@hcmut.edu.vn"
                      />
                      <i className="material-icons">email</i>
                    </div>
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                </>
              )}

              <div className="form-group">
                <label className="form-label">Tên đăng nhập</label>
                <div className={`input-icon ${errors.username ? 'error-border' : ''}`}>
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Nhập username"
                  />
                  <i className="material-icons">person</i>
                </div>
                {errors.username && <span className="error-text">{errors.username}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Mật khẩu</label>
                <div className={`input-icon ${errors.password ? 'error-border' : ''}`}>
                  <input
                    type={showPassword ? 'text' : 'password'} // Toggle type
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Nhập mật khẩu"
                  />
                  {/* Icon mắt Clickable */}
                  <i className="material-icons clickable-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </i>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Xác nhận mật khẩu</label>
                  <div className={`input-icon ${errors.confirmPassword ? 'error-border' : ''}`}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Nhập lại mật khẩu"
                    />
                    <i
                      className="material-icons clickable-icon"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? 'visibility' : 'visibility_off'}
                    </i>
                  </div>
                  {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                </div>
              )}

              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Bạn đăng ký với vai trò?</label>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="role"
                        value="STUDENT"
                        checked={form.role === 'STUDENT'} // Kiểm soát checked
                        onChange={handleChange}
                      />{' '}
                      Sinh viên
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="role"
                        value="TUTOR"
                        checked={form.role === 'TUTOR'}
                        onChange={handleChange}
                      />{' '}
                      Tutor
                    </label>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="remember-forgot">
                  <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                  </div>
                  <a href="#" className="forgot-password">
                    Quên mật khẩu?
                  </a>
                </div>
              )}

              <button type="button" className="login-button" onClick={handleSubmit}>
                <i className="material-icons">{isLogin ? 'login' : 'person_add'}</i>
                {isLogin ? 'Đăng nhập' : 'Đăng ký ngay'}
              </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '14px' }}>
              {isLogin ? (
                <span>
                  Chưa có tài khoản?{' '}
                  <a
                    href="#"
                    style={{ color: '#0056b3', fontWeight: 'bold' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLogin(false);
                      setErrors({}); // Xóa lỗi khi chuyển tab
                    }}
                  >
                    Đăng ký ngay
                  </a>
                </span>
              ) : (
                <span>
                  Đã có tài khoản?{' '}
                  <a
                    href="#"
                    style={{ color: '#0056b3', fontWeight: 'bold' }}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsLogin(true);
                      setErrors({}); // Xóa lỗi khi chuyển tab
                    }}
                  >
                    Đăng nhập
                  </a>
                </span>
              )}
            </div>

            {/* Phần SSO chỉ hiện khi Login cho đỡ rối */}
            {isLogin && (
              <>
                <div className="divider">
                  <div className="divider-line"></div>
                  <div className="divider-text">HOẶC</div>
                  <div className="divider-line"></div>
                </div>

                <div className="sso-login">
                  <div className="sso-icon">
                    <i className="material-icons">school</i>
                  </div>
                  <div className="sso-text">Đăng nhập với HCMUT_SSO</div>
                </div>
              </>
            )}

            <div className="help-links">
              <a href="#" className="help-link">
                Trợ giúp
              </a>
              <a href="#" className="help-link">
                Hướng dẫn sử dụng
              </a>
              <a href="#" className="help-link">
                Liên hệ hỗ trợ
              </a>
            </div>

            <div className="security-info">
              <i className="material-icons">security</i>
              <div className="security-text">
                Hệ thống sử dụng HCMUT_SSO để xác thực người dùng. Mọi thông tin đăng nhập được mã hóa và bảo mật theo
                tiêu chuẩn của trường.
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Footer --> */}
        <footer className="login-footer">
          <p>© 2025 Tutor Support System. Đã đăng ký bản quyền.</p>
          <p>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH - TRƯƠNG ĐẠI HỌC BÁCH KHOA</p>
        </footer>
      </div>
    </div>
  );
};
