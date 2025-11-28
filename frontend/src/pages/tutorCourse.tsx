import '@/styles/tutorCourse.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';

// 1. Thêm trường materials (tài liệu) và notes (ghi chú) vào dữ liệu giả
const INITIAL_SESSIONS = [
  {
    id: 1,
    subject: 'Cấu trúc dữ liệu',
    student: 'Lê Văn C',
    time: '15:00 - 17:00',
    date: '2025-10-25',
    location: 'Phòng A301',
    onlineLink: '', // Link họp/tài liệu online (Google Drive)
    files: [], // <--- Mảng chứa các file upload
    notes: '',
    status: 'Upcoming',
  },
  {
    id: 2,
    subject: 'Lập trình Web (React)',
    student: 'Nguyễn Thị B',
    time: '09:00 - 11:00',
    date: '2025-10-26',
    location: 'Google Meet',
    onlineLink: 'https://drive.google.com/drive/u/0/my-drive',
    files: [
      { name: 'Bai_tap_1.pdf', url: '#' }, // Demo file có sẵn
      { name: 'Huong_dan.docx', url: '#' },
    ],
    notes: 'Các em nhớ cài Node.js trước nhé',
    status: 'Upcoming',
  },
  {
    id: 3,
    subject: 'Cơ sở dữ liệu',
    student: 'Trần Văn D',
    time: '13:00 - 15:00',
    date: '2025-10-28',
    location: 'Phòng B202',
    materials: '',
    notes: '',
    status: 'Finished',
  },
];

