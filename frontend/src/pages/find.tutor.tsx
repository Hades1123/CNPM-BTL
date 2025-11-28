import '@/styles/findTutor.css';
import { useNavigate } from 'react-router';
import { useEffect, useState, useMemo } from 'react';

export const FindTutorPage = () => {
  const navigate = useNavigate();

  // 1. State lưu danh sách Tutor (để hiển thị thẻ)
  const [tutors, setTutors] = useState<any[]>([]);
  // 2. State lưu TOÀN BỘ sessions (để lọc khi bấm vào từng tutor)
  const [allSessions, setAllSessions] = useState<any[]>([]);

  // 3. State cho Modal
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<any>(null); // Tutor đang được chọn
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4. State cho bộ lọc (Filter)
  const [searchText, setSearchText] = useState('');
  const [filterSubject, setFilterSubject] = useState('Tất cả');
  const [filterFaculty, setFilterFaculty] = useState('Tất cả');

  const uniqueSubjects = useMemo(() => {
    const subjects = new Set<string>();
    allSessions.forEach((s) => subjects.add(s.title));
    return Array.from(subjects);
  }, [allSessions]);

  useEffect(() => {
    const fetchTutorsFromSessions = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('access_token');
        const base = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:3000';
        const res = await fetch(`${base}/sessions`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const json = await res.json();
        const sessions = json?.data || [];

        setAllSessions(sessions);

        // --- Xử lý gom nhóm Tutor ---
        const map = new Map<number, any>();

        (sessions || []).forEach((s: any) => {
          const studentCountInSession = s._count?.registrations || 0;

          if (!map.has(s.tutor.id)) {
            map.set(s.tutor.id, {
              ...s.tutor,
              totalStudents: studentCountInSession,
              teachingSubjects: new Set([s.title]), // Lưu các môn ông này dạy
            });
          } else {
            const existingTutor = map.get(s.tutor.id);
            existingTutor.totalStudents += studentCountInSession;
            existingTutor.teachingSubjects.add(s.title); // Thêm môn vào set
            map.set(s.tutor.id, existingTutor);
          }
        });

        // Convert Set -> Array cho dễ dùng sau này
        const tutorsArray = Array.from(map.values()).map((t) => ({
          ...t,
          teachingSubjects: Array.from(t.teachingSubjects),
        }));

        setTutors(tutorsArray);
      } catch (err: any) {
        setError(err?.message || 'Lỗi khi lấy dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchTutorsFromSessions();
  }, []);
  // --- LOGIC LỌC (FILTER) TẠI FE ---
  const filteredTutors = tutors.filter((tutor) => {
    // 1. Lọc theo Search Text (Tên hoặc Email)
    const matchSearch =
      searchText === '' ||
      tutor.name.toLowerCase().includes(searchText.toLowerCase()) ||
      tutor.email.toLowerCase().includes(searchText.toLowerCase());

    // 2. Lọc theo Môn học (Kiểm tra xem tutor có dạy môn đó không)
    const matchSubject = filterSubject === 'Tất cả' || tutor.teachingSubjects.includes(filterSubject);

    // 3. Lọc theo Khoa (Faculty)
    const matchFaculty = filterFaculty === 'Tất cả' || tutor.faculty === filterFaculty;

    return matchSearch && matchSubject && matchFaculty;
  });
  // ---------------------------------

  // --- Xử lý mở Modal ---
  const handleOpenModal = (tutor: any) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTutor(null);
  };

  // --- Lọc các buổi học của Tutor đang chọn ---
  const tutorSessions = selectedTutor ? allSessions.filter((s) => s.tutor?.id === selectedTutor.id) : [];

  // --- Hàm gọi API Đăng ký ---
  const handleRegisterSession = async (sessionId: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn đăng ký buổi học này?')) return;

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('Vui lòng đăng nhập để đăng ký!');
        navigate('/login');
        return;
      }

      const base = (import.meta as any).env?.VITE_API_BASE || 'http://localhost:3000';

      // Gọi API POST /sessions/:id/register
      const res = await fetch(`${base}/sessions/${sessionId}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert('Đăng ký thành công!');
        // Optional: Refresh lại list để cập nhật số lượng slot (nếu cần)
        window.location.reload();
        handleCloseModal();
      } else {
        alert(`Đăng ký thất bại: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi kết nối server');
    }
  };

  return (
    <>
      <div className="poster-container">
        <div className="background-shape shape-1"></div>
        <div className="background-shape shape-2"></div>
        <div className="background-shape shape-3"></div>

        <div className="content">
          {/* ... (Phần Header giữ nguyên) ... */}
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

          <h1 className="page-title">Tìm kiếm và Đăng ký Tutor</h1>

          <section className="search-section">
            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm theo tên, email..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} // Bind State Search
              />
              <button className="search-button">
                <i className="material-icons">search</i>
              </button>
            </div>

            <div className="filter-section">
              <div className="filter-group">
                <label className="filter-label">Môn học</label>
                <select
                  className="filter-select"
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)} // Bind State Subject
                >
                  <option value="Tất cả">Tất cả</option>
                  {/* Render danh sách môn học động từ dữ liệu thật */}
                  {uniqueSubjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Khoa / Chuyên môn</label>
                <select
                  className="filter-select"
                  value={filterFaculty}
                  onChange={(e) => setFilterFaculty(e.target.value)} // Bind State Faculty
                >
                  <option value="Tất cả">Tất cả</option>
                  <option value="Khoa học và Kỹ thuật Máy tính">Khoa học máy tính</option>
                  <option value="Điện - Điện tử">Điện - Điện tử</option>
                  <option value="Bách Khoa">Bách Khoa</option>
                  {/* Bạn có thể thêm các khoa khác vào đây */}
                </select>
              </div>

              {/* Mấy cái filter Thời gian/Đánh giá tạm thời để trưng vì BE chưa hỗ trợ lọc cái này dễ */}
              <div className="filter-group">
                <label className="filter-label">Đánh giá</label>
                <select className="filter-select">
                  <option>Tất cả</option>
                </select>
              </div>
            </div>
          </section>

          {/* */}
          <section className="tutor-list-section">
            <div className="section-header">
              <h2 className="section-title">Danh sách Tutor ({filteredTutors.length})</h2>
            </div>

            {loading && <div>Đang tải danh sách tutor...</div>}
            {error && <div className="error">Lỗi: {error}</div>}

            <div
              className="tutor-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}
            >
              {filteredTutors.length === 0 && !loading && <p>Không tìm thấy Tutor nào phù hợp.</p>}

              {/* Render danh sách ĐÃ LỌC */}
              {filteredTutors.map((tutor) => (
                <div className="tutor-card" key={tutor.id}>
                  <img
                    src={tutor.avatar || 'https://sfile.chatglm.cn/images-ppt/aa7eaf65d023.jpg'}
                    alt="Tutor"
                    className="tutor-avatar"
                  />
                  <div className="tutor-info">
                    <h3 className="tutor-name">{tutor.name || tutor.username}</h3>
                    <div className="tutor-subject">Khoa: {tutor.faculty || 'Chưa cập nhật'}</div>
                    <p className="tutor-bio">{tutor.email}</p>

                    {/* Hiển thị môn dạy (tùy chọn) */}
                    <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '5px', fontStyle: 'italic' }}>
                      Dạy: {tutor.teachingSubjects?.slice(0, 3).join(', ')}
                      {tutor.teachingSubjects?.length > 3 ? '...' : ''}
                    </div>

                    <div className="tutor-meta">
                      <div className="tutor-meta-item">
                        <i className="material-icons">star</i>
                        <span>4.8</span>
                      </div>
                      <div className="tutor-meta-item">
                        <i className="material-icons">people</i>
                        <span>{tutor.totalStudents || 0} HS</span>
                      </div>
                    </div>
                    <div className="tutor-actions">
                      <button className="tutor-button view-profile-btn">Xem hồ sơ</button>
                      <button className="tutor-button book-session-btn" onClick={() => handleOpenModal(tutor)}>
                        Đăng ký buổi học
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="footer">
            <p>© 2025 Tutor Support System. Đã đăng ký bản quyền.</p>
          </footer>
        </div>

        {/* */}
        {isModalOpen && selectedTutor && (
          <div id="tutorModal" className="modal" style={{ display: 'flex' }}>
            <div className="modal-content" style={{ maxWidth: '800px' }}>
              <button className="modal-close" onClick={handleCloseModal}>
                <i className="material-icons">close</i>
              </button>

              <h2 className="modal-title">Lớp học của {selectedTutor.name}</h2>

              <div
                className="tutor-profile"
                style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}
              >
                <img
                  src="https://sfile.chatglm.cn/images-ppt/aa7eaf65d023.jpg"
                  alt="Tutor"
                  className="tutor-profile-avatar"
                />
                <div className="tutor-profile-info">
                  <h3 className="tutor-profile-name">{selectedTutor.name}</h3>
                  <div className="tutor-profile-subject">{selectedTutor.email}</div>
                  <div className="tutor-profile-rating">
                    <span>Khoa: {selectedTutor.faculty}</span>
                  </div>
                </div>
              </div>

              {/* DANH SÁCH SESSION */}
              <h3 style={{ color: '#0056b3', marginBottom: '15px' }}>Các buổi học đang mở:</h3>

              <div className="session-list-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {tutorSessions.length === 0 ? (
                  <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
                    Tutor này hiện chưa có buổi học nào được mở.
                  </p>
                ) : (
                  tutorSessions.map((session: any) => {
                    // Tính toán slot còn lại (logic dựa trên BE trả về)
                    // BE trả về: session._count.registrations
                    const registeredCount = session._count?.registrations || 0;
                    const availableSlots = session.maxStudents - registeredCount;
                    const isFull = availableSlots <= 0;

                    const isRegistered = !!session.userRegistration;
                    let buttonText = 'Đăng ký ngay';
                    let buttonColor = '#0056b3'; // Xanh
                    let isDisabled = false;

                    if (isRegistered) {
                      buttonText = 'Đã đăng ký';
                      buttonColor = '#2e7d32'; // Xanh lá
                      isDisabled = true;
                    } else if (isFull) {
                      buttonText = 'Hết chỗ';
                      buttonColor = '#9e9e9e'; // Xám
                      isDisabled = true;
                    }

                    return (
                      <div
                        key={session.id}
                        className="session-item-card"
                        style={{
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          padding: '15px',
                          marginBottom: '10px',
                          backgroundColor: isRegistered ? '#f1f8e9' : '#fff', // Nền xanh nhạt nếu đã đk
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '10px',
                        }}
                      >
                        <div className="session-info-left">
                          <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>
                            {session.title}
                            {isRegistered && (
                              <span style={{ fontSize: '0.8em', color: '#2e7d32', marginLeft: '8px' }}>(Của bạn)</span>
                            )}
                          </h4>
                          <div style={{ fontSize: '0.9rem', color: '#666' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <i className="material-icons" style={{ fontSize: '16px' }}>
                                event
                              </i>
                              {new Date(session.startTime).toLocaleDateString('vi-VN')}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <i className="material-icons" style={{ fontSize: '16px' }}>
                                schedule
                              </i>
                              {new Date(session.startTime).toLocaleTimeString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}{' '}
                              -
                              {new Date(session.endTime).toLocaleTimeString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                              <i className="material-icons" style={{ fontSize: '16px' }}>
                                location_on
                              </i>
                              {session.location || 'Online'}
                            </div>
                          </div>
                        </div>

                        <div
                          className="session-info-right"
                          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}
                        >
                          {/* Badge Slot */}
                          <div
                            className={`slot-badge`}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '15px',
                              fontSize: '0.85rem',
                              fontWeight: 'bold',
                              backgroundColor: isFull && !isRegistered ? '#ffebee' : '#e3f2fd',
                              color: isFull && !isRegistered ? '#c62828' : '#0277bd',
                            }}
                          >
                            {isFull ? 'Đã đầy' : `Còn ${availableSlots} chỗ`}
                          </div>

                          {/* Nút Đăng ký / Đã đăng ký */}
                          <button
                            onClick={() => handleRegisterSession(session.id)}
                            disabled={isDisabled}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: buttonColor,
                              color: 'white',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: isDisabled ? 'not-allowed' : 'pointer',
                              fontWeight: '600',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              opacity: isFull && !isRegistered ? 0.7 : 1,
                            }}
                          >
                            {isRegistered ? (
                              <i className="material-icons" style={{ fontSize: 18 }}>
                                check
                              </i>
                            ) : null}
                            {buttonText}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="form-actions" style={{ marginTop: '20px' }}>
                <button type="button" className="form-button cancel-button" onClick={handleCloseModal}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
