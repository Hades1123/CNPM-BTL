import '@/styles/myCourse.css';

import { useEffect, useState } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { MySessionCard } from '@/components/session/MySessionCard';
import { sessionsApi } from '@/service/sessions';
import { parseLocalDateTime } from '@/helpers/date';
import type { MyRegistration } from '@/types/sessions';

type FilterType = 'all' | 'upcoming' | 'completed';

export const MyCourse = () => {
  const [registrations, setRegistrations] = useState<MyRegistration[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');

  const fetchRegistrations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await sessionsApi.getMyRegistrations();
      setRegistrations(data);
    } catch (err: any) {
      setError(err?.message || 'Lỗi khi lấy dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleCancel = async (sessionId: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn hủy đăng ký?')) return;
    try {
      await sessionsApi.cancelRegistration(sessionId);
      alert('Hủy đăng ký thành công!');
      fetchRegistrations();
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Lỗi khi hủy đăng ký');
    }
  };

  // Filter logic
  const now = new Date();
  const filteredRegistrations = registrations.filter((r) => {
    const endTime = parseLocalDateTime(r.session.endTime);
    if (filter === 'upcoming') return endTime > now;
    if (filter === 'completed') return endTime <= now;
    return true;
  });

  return (
    <div className="poster-container">
      <div className="content">
        <PageHeader />

        <h1 className="page-title">Lịch học của tôi</h1>

        <section className="sessions-section">
          <div className="section-header">
            <h2 className="section-title">Các buổi học của bạn ({filteredRegistrations.length})</h2>
            <div className="filter-tabs">
              <div className={`filter-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                Tất cả
              </div>
              <div
                className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
                onClick={() => setFilter('upcoming')}
              >
                Sắp diễn ra
              </div>
              <div
                className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Đã hoàn thành
              </div>
            </div>
          </div>

          {loading && <div className="loading">Đang tải...</div>}
          {error && <div className="error">Lỗi: {error}</div>}

          {!loading && filteredRegistrations.length === 0 && (
            <p className="no-results">Bạn chưa đăng ký buổi học nào.</p>
          )}

          {filteredRegistrations.map((reg) => (
            <MySessionCard key={reg.registration.id} data={reg} onCancel={handleCancel} />
          ))}
        </section>

        <footer className="footer">
          <p>© 2025 Tutor Support System. Đã đăng ký bản quyền.</p>
        </footer>
      </div>
    </div>
  );
};
