import type { Session } from '@/types/sessions';
import { parseLocalDateTime, formatDate, formatTime } from '@/helpers/date';

interface SessionCardProps {
  session: Session;
  onRegister: (sessionId: number) => void;
}

export const SessionCard = ({ session, onRegister }: SessionCardProps) => {
  const registeredCount = session._count?.registrations || 0;
  const availableSlots = session.maxStudents - registeredCount;
  const isFull = availableSlots <= 0;
  const isRegistered = !!session.userRegistration;

  // Determine button state
  let buttonText = 'Đăng ký ngay';
  let buttonColor = '#0056b3';
  let isDisabled = false;

  if (isRegistered) {
    buttonText = 'Đã đăng ký';
    buttonColor = '#2e7d32';
    isDisabled = true;
  } else if (isFull) {
    buttonText = 'Hết chỗ';
    buttonColor = '#9e9e9e';
    isDisabled = true;
  }

  return (
    <div
      className={`session-item-card ${isRegistered ? 'session-registered' : ''}`}
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '10px',
        backgroundColor: isRegistered ? '#f1f8e9' : '#fff',
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
          {isRegistered && <span style={{ fontSize: '0.8em', color: '#2e7d32', marginLeft: '8px' }}>(Của bạn)</span>}
        </h4>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <i className="material-icons" style={{ fontSize: '16px' }}>
              event
            </i>
            {formatDate(parseLocalDateTime(session.startTime))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <i className="material-icons" style={{ fontSize: '16px' }}>
              schedule
            </i>
            {formatTime(parseLocalDateTime(session.startTime))} - {formatTime(parseLocalDateTime(session.endTime))}
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
        <div
          className="slot-badge"
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

        <button
          onClick={() => onRegister(session.id)}
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
          {isRegistered && (
            <i className="material-icons" style={{ fontSize: 18 }}>
              check
            </i>
          )}
          {buttonText}
        </button>
      </div>
    </div>
  );
};
