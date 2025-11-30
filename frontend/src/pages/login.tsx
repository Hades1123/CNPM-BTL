import '@/styles/login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { authApi } from '@/service/auth';
import { LoginHeader, FormInput } from '@/components/login';

// Types
interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  mssv: string;
  role: 'STUDENT' | 'TUTOR';
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  username: '',
  mssv: '',
  role: 'STUDENT',
};

// Validation
const validateForm = (form: FormState, isLogin: boolean): FormErrors => {
  const errors: FormErrors = {};
  const emailRegex = /^[^\s@]+@hcmut\.edu\.vn$/;

  if (!form.username.trim()) errors.username = 'Vui lòng nhập tên đăng nhập';
  if (!form.password) errors.password = 'Vui lòng nhập mật khẩu';
  else if (form.password.length < 4) errors.password = 'Mật khẩu phải có ít nhất 4 ký tự';

  if (!isLogin) {
    if (!form.name.trim()) errors.name = 'Vui lòng nhập họ và tên';
    if (!form.email.trim()) errors.email = 'Vui lòng nhập email';
    else if (!emailRegex.test(form.email)) errors.email = 'Email phải có định dạng @hcmut.edu.vn';
    if (!form.mssv.trim()) errors.mssv = 'Vui lòng nhập MSSV';
    if (!form.confirmPassword) errors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    else if (form.password !== form.confirmPassword) errors.confirmPassword = 'Mật khẩu xác nhận không khớp';
  }

  return errors;
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      const user = JSON.parse(userStr);
      navigate(user.role === 'TUTOR' ? '/tutor' : '/findTutor');
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm(form, isLogin);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isLogin) {
        const data = await authApi.login({ username: form.username, password: form.password });
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate(data.user.role === 'TUTOR' ? '/tutor' : '/findTutor');
      } else {
        await authApi.register({
          username: form.username,
          email: form.email,
          password: form.password,
          mssv: String(form.mssv),
          name: form.name,
          role: form.role,
          faculty: 'Bách Khoa',
        });
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        setIsLogin(true);
        setForm((prev) => ({ ...prev, password: '', confirmPassword: '' }));
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Lỗi kết nối server';
      alert(isLogin ? `Đăng nhập thất bại: ${message}` : `Lỗi: ${message}`);
    }
  };

  const toggleMode = (login: boolean) => {
    setIsLogin(login);
    setErrors({});
  };

  return (
    <div className="login-poster-container">
      <div className="login-content">
        <div className="header-content">
          <LoginHeader />

          <div className="login-container">
            <h2 className="login-title">{isLogin ? 'Đăng nhập' : 'Đăng ký tài khoản'}</h2>

            <form>
              {/* Register-only fields */}
              {!isLogin && (
                <>
                  <FormInput
                    label="Họ và tên"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    icon="badge"
                    placeholder="Nguyễn Văn A"
                    error={errors.name}
                  />
                  <FormInput
                    label="MSSV"
                    name="mssv"
                    type="number"
                    value={form.mssv}
                    onChange={handleChange}
                    icon="numbers"
                    placeholder="Nhập mã số sinh viên"
                    error={errors.mssv}
                  />
                  <FormInput
                    label="Email trường (HCMUT)"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    icon="email"
                    placeholder="email@hcmut.edu.vn"
                    error={errors.email}
                  />
                </>
              )}

              {/* Common fields */}
              <FormInput
                label="Tên đăng nhập"
                name="username"
                value={form.username}
                onChange={handleChange}
                icon="person"
                placeholder="Nhập username"
                error={errors.username}
              />
              <FormInput
                label="Mật khẩu"
                name="password"
                value={form.password}
                onChange={handleChange}
                icon="lock"
                placeholder="Nhập mật khẩu"
                error={errors.password}
                showToggle
                isVisible={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
              />

              {/* Confirm password for register */}
              {!isLogin && (
                <>
                  <FormInput
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    icon="lock"
                    placeholder="Nhập lại mật khẩu"
                    error={errors.confirmPassword}
                    showToggle
                    isVisible={showConfirmPassword}
                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  />

                  {/* Role selection */}
                  <div className="form-group">
                    <label className="form-label">Bạn đăng ký với vai trò?</label>
                    <div className="flex-center gap-10" style={{ marginTop: 5 }}>
                      {(['STUDENT', 'TUTOR'] as const).map((role) => (
                        <label key={role} className="flex-center gap-5" style={{ cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="role"
                            value={role}
                            checked={form.role === role}
                            onChange={handleChange}
                          />
                          {role === 'STUDENT' ? 'Sinh viên' : 'Tutor'}
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <button type="button" className="login-button flex-center-justify gap-10" onClick={handleSubmit}>
                <i className="material-icons">{isLogin ? 'login' : 'person_add'}</i>
                {isLogin ? 'Đăng nhập' : 'Đăng ký ngay'}
              </button>
            </form>

            {/* Toggle login/register */}
            <div style={{ textAlign: 'center', marginTop: 15, fontSize: 14 }}>
              {isLogin ? (
                <span>
                  Chưa có tài khoản?{' '}
                  <a
                    href="#"
                    style={{ color: '#0056b3', fontWeight: 'bold' }}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleMode(false);
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
                      toggleMode(true);
                    }}
                  >
                    Đăng nhập
                  </a>
                </span>
              )}
            </div>

            {/* SSO Login */}
            {isLogin && (
              <>
                <div className="divider flex-center">
                  <div className="divider-line"></div>
                  <div className="divider-text">HOẶC</div>
                  <div className="divider-line"></div>
                </div>
                <div className="sso-login flex-center-justify gap-10">
                  <div className="sso-icon flex-center-justify">
                    <i className="material-icons">school</i>
                  </div>
                  <a href="https://lms.hcmut.edu.vn/login/index.php" style={{ textDecoration: 'none' }}>
                    <div className="sso-text">Đăng nhập với HCMUT_SSO</div>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
