import type { Session, TutorWithStats } from '@/types/sessions';
import { SessionCard } from '@/components/session/SessionCard';

interface TutorModalProps {
  tutor: TutorWithStats;
  sessions: Session[];
  onClose: () => void;
  onRegister: (sessionId: number) => void;
}

const DEFAULT_AVATAR = 'https://sfile.chatglm.cn/images-ppt/aa7eaf65d023.jpg';

export const TutorModal = ({ tutor, sessions, onClose, onRegister }: TutorModalProps) => {
  return (
    <div id="tutorModal" className="modal" style={{ display: 'flex' }}>
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <button className="modal-close" onClick={onClose}>
          <i className="material-icons">close</i>
        </button>

        <h2 className="modal-title">Lớp học của {tutor.name}</h2>

        <div
          className="tutor-profile"
          style={{ borderBottom: '1px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}
        >
          <img src={tutor.avatar || DEFAULT_AVATAR} alt={`Avatar của ${tutor.name}`} className="tutor-profile-avatar" />
          <div className="tutor-profile-info">
            <h3 className="tutor-profile-name">{tutor.name}</h3>
            <div className="tutor-profile-subject">{tutor.email}</div>
            <div className="tutor-profile-rating">
              <span>Khoa: {tutor.faculty}</span>
            </div>
          </div>
        </div>

        <h3 style={{ color: '#0056b3', marginBottom: '15px' }}>Các buổi học đang mở:</h3>

        <div className="session-list-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {sessions.length === 0 ? (
            <p style={{ textAlign: 'center', fontStyle: 'italic', color: '#666' }}>
              Tutor này hiện chưa có buổi học nào được mở.
            </p>
          ) : (
            sessions.map((session) => <SessionCard key={session.id} session={session} onRegister={onRegister} />)
          )}
        </div>

        <div className="form-actions" style={{ marginTop: '20px' }}>
          <button type="button" className="form-button cancel-button" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
