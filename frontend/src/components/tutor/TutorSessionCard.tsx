import type { TutorSession, Material } from '@/types/sessions';

interface TutorSessionCardProps {
  session: TutorSession;
  onEdit: (session: TutorSession) => void;
}

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

export const TutorSessionCard = ({ session, onEdit }: TutorSessionCardProps) => {
  const handleReschedule = () => {
    alert(`Đã gửi yêu cầu dời lịch buổi "${session.title}" đến sinh viên.`);
  };

  return (
    <div className={`session-card ${session.isPast ? 'card-finished' : ''}`}>
      <div className="session-header">
        <h3 className="subject-title">{session.title}</h3>
        <span className={`status-badge ${getStatusClass(session)}`}>
          {getStatusLabel(session)}
        </span>
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
          <span className="info-value location-text">
            {session.location || 'Chưa xác định'}
          </span>
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
                <a
                  key={file.id}
                  href={file.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="file-download-chip"
                >
                  {file.fileName}
                  <i className="material-icons tiny-icon">download</i>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="session-actions">
        {!session.isPast ? (
          <>
            <button onClick={() => onEdit(session)} className="btn btn-edit">
              <i className="material-icons">edit</i>
              Cập nhật
            </button>
            <button onClick={handleReschedule} className="btn btn-reschedule">
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
  );
};
