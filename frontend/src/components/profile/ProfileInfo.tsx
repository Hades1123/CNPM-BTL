import type { User } from '../../types/user';

interface ProfileInfoProps {
  user: User;
}

export const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const getRoleLabel = (role: string): string => {
    switch (role) {
      case 'TUTOR':
        return 'Gia sư';
      case 'ADMIN':
        return 'Quản trị viên';
      default:
        return 'Sinh viên';
    }
  };

  return (
    <section className="profile-section">
      <h3 className="section-title">
        <i className="material-icons">person</i>
        Thông tin cá nhân
      </h3>

      <div className="profile-details">
        <div className="profile-avatar">
          <i className="material-icons">account_circle</i>
        </div>

        <div className="profile-info">
          <div className="info-row">
            <span className="info-label">Họ và tên</span>
            <span className="info-value">{user.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">MSSV</span>
            <span className="info-value">{user.mssv || 'Chưa cập nhật'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Khoa</span>
            <span className="info-value">{user.faculty}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Vai trò</span>
            <span className="info-value role-badge">{getRoleLabel(user.role)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
