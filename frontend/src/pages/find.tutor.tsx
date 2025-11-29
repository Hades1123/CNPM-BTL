import '@/styles/findTutor.css';
import { useNavigate } from 'react-router';
import { useEffect, useState, useCallback } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { TutorCard } from '@/components/tutor/TutorCard';
import { TutorModal } from '@/components/tutor/TutorModal';
import { sessionsApi, groupSessionsByTutor } from '@/service/sessions';
import type { Session, TutorWithStats } from '@/types/sessions';

export const FindTutorPage = () => {
  const navigate = useNavigate();

  // State for data
  const [tutors, setTutors] = useState<TutorWithStats[]>([]);
  const [allSessions, setAllSessions] = useState<Session[]>([]);

  // State for UI
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<TutorWithStats | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for search
  const [searchText, setSearchText] = useState('');

  // Fetch sessions with optional search
  const fetchSessions = useCallback(async (search?: string) => {
    setLoading(true);
    setError(null);
    try {
      const sessions = await sessionsApi.getAllSessions(search);
      setAllSessions(sessions);
      setTutors(groupSessionsByTutor(sessions));
    } catch (err: any) {
      setError(err?.message || 'Lỗi khi lấy dữ liệu');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  // Handle search
  const handleSearch = () => {
    fetchSessions(searchText);
  };

  // Handle Enter key for search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Modal handlers
  const handleOpenModal = (tutor: TutorWithStats) => {
    setSelectedTutor(tutor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTutor(null);
  };

  // Get sessions for selected tutor
  const tutorSessions = selectedTutor
    ? allSessions.filter((s) => s.tutor?.id === selectedTutor.id)
    : [];

  // Register for session
  const handleRegisterSession = async (sessionId: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn đăng ký buổi học này?')) return;

    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        alert('Vui lòng đăng nhập để đăng ký!');
        navigate('/login');
        return;
      }

      const result = await sessionsApi.registerSession(sessionId);

      if (result.success) {
        alert('Đăng ký thành công!');
        handleCloseModal();
        // Refresh data
        fetchSessions(searchText);
      } else {
        alert(`Đăng ký thất bại: ${result.message}`);
      }
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || 'Lỗi kết nối server');
    }
  };

  return (
    <div className="poster-container">
      <div className="background-shape shape-1"></div>
      <div className="background-shape shape-2"></div>
      <div className="background-shape shape-3"></div>

      <div className="content">
        <PageHeader />

        <h1 className="page-title">Tìm kiếm và Đăng ký Tutor</h1>

        <section className="search-section">
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="Tìm kiếm theo tên tutor hoặc môn học..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-button" onClick={handleSearch}>
              <i className="material-icons">search</i>
            </button>
          </div>
        </section>

        <section className="tutor-list-section">
          <div className="section-header">
            <h2 className="section-title">Danh sách Tutor ({tutors.length})</h2>
          </div>

          {loading && <div className="loading">Đang tải danh sách tutor...</div>}
          {error && <div className="error">Lỗi: {error}</div>}

          <div className="tutor-grid">
            {tutors.length === 0 && !loading && (
              <p className="no-results">Không tìm thấy Tutor nào phù hợp.</p>
            )}

            {tutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} onBookSession={handleOpenModal} />
            ))}
          </div>
        </section>

        <footer className="footer">
          <p>© 2025 Tutor Support System. Đã đăng ký bản quyền.</p>
        </footer>
      </div>

      {isModalOpen && selectedTutor && (
        <TutorModal
          tutor={selectedTutor}
          sessions={tutorSessions}
          onClose={handleCloseModal}
          onRegister={handleRegisterSession}
        />
      )}
    </div>
  );
};
