import '@/styles/myCourse.css';
import { useNavigate } from 'react-router';

export const MyCourse = () => {
  const navigate = useNavigate();

  return (
    <div className="poster-container">
      {/* <!-- Background Shapes --> */}
      <div className="background-shape shape-1"></div>
      <div className="background-shape shape-2"></div>
      <div className="background-shape shape-3"></div>

      <div className="content">
        {/* <!-- Header --> */}
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
            <button
              className="nav-item logout-btn"
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
                alert('Đăng xuất thành công!');
                navigate('/');
              }}
            >
              Đăng xuất
            </button>
          </nav>
        </header>

        {/* <!-- Page Title --> */}
        <h1 className="page-title">Lịch học của tôi</h1>

        {/* <!-- Calendar Section */}
        {/* <section className="calendar-section">
                <div className="calendar-header">
                    <h2 className="calendar-title">Tháng 10, 2025</h2>
                    <div className="calendar-controls">
                        <button className="calendar-button active">Tuần</button>
                        <button className="calendar-button">Tháng</button>
                        <div className="calendar-nav">
                            <button className="calendar-nav-button">
                                <i className="material-icons">chevron_left</i>
                            </button>
                            <button className="calendar-nav-button">
                                <i className="material-icons">chevron_right</i>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="calendar-grid">
                    <div className="calendar-day-header">CN</div>
                    <div className="calendar-day-header">T2</div>
                    <div className="calendar-day-header">T3</div>
                    <div className="calendar-day-header">T4</div>
                    <div className="calendar-day-header">T5</div>
                    <div className="calendar-day-header">T6</div>
                    <div className="calendar-day-header">T7</div>

                    <div className="calendar-day">29</div>
                    <div className="calendar-day">30</div>
                    <div className="calendar-day">1</div>
                    <div className="calendar-day">2</div>
                    <div className="calendar-day">3</div>
                    <div className="calendar-day">4</div>
                    <div className="calendar-day">5</div>

                    <div className="calendar-day">6</div>
                    <div className="calendar-day">7</div>
                    <div className="calendar-day">8</div>
                    <div className="calendar-day">9</div>
                    <div className="calendar-day">10</div>
                    <div className="calendar-day">11</div>
                    <div className="calendar-day">12</div>

                    <div className="calendar-day">13</div>
                    <div className="calendar-day">14</div>
                    <div className="calendar-day">15</div>
                    <div className="calendar-day">16</div>
                    <div className="calendar-day">17</div>
                    <div className="calendar-day">18</div>
                    <div className="calendar-day">19</div>

                    <div className="calendar-day">20</div>
                    <div className="calendar-day">21</div>
                    <div className="calendar-day">22</div>
                    <div className="calendar-day completed-session">23</div>
                    <div className="calendar-day has-session">24</div>
                    <div className="calendar-day today">25</div>
                    <div className="calendar-day">26</div>

                    <div className="calendar-day">27</div>
                    <div className="calendar-day">28</div>
                    <div className="calendar-day">29</div>
                    <div className="calendar-day">30</div>
                    <div className="calendar-day">31</div>
                    <div className="calendar-day">1</div>
                    <div className="calendar-day">2</div>
                </div>

                <div style={{display: 'flex', gap: 20, marginTop: 20, fontSize: 14}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
                        <div 
                        style={{
                            width: 15,
                            height: 15,
                            backgroundColor: '#0056b3',
                            borderRadius: 3
                        }}></div>
                        <span>Sắp diễn ra</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 5}}>
                        <div 
                            style={{
                                width: 15,
                                height: 15,
                                backgroundColor: '#4caf50',
                                borderRadius: 3
                            }}
                        ></div>
                        <span>Đã hoàn thành</span>
                    </div>
                </div>
            </section> --> */}

        {/* <!-- Notifications Section --> */}
        <section className="notification-section">
          <h2 className="section-title">Thông báo</h2>

          <div className="notification-item">
            <div className="notification-icon">
              <i className="material-icons">event</i>
            </div>
            <div className="notification-content">
              <div className="notification-title">Buổi học sắp diễn ra</div>
              <div className="notification-text">Toán cao cấp với Nguyễn Văn An vào ngày mai, 14:00-16:00</div>
            </div>
            <div className="notification-time">2 giờ trước</div>
          </div>

          <div className="notification-item">
            <div className="notification-icon">
              <i className="material-icons">description</i>
            </div>
            <div className="notification-content">
              <div className="notification-title">Tài liệu mới</div>
              <div className="notification-text">Trần Thị Bình đã tải lên tài liệu cho buổi học Lập trình cơ bản</div>
            </div>
            <div className="notification-time">1 ngày trước</div>
          </div>
        </section>

        {/* <!-- Sessions List Section --> */}
        <section className="sessions-section">
          <div className="section-header">
            <h2 className="section-title">Các buổi học của bạn</h2>
            <div className="filter-tabs">
              <div className="filter-tab active">Tất cả</div>
              <div className="filter-tab">Sắp diễn ra</div>
              <div className="filter-tab">Đã hoàn thành</div>
            </div>
          </div>

          {/* <!-- Session Card 1 - Upcoming --> */}
          <div className="session-card">
            <div className="session-header">
              <h3 className="session-title">Toán cao cấp</h3>
              <div className="session-status status-upcoming">Sắp diễn ra</div>
            </div>

            <div className="session-info">
              <div className="session-info-item">
                <i className="material-icons">person</i>
                <span>Nguyễn Văn An</span>
              </div>
              <div className="session-info-item">
                <i className="material-icons">event</i>
                <span>Ngày mai, 26/10/2025</span>
              </div>
              <div className="session-info-item">
                <i className="material-icons">schedule</i>
                <span>14:00 - 16:00</span>
              </div>
              <div className="session-info-item">
                <i className="material-icons">location_on</i>
                <span>Phòng A301</span>
              </div>
            </div>

            <div className="session-description">
              Buổi học tập trung vào phương pháp giải tích hàm nhiều biến, đặc biệt là phần đạo hàm riêng và tích phân
              kép.
            </div>

            <div className="session-materials">
              <div className="materials-title">Tài liệu buổi học:</div>
              <div className="materials-list">
                <div className="material-item">
                  <i className="material-icons">download</i>
                  <span>Bài giảng Hàm nhiều biến.pdf</span>
                </div>
                <div className="material-item">
                  <i className="material-icons">download</i>
                  <span>Bài tập Đạo hàm riêng.pdf</span>
                </div>
              </div>
            </div>

            <div className="session-actions">
              <button className="session-button join-button">
                <i className="material-icons">video_call</i>
                Tham gia buổi học
              </button>
              <button className="session-button download-button">
                <i className="material-icons">download</i>
                Tải tài liệu
              </button>
              <button className="session-button cancel-button">
                <i className="material-icons">cancel</i>
                Hủy đăng ký
              </button>
            </div>
          </div>

          {/* <!-- Session Card 2 - Completed --> */}
          <div className="session-card">
            <div className="session-header">
              <h3 className="session-title">Lập trình cơ bản</h3>
              <div className="session-status status-completed">Đã hoàn thành</div>
            </div>

            <div className="session-info">
              <div className="session-info-item">
                <i className="material-icons">person</i>
                <span>Trần Thị Bình</span>
              </div>
              <div className="session-info-item">
                <i className="material-icons">event</i>
                <span>23/10/2025</span>
              </div>
              <div className="session-info-item">
                <i className="material-icons">schedule</i>
                <span>10:00 - 12:00</span>
              </div>
              <div className="session-info-item">
                <i className="material-icons">location_on</i>
                <span>Phòng B205</span>
              </div>
            </div>

            <div className="session-description">
              Buổi học về mảng và con trỏ trong ngôn ngữ C++. Thực hành các bài tập cơ bản về quản lý bộ nhớ động.
            </div>

            <div className="session-materials">
              <div className="materials-title">Tài liệu buổi học:</div>
              <div className="materials-list">
                <div className="material-item">
                  <i className="material-icons">download</i>
                  <span>Bài giảng Mảng và Con trỏ.pdf</span>
                </div>
                <div className="material-item">
                  <i className="material-icons">download</i>
                  <span>Mã nguồn ví dụ.cpp</span>
                </div>
              </div>
            </div>

            <div className="session-actions">
              <button className="session-button download-button">
                <i className="material-icons">download</i>
                Tải tài liệu
              </button>
              <button className="session-button rate-button" onClick={() => navigate('/feedback')}>
                <i className="material-icons">star</i>
                Đánh giá buổi học
              </button>
            </div>
          </div>

          {/* <!-- Session Card 3 - Upcoming --> */}
          <div className="session-card">
            <div className="session-header">
              <h3 className="session-title">Cấu trúc dữ liệu</h3>
              <div className="session-status status-upcoming">Sắp diễn ra</div>
            </div>

            <div className="session-info">
              <div className="session-info-item">
                <i className="material-icons">person</i>
                <span>Lê Văn Cường</span>
              </div>
              <div className="session-info-item">
                <i className="material-icons">event</i>
                <span>28/10/2025</span>
              </div>
              <div className="session-info-item">
                <i className="material-icons">schedule</i>
                <span>9:00 - 11:00</span>
              </div>
              <div className="session-info-item">
                <i className="material-icons">location_on</i>
                <span>Phòng C102</span>
              </div>
            </div>

            <div className="session-description">
              Buổi học về cây nhị phân và các thuật toán duyệt cây. Thực hành xây dựng cây nhị phân tìm kiếm.
            </div>

            <div className="session-materials">
              <div className="materials-title">Tài liệu buổi học:</div>
              <div className="materials-list">
                <div className="material-item">
                  <i className="material-icons">download</i>
                  <span>Bài giảng Cây nhị phân.pdf</span>
                </div>
              </div>
            </div>

            <div className="session-actions">
              <button className="session-button download-button">
                <i className="material-icons">download</i>
                Tải tài liệu
              </button>
              <button className="session-button cancel-button">
                <i className="material-icons">cancel</i>
                Hủy đăng ký
              </button>
            </div>
          </div>
        </section>

        {/* <!-- Footer --> */}
        <footer className="footer">
          <p>© 2025 Tutor Support System. Đã đăng ký bản quyền.</p>
          <p>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH - TRƯƠNG ĐẠI HỌC BÁCH KHOA</p>
        </footer>
      </div>
    </div>
  );
};
