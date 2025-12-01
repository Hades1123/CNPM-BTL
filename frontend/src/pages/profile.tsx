import '@/styles/profile.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getProfile } from '@/service/user';
import { ProfileInfo } from '@/components/profile/ProfileInfo';
import { ProfessionalInfo } from '@/components/profile/ProfessionalInfo';
import { PageHeader } from '@/components/layout/PageHeader';
import type { User } from '@/types/user';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = await getProfile();
        setUser(user);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        alert('Không thể tải thông tin người dùng!');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = () => {
    alert('Chức năng lưu thay đổi đang được phát triển!');
  };

  if (loading) {
    return (
      <div className="profile-poster-container">
        <div className="loading-container">
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="profile-poster-container">
      <div className="profile-content">
        <PageHeader userRole={user.role} />

        <h1 className="page-title">Thông tin cá nhân</h1>

        <ProfileInfo user={user} />

        <ProfessionalInfo onSave={handleSave} />

        <footer className="footer">
          <div className="footer-content">
            <p>© 2025 Tutor Support System - HCMUT</p>
          </div>
        </footer>
      </div>
    </div>
  );
};
