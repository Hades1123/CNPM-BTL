import type { MyRegistration } from '@/types/sessions';

interface MySessionCardProps {
  data: MyRegistration;
  onCancel: (sessionId: number) => void;
  onRate: (sessionId: number) => void;
}

export const MySessionCard = ({ data, onCancel, onRate }: MySessionCardProps) => {
  const { session } = data;
  const now = new Date();
  const startTime = new Date(session.startTime);
  const endTime = new Date(session.endTime);

  const isUpcoming = startTime > now;
  const isOngoing = startTime <= now && endTime > now;
  const isCompleted = endTime <= now;

  const getStatus = () => {
    if (isOngoing) return { text: 'Đang diễn ra', className: 'status-ongoing' };
    if (isCompleted) return { text: 'Đã hoàn thành', className: 'status-completed' };
    return { text: 'Sắp diễn ra', className: 'status-upcoming' };
  };

  const status = getStatus();

  const formatDate = (date: Date) => date.toLocaleDateString('vi-VN');
  const formatTime = (date: Date) => date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="session-card">
      <div className="session-header">
        <h3 className="session-title">{session.title}</h3>
        <div className={`session-status ${status.className}`}>{status.text}</div>
      </div>

      <div className="session-info">
        <div className="session-info-item">
          <i className="material-icons">person</i>
          <span>{session.tutor.name || session.tutor.username}</span>
        </div>
        <div className="session-info-item">
          <i className="material-icons">event</i>
          <span>{formatDate(startTime)}</span>
        </div>
        <div className="session-info-item">
          <i className="material-icons">schedule</i>
          <span>
            {formatTime(startTime)} - {formatTime(endTime)}
          </span>
        </div>
        <div className="session-info-item">
          <i className="material-icons">location_on</i>
          <span>{session.location || 'Online'}</span>
        </div>
      </div>

      {session.description && <div className="session-description">{session.description}</div>}

      {session.materials.length > 0 && (
        <div className="session-materials">
          <div className="materials-title">Tài liệu buổi học:</div>
          <div className="materials-list">
            {session.materials.map((material) => (
              <a
                key={material.id}
                href={material.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="material-item"
              >
                <i className="material-icons">download</i>
                <span>{material.fileName}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="session-actions">
        {isUpcoming && (
          <>
            <button className="session-button join-button">
              <i className="material-icons">video_call</i>
              Tham gia
            </button>
            <button className="session-button cancel-button" onClick={() => onCancel(session.id)}>
              <i className="material-icons">cancel</i>
              Hủy đăng ký
            </button>
          </>
        )}
        {isCompleted && (
          <button className="session-button rate-button" onClick={() => onRate(session.id)}>
            <i className="material-icons">star</i>
            Đánh giá
          </button>
        )}
      </div>
    </div>
  );
};
