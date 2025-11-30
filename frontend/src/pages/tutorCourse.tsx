import '@/styles/tutorCourse.css';
import { useState, useEffect } from 'react';
import { sessionsApi } from '@/service/sessions';
import { PageHeader } from '@/components/layout/PageHeader';
import { TutorSessionCard } from '@/components/tutor/TutorSessionCard';
import { EditSessionModal } from '@/components/tutor/EditSessionModal';
import { CreateSessionModal, type CreateSessionData } from '@/components/tutor/CreateSessionModal';
import type { TutorSession } from '@/types/sessions';

const TutorCourse = () => {
  const [sessions, setSessions] = useState<TutorSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSession, setEditingSession] = useState<TutorSession | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const data = await sessionsApi.getTutorSessions();
      setSessions(data);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      alert('Không thể tải danh sách buổi học!');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (session: TutorSession) => {
    setEditingSession(session);
  };

  const handleSaveEdit = (updatedSession: TutorSession) => {
    // TODO: Call API to update session
    setSessions((prev) => prev.map((s) => (s.id === updatedSession.id ? updatedSession : s)));
    setEditingSession(null);
    alert('Cập nhật thông tin buổi học thành công!');
  };

  const handleCreate = (data: CreateSessionData) => {
    // TODO: Call API to create session
    console.log('Create session:', data);
    setShowCreateModal(false);
    alert('Chức năng tạo buổi học đang được phát triển!');
  };

  if (loading) {
    return (
      <div className="poster-container">
        <div className="loading-container">
          <p>Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="poster-container">
      <div className="background-shape shape-1"></div>
      <div className="background-shape shape-2"></div>

      <div className="content">
        <PageHeader userRole="TUTOR" />

        <div
          className="page-header-row"
          style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 20 }}
        >
          <h1 className="page-title">Quản lý Buổi học ({sessions.length})</h1>
          <button className="btn btn-create" onClick={() => setShowCreateModal(true)}>
            <i className="material-icons">add</i>
            Tạo buổi học mới
          </button>
        </div>

        <div className="sessions-list">
          {sessions.length === 0 ? (
            <div className="empty-state">
              <i className="material-icons">event_busy</i>
              <p>Bạn chưa có buổi học nào</p>
              <button className="btn btn-create" onClick={() => setShowCreateModal(true)}>
                Tạo buổi học đầu tiên
              </button>
            </div>
          ) : (
            sessions.map((session) => <TutorSessionCard key={session.id} session={session} onEdit={handleEdit} />)
          )}
        </div>
      </div>

      {editingSession && (
        <EditSessionModal session={editingSession} onClose={() => setEditingSession(null)} onSave={handleSaveEdit} />
      )}

      {showCreateModal && <CreateSessionModal onClose={() => setShowCreateModal(false)} onCreate={handleCreate} />}
    </div>
  );
};

export default TutorCourse;
