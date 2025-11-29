import type { TutorWithStats } from '@/types/sessions';

interface TutorCardProps {
  tutor: TutorWithStats;
  onBookSession: (tutor: TutorWithStats) => void;
}

const DEFAULT_AVATAR = 'https://sfile.chatglm.cn/images-ppt/aa7eaf65d023.jpg';

export const TutorCard = ({ tutor, onBookSession }: TutorCardProps) => {
  return (
    <div className="tutor-card">
      <img src={tutor.avatar || DEFAULT_AVATAR} alt={`Avatar của ${tutor.name}`} className="tutor-avatar" />
      <div className="tutor-info">
        <h3 className="tutor-name">{tutor.name || tutor.username}</h3>
        <div className="tutor-subject">Khoa: {tutor.faculty || 'Chưa cập nhật'}</div>
        <p className="tutor-bio">{tutor.email}</p>

        <div className="tutor-teaching-subjects">
          Dạy: {tutor.teachingSubjects?.slice(0, 3).join(', ')}
          {(tutor.teachingSubjects?.length || 0) > 3 ? '...' : ''}
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
          <button className="tutor-button book-session-btn" onClick={() => onBookSession(tutor)}>
            Đăng ký buổi học
          </button>
        </div>
      </div>
    </div>
  );
};