const TutorCourse = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState(INITIAL_SESSIONS);

  // --- LOGIC MODAL ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<any>(null);

  // Khi bấm nút "Cập nhật thông tin"
  const handleEditClick = (session: any) => {
    setEditingSession({ ...session }); // Copy dữ liệu vào state tạm để sửa
    setIsModalOpen(true);
  };

  // Khi thay đổi input trong Modal
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingSession((prev: any) => ({ ...prev, [name]: value }));
  };

  // Lưu từ Modal
  const handleSaveModal = () => {
    const updatedSessions = sessions.map((s) => (s.id === editingSession.id ? editingSession : s));
    setSessions(updatedSessions);
    setIsModalOpen(false);
    setEditingSession(null);
    alert('Cập nhật thông tin buổi học thành công!');
  };

  const handleReschedule = (subject: string) => {
    alert(`Đã gửi yêu cầu dời lịch môn ${subject} đến sinh viên.`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList sang Array và tạo object cho từng file
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      }));

      setEditingSession((prev: any) => ({
        ...prev,
        files: [...prev.files, ...newFiles], // Nối file mới vào danh sách cũ
      }));
    }
  };

  // Hàm xóa file trong lúc đang edit (nếu lỡ chọn nhầm)
  const handleRemoveFile = (indexToRemove: number) => {
    setEditingSession((prev: any) => ({
      ...prev,
      files: prev.files.filter((_: any, index: number) => index !== indexToRemove),
    }));
  };
  return (
    <div className="poster-container">
      <div className="background-shape shape-1"></div>
      <div className="background-shape shape-2"></div>

      <div className="content">
        {/* Header giữ nguyên */}
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
            <button className="nav-item" onClick={() => navigate('/tutor')}>
              Lịch của tôi
            </button>
            <button className="nav-item active" onClick={() => navigate('/tutorCourse')}>
              Quản lý buổi học
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

        <h1 className="page-title">Quản lý Buổi học ({sessions.length})</h1>

        <div className="sessions-list">
          {sessions.map((session) => (
            <div key={session.id} className={`session-card ${session.status === 'Finished' ? 'card-finished' : ''}`}>
              <div className="session-header">
                <h3 className="subject-title">{session.subject}</h3>
                <span className={`status-badge ${session.status.toLowerCase()}`}>
                  {session.status === 'Upcoming' ? 'Sắp diễn ra' : 'Đã kết thúc'}
                </span>
              </div>

              <div className="session-body">
                <div className="info-row">
                  <i className="material-icons">person</i>
                  <span className="info-label">Sinh viên:</span>
                  <span className="info-value">{session.student}</span>
                </div>
                <div className="info-row">
                  <i className="material-icons">event</i>
                  <span className="info-label">Thời gian:</span>
                  <span className="info-value">
                    {session.date} | {session.time}
                  </span>
                </div>
                <div className="info-row">
                  <i className="material-icons">location_on</i>
                  <span className="info-label">Địa điểm:</span>
                  <span className="info-value location-text">{session.location}</span>
                </div>

                {/* Hiển thị Link tài liệu nếu có */}
                {session.materials && (
                  <div className="info-row">
                    <i className="material-icons">link</i>
                    <span className="info-label">Tài liệu:</span>
                    <a href={session.materials} target="_blank" rel="noreferrer" className="material-link">
                      Mở tài liệu học tập
                    </a>
                  </div>
                )}

                {session.onlineLink && (
                  <div className="info-row">
                    <i className="material-icons">link</i>
                    <span className="info-label">Link Online:</span>
                    <a href={session.onlineLink} target="_blank" rel="noreferrer" className="material-link">
                      Truy cập liên kết
                    </a>
                  </div>
                )}

                {/* 2. Hiển thị Danh sách File (Loop qua mảng files) */}
                {session.files && session.files.length > 0 && (
                  <div className="info-row" style={{ alignItems: 'flex-start' }}>
                    <i className="material-icons" style={{ marginTop: 5 }}>
                      attach_file
                    </i>
                    <span className="info-label">Tài liệu:</span>
                    <div className="file-list-chip">
                      {session.files.map((file: any, index: number) => (
                        <a key={index} href={file.url} download={file.name} className="file-download-chip">
                          {file.name} <i className="material-icons tiny-icon">download</i>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hiển thị Ghi chú nếu có */}
                {session.notes && (
                  <div className="info-row">
                    <i className="material-icons">note</i>
                    <span className="info-label">Ghi chú:</span>
                    <span className="info-value">{session.notes}</span>
                  </div>
                )}
              </div>

              <div className="session-actions">
                {session.status !== 'Finished' ? (
                  <>
                    {/* Nút mở Modal */}
                    <button onClick={() => handleEditClick(session)} className="btn btn-edit">
                      <i className="material-icons" style={{ fontSize: 16 }}>
                        edit
                      </i>{' '}
                      Cập nhật thông tin
                    </button>
                    <button onClick={() => handleReschedule(session.subject)} className="btn btn-reschedule">
                      Dời lịch
                    </button>
                  </>
                ) : (
                  <button className="btn btn-disabled" disabled>
                    Đã hoàn thành
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- MODAL POPUP --- */}
      {isModalOpen && editingSession && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Cập nhật buổi học</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Địa điểm / Link Online</label>
                <input
                  type="text"
                  name="location"
                  className="form-input"
                  value={editingSession.location}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Link Tài liệu / Drive (Online)</label>
                <input
                  type="text"
                  name="onlineLink"
                  className="form-input"
                  value={editingSession.onlineLink || ''}
                  onChange={handleInputChange}
                />
              </div>

              <label className="form-label">File đính kèm</label>
              <div className="upload-section">
                {/* Nút Upload có thuộc tính 'multiple' */}
                <label className="btn-upload">
                  <i className="material-icons">cloud_upload</i> Thêm file
                  <input
                    type="file"
                    hidden
                    multiple // <--- QUAN TRỌNG: Cho phép chọn nhiều file
                    onChange={handleFileChange}
                  />
                </label>

                {/* Danh sách file đang có trong Modal (để review/xóa) */}
                <div className="modal-file-list">
                  {editingSession.files && editingSession.files.length > 0 ? (
                    editingSession.files.map((file: any, index: number) => (
                      <div key={index} className="modal-file-item">
                        <span>
                          <i className="material-icons">description</i> {file.name}
                        </span>
                        <button className="btn-remove-file" onClick={() => handleRemoveFile(index)}>
                          &times;
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="no-file-text">Chưa có file nào</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Ghi chú cho sinh viên</label>
                <textarea
                  name="notes"
                  className="form-input form-textarea"
                  value={editingSession.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancel" onClick={() => setIsModalOpen(false)}>
                Hủy bỏ
              </button>
              <button className="btn btn-save" onClick={handleSaveModal}>
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorCourse;
