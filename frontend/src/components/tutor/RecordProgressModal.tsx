import { useState, useEffect } from 'react';
import type { TutorSession } from '@/types/sessions';

interface Props {
  session: TutorSession;
  onClose: () => void;
}

export const RecordProgressModal = ({ session, onClose }: Props) => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load danh sách sinh viên từ API có sẵn (không cần viết API mới)
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const base = import.meta.env.VITE_BACKEND_URL;

        // Dùng lại API lấy chi tiết đã có
        const res = await fetch(`${base}/tutor/sessions/${session.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();

        if (json.success) {
          // Lấy danh sách đăng ký từ response
          setStudents(json.data.registrations || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [session.id]);

  // Hàm giả vờ lưu
  const handleFakeSave = () => {
    // Ở đây chỉ hiện thông báo demo
    alert('Đã lưu tiến độ và gửi thông báo đến sinh viên thành công!');
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        className="modal-content"
        style={{
          background: 'white',
          padding: '0',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '800px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div
          className="modal-header"
          style={{
            padding: '20px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8f9fa',
          }}
        >
          <h3 style={{ margin: 0, color: '#0056b3' }}>Ghi nhận tiến độ: {session.title}</h3>
          <button
            onClick={onClose}
            style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer', color: '#666' }}
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: '20px', maxHeight: '60vh', overflowY: 'auto' }}>
          {loading ? (
            <p>Đang tải danh sách sinh viên...</p>
          ) : (
            <div className="student-list">
              {students.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                  Chưa có sinh viên nào đăng ký lớp này.
                </p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                      <th style={{ padding: '10px' }}>Sinh viên</th>
                      <th style={{ padding: '10px' }}>Email</th>
                      <th style={{ padding: '10px', width: '30%' }}>Nhận xét</th>
                      <th style={{ padding: '10px', width: '15%' }}>Điểm số</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((reg: any) => (
                      <tr key={reg.student.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '15px 10px', fontWeight: '500' }}>{reg.student.name}</td>
                        <td style={{ padding: '15px 10px', color: '#666' }}>{reg.student.email}</td>
                        <td style={{ padding: '15px 10px' }}>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Nhập đánh giá..."
                            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                          />
                        </td>
                        <td style={{ padding: '15px 10px' }}>
                          <select
                            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                          >
                            <option value="">--</option>
                            <option value="A">A (Giỏi)</option>
                            <option value="B">B (Khá)</option>
                            <option value="C">C (TB)</option>
                            <option value="D">D (Yếu)</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="modal-footer"
          style={{
            padding: '20px',
            borderTop: '1px solid #eee',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            backgroundColor: '#f8f9fa',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              background: 'white',
              cursor: 'pointer',
            }}
          >
            Hủy bỏ
          </button>

          <button
            onClick={handleFakeSave}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              background: '#2e7d32',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <i className="material-icons" style={{ fontSize: '18px' }}>
              save
            </i>{' '}
            Lưu kết quả
          </button>
        </div>
      </div>
    </div>
  );
};
