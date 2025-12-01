import type { TutorSession, Material } from '@/types/sessions';
import { useNavigate } from 'react-router';
interface TutorSessionCardProps {
  session: TutorSession;
  onEdit: (session: TutorSession) => void;
  onRecordProgress: (session: TutorSession) => void;
}

//const navigate = useNavigate();

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

const formatTime = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  return `${start.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
};

const getStatusLabel = (session: TutorSession): string => {
  if (session.isPast) return 'Đã kết thúc';
  if (session.isOngoing) return 'Đang diễn ra';
  return 'Sắp diễn ra';
};

const getStatusClass = (session: TutorSession): string => {
  if (session.isPast) return 'finished';
  if (session.isOngoing) return 'ongoing';
  return 'upcoming';
};

export const TutorSessionCard = ({ session, onEdit, onRecordProgress }: TutorSessionCardProps) => {
  const handleReschedule = () => {
    alert(`Đã gửi yêu cầu dời lịch buổi "${session.title}" đến sinh viên.`);
  };

  const navigate = useNavigate();
  const handleGoToFeedback = () => {
    navigate('/feedback', {
      state: {
        sessionInfo: {
          id: session.id,
          title: session.title,
          tutorName: 'Tôi (Tutor)', // Hoặc lấy tên từ user context nếu có
          time: `${formatDate(session.startTime)} | ${formatTime(session.startTime, session.endTime)}`,
          location: session.location || 'Online',
          role: 'TUTOR', // Đánh dấu là Tutor đang xem
        },
      },
    });
  };

  return (
    <div className={`session-card ${session.isPast ? 'card-finished' : ''}`}>
      <div className="session-header">
        <h3 className="subject-title">{session.title}</h3>
        <span className={`status-badge ${getStatusClass(session)}`}>{getStatusLabel(session)}</span>
      </div>

      <div className="session-body">
        <div className="info-row">
          <i className="material-icons">people</i>
          <span className="info-label">Sinh viên:</span>
          <span className="info-value">
            {session.currentStudents}/{session.maxStudents} đã đăng ký
            {session.isFull && <span className="full-badge"> (Đầy)</span>}
          </span>
        </div>

        <div className="info-row">
          <i className="material-icons">event</i>
          <span className="info-label">Thời gian:</span>
          <span className="info-value">
            {formatDate(session.startTime)} | {formatTime(session.startTime, session.endTime)}
          </span>
        </div>

        <div className="info-row">
          <i className="material-icons">location_on</i>
          <span className="info-label">Địa điểm:</span>
          <span className="info-value location-text">{session.location || 'Chưa xác định'}</span>
        </div>

        {session.description && (
          <div className="info-row">
            <i className="material-icons">description</i>
            <span className="info-label">Mô tả:</span>
            <span className="info-value">{session.description}</span>
          </div>
        )}

        {session.materials && session.materials.length > 0 && (
          <div className="info-row">
            <i className="material-icons">attach_file</i>
            <span className="info-label">Tài liệu:</span>
            <div className="file-list-chip">
              {session.materials.map((file: Material) => (
                <a key={file.id} href={file.fileUrl} target="_blank" rel="noreferrer" className="file-download-chip">
                  {file.fileName}
                  <i className="material-icons tiny-icon">download</i>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="session-actions">
        {/* Nút Cập nhật & Dời lịch (Chỉ hiện khi chưa kết thúc) */}
        {!session.isPast && (
          <>
            <button onClick={() => onEdit(session)} className="btn btn-edit">
              <i className="material-icons">edit</i>
              Cập nhật
            </button>
            <button onClick={handleReschedule} className="btn btn-reschedule">
              Dời lịch
            </button>
          </>
        )}

        {/* Nút Ghi nhận tiến độ (Hiện khi Đang diễn ra hoặc Đã qua) */}
        {(session.isPast || session.isOngoing) && (
          <button
            className="btn"
            onClick={() => onRecordProgress(session)}
            style={{
              backgroundColor: '#2e7d32', // Màu xanh lá đậm
              color: 'white',
              border: 'none',
            }}
          >
            <i className="material-icons">assessment</i>
            Ghi nhận tiến độ
          </button>
        )}

        {/* Nút Disabled hiển thị trạng thái (Chỉ hiện khi Đã qua và không có nút khác chèn vào, hoặc giữ nguyên để báo hiệu) */}
        {session.isPast && (
          <>
            <button
              className="btn"
              onClick={handleGoToFeedback}
              style={{
                backgroundColor: '#ff9800', // Màu cam
                color: 'white',
                border: 'none',
                marginLeft: '10px',
              }}
            >
              <i className="material-icons">star</i>
              Đánh giá
            </button>
            <button className="btn btn-disabled" disabled style={{ marginLeft: 'auto' }}>
              Đã hoàn thành
            </button>
          </>
        )}
      </div>
    </div>
  );
};
