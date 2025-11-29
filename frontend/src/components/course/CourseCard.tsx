import type { Session } from '@/types/sessions';

interface CourseCardProps {
  session: Session;
  onRegister: (sessionId: number) => void;
}

export const CourseCard = ({ session, onRegister }: CourseCardProps) => {
  const registeredCount = session._count?.registrations || 0;
  const availableSlots = session.maxStudents - registeredCount;
  const isFull = availableSlots <= 0;
  const isRegistered = !!session.userRegistration;

  // Determine button state
  let buttonText = 'Đăng ký ngay';
  let buttonClass = 'btn-primary';
  let isDisabled = false;

  if (isRegistered) {
    buttonText = 'Đã đăng ký';
    buttonClass = 'btn-success';
    isDisabled = true;
  } else if (isFull) {
    buttonText = 'Hết chỗ';
    buttonClass = 'btn-disabled';
    isDisabled = true;
  }

  return (
    <div className={`course-card ${isRegistered ? 'course-registered' : ''}`}>
      <div className="course-header">
        <h3 className="course-title">{session.title}</h3>
        <div className={`slot-badge ${isFull && !isRegistered ? 'slot-full' : 'slot-available'}`}>
          {isFull ? 'Đã đầy' : `Còn ${availableSlots} chỗ`}
        </div>
      </div>

      <div className="course-tutor">
        <i className="material-icons">person</i>
        <span>Tutor: {session.tutor?.name || session.tutor?.username || 'N/A'}</span>
      </div>

      <div className="course-details">
        <div className="course-detail-item">
          <i className="material-icons">event</i>
          <span>{new Date(session.startTime).toLocaleDateString('vi-VN')}</span>
        </div>
        <div className="course-detail-item">
          <i className="material-icons">schedule</i>
          <span>
            {new Date(session.startTime).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
            -{' '}
            {new Date(session.endTime).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <div className="course-detail-item">
          <i className="material-icons">location_on</i>
          <span>{session.location || 'Online'}</span>
        </div>
        <div className="course-detail-item">
          <i className="material-icons">people</i>
          <span>
            {registeredCount}/{session.maxStudents} học viên
          </span>
        </div>
      </div>

      {session.tutor?.faculty && (
        <div className="course-faculty">
          <i className="material-icons">school</i>
          <span>{session.tutor.faculty}</span>
        </div>
      )}

      <button
        className={`course-register-btn ${buttonClass}`}
        onClick={() => onRegister(session.id)}
        disabled={isDisabled}
      >
        {isRegistered && <i className="material-icons">check</i>}
        {buttonText}
      </button>
    </div>
  );
};
