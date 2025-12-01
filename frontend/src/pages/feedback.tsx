import '@/styles/feedback.css';
import { useState, useEffect } from 'react'; // Import hooks
import { useNavigate, useLocation } from 'react-router';

export const FeedBackPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 1. STATE USER ĐỂ RENDER MENU CHUẨN
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Nếu chưa đăng nhập mà cố vào đây -> Đá về Login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    setUser(null);
    alert('Đăng xuất thành công!');
    navigate('/');
  };

  // 2. LẤY DỮ LIỆU ĐƯỢC TRUYỀN QUA TỪ TRANG TRƯỚC
  // Nếu truy cập trực tiếp link (không qua nút bấm) thì dùng data mặc định
  const sessionData = location.state?.sessionInfo || {
    title: 'Môn học mẫu',
    tutorName: 'Tutor mẫu',
    time: '01/01/2025',
    location: 'Online',
    role: user?.role || 'STUDENT', // Mặc định lấy theo user hiện tại nếu không có data
  };

  const isTutor = sessionData.role === 'TUTOR';

  // State quản lý trạng thái đã gửi hay chưa
  const [isSubmitted, setIsSubmitted] = useState(false);

  // State lưu đánh giá (Student)
  const [ratings, setRatings] = useState({
    quality: 0,
    preparation: 0,
    communication: 0,
    usefulness: 0,
    interaction: 0,
  });

  // State lưu comment (Chung cho cả 2)
  const [comments, setComments] = useState({
    strength: '',
    improvement: '',
    // Thêm các trường cho Tutor
    issues: '',
    suggestion: '',
  });

  // Hàm chọn sao
  const handleRating = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  // Hàm xử lý khi bấm nút "Gửi đánh giá"
  const handleSubmit = () => {
    // Validate sơ bộ nếu là Student
    if (!isTutor && Object.values(ratings).some((r) => r === 0)) {
      alert('Vui lòng đánh giá đầy đủ số sao!');
      return;
    }

    // Không gọi API backend thật, chỉ chuyển trạng thái UI
    setIsSubmitted(true);
    // Cuộn lên đầu trang để user thấy thông báo
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Component render sao
  const StarRating = ({ category, value }: { category: string; value: number }) => (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className="material-icons star"
          style={{
            color: star <= value ? '#ffc107' : '#e0e0e0',
            cursor: 'pointer',
          }}
          onClick={() => handleRating(category, star)}
        >
          {star <= value ? 'star' : 'star_border'}
        </i>
      ))}
    </div>
  );

  // Render Header (Tách ra để dùng lại cho gọn code)
  const renderHeader = () => (
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

        {/* Menu cho STUDENT */}
        {user && user.role === 'STUDENT' && (
          <>
            <button className="nav-item" onClick={() => navigate('/findTutor')}>
              Tìm tutor
            </button>
            <button className="nav-item" onClick={() => navigate('/myCourse')}>
              Lịch học
            </button>
          </>
        )}

        {/* Menu cho TUTOR */}
        {user && user.role === 'TUTOR' && (
          <>
            <button className="nav-item" onClick={() => navigate('/tutor')}>
              Lịch của tôi
            </button>
            <button className="nav-item" onClick={() => navigate('/tutorCourse')}>
              Quản lý buổi học
            </button>
          </>
        )}

        {/* Menu CHUNG (Tài khoản, Logout) */}
        {user && (
          <>
            <button className="nav-item" onClick={() => navigate('/profile')}>
              Tài khoản
            </button>
            <button className="nav-item logout-btn" onClick={handleLogout}>
              Đăng xuất
            </button>
          </>
        )}

        {/* Menu KHÁCH (Chưa đăng nhập) */}
        {!user && (
          <>
            <button className="nav-item" onClick={() => navigate('/login')}>
              Đăng nhập
            </button>
          </>
        )}
      </nav>
    </header>
  );

  // MÀN HÌNH CẢM ƠN SAU KHI GỬI
  if (isSubmitted) {
    return (
      <div className="poster-container">
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
        <div className="background-shape shape-3"></div>

        <div className="content">
          {renderHeader()}

          <div className="thank-you-message" style={{ display: 'block', textAlign: 'center', marginTop: '80px' }}>
            <div className="thank-you-icon" style={{ fontSize: '60px', color: '#2e7d32', marginBottom: '20px' }}>
              <i className="material-icons" style={{ fontSize: '80px' }}>
                check_circle
              </i>
            </div>
            <h2 className="thank-you-title" style={{ color: '#2e7d32', fontSize: '28px' }}>
              {isTutor ? 'Đã lưu phản hồi của bạn!' : 'Cảm ơn bạn đã đánh giá!'}
            </h2>
            <p className="thank-you-text" style={{ fontSize: '18px', color: '#555', margin: '20px 0' }}>
              Thông tin về buổi học <strong>{sessionData.title}</strong> đã được cập nhật vào hệ thống.
            </p>
            <button
              className="form-button primary-button"
              onClick={() => navigate(isTutor ? '/tutorCourse' : '/myCourse')} // Quay lại trang tương ứng
              style={{ padding: '12px 30px', fontSize: '16px' }}
            >
              {isTutor ? 'Về quản lý buổi học' : 'Về trang Lịch học'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="poster-container">
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
        <div className="background-shape shape-3"></div>

        <div className="content">
          {/* */}
          {renderHeader()}

          {/* */}
          <h1 className="page-title">{isTutor ? 'Phản hồi / Ghi chú Buổi học' : 'Đánh giá Buổi học'}</h1>

          {/* */}
          <div className="session-info-card">
            <div className="session-icon">
              <i className="material-icons">event</i>
            </div>
            <div className="session-details">
              <h2 className="session-title">{sessionData.title}</h2>
              <div className="session-meta">
                <div className="session-meta-item">
                  <i className="material-icons">person</i>
                  <span>{sessionData.tutorName}</span>
                </div>
                <div className="session-meta-item">
                  <i className="material-icons">schedule</i>
                  <span>{sessionData.time}</span>
                </div>
                <div className="session-meta-item">
                  <i className="material-icons">location_on</i>
                  <span>{sessionData.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* */}
          <div className="feedback-form" id="feedbackForm">
            {isTutor ? (
              // --- FORM DÀNH CHO TUTOR ---
              <div className="form-section">
                <h3 className="section-title">
                  <i className="material-icons">note_add</i>
                  Tự đánh giá & Ghi chú
                </h3>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: 10, fontWeight: 500 }}>
                    Vấn đề gặp phải (nếu có)
                  </label>
                  <textarea
                    className="text-area"
                    placeholder="Ví dụ: Thiết bị trục trặc, sinh viên vắng nhiều, nội dung bài giảng quá dài..."
                    value={comments.issues}
                    onChange={(e) => setComments({ ...comments, issues: e.target.value })}
                  ></textarea>
                </div>
                <div className="form-group" style={{ marginTop: 20 }}>
                  <label style={{ display: 'block', marginBottom: 10, fontWeight: 500 }}>
                    Đề xuất cải thiện cho lần sau
                  </label>
                  <textarea
                    className="text-area"
                    placeholder="Cần chuẩn bị thêm bài tập, thay đổi phương pháp..."
                    value={comments.suggestion}
                    onChange={(e) => setComments({ ...comments, suggestion: e.target.value })}
                  ></textarea>
                </div>
              </div>
            ) : (
              // --- FORM DÀNH CHO STUDENT ---
              <>
                <div className="form-section">
                  <h3 className="section-title">
                    <i className="material-icons">star</i>
                    Đánh giá chất lượng buổi học
                  </h3>

                  <div className="rating-item">
                    <div className="rating-label">Chất lượng giảng dạy</div>
                    <StarRating category="quality" value={ratings.quality} />
                  </div>
                  <div className="rating-item">
                    <div className="rating-label">Sự chuẩn bị của tutor</div>
                    <StarRating category="preparation" value={ratings.preparation} />
                  </div>
                  <div className="rating-item">
                    <div className="rating-label">Khả năng truyền đạt kiến thức</div>
                    <StarRating category="communication" value={ratings.communication} />
                  </div>
                  <div className="rating-item">
                    <div className="rating-label">Tính hữu ích của buổi học</div>
                    <StarRating category="usefulness" value={ratings.usefulness} />
                  </div>
                  <div className="rating-item">
                    <div className="rating-label">Sự tương tác và hỗ trợ</div>
                    <StarRating category="interaction" value={ratings.interaction} />
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">
                    <i className="material-icons">comment</i>
                    Nhận xét chi tiết
                  </h3>
                  <div className="form-group">
                    <label style={{ display: 'block', marginBottom: 10, fontWeight: 500 }}>
                      Điểm mạnh của buổi học
                    </label>
                    <textarea
                      className="text-area"
                      placeholder="Hãy chia sẻ những điểm bạn thấy tốt nhất..."
                      value={comments.strength}
                      onChange={(e) => setComments({ ...comments, strength: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="form-group" style={{ marginTop: 20 }}>
                    <label style={{ display: 'block', marginBottom: 10, fontWeight: 500 }}>Điểm cần cải thiện</label>
                    <textarea
                      className="text-area"
                      placeholder="Góp ý của bạn sẽ giúp chúng tôi cải thiện..."
                      value={comments.improvement}
                      onChange={(e) => setComments({ ...comments, improvement: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </>
            )}

            <div className="form-actions">
              <button className="form-button secondary-button" onClick={() => navigate(-1)}>
                Hủy bỏ
              </button>
              <button className="form-button primary-button" onClick={handleSubmit}>
                {isTutor ? 'Lưu ghi chú' : 'Gửi đánh giá'}
              </button>
            </div>
          </div>

          {/* */}
          <footer className="footer">
            <p>© 2025 Tutor Support System. Đã đăng ký bản quyền.</p>
            <p>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH - TRƯƠNG ĐẠI HỌC BÁCH KHOA</p>
          </footer>
        </div>
      </div>
    </>
  );
};
