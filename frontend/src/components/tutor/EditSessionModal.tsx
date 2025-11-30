import type { TutorSession } from '@/types/sessions';

interface EditSessionModalProps {
  session: TutorSession;
  onClose: () => void;
  onSave: (session: TutorSession) => void;
}

export const EditSessionModal = ({ session, onClose, onSave }: EditSessionModalProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updatedSession: TutorSession = {
      ...session,
      location: formData.get('location') as string,
      description: formData.get('description') as string,
    };

    onSave(updatedSession);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Cập nhật buổi học</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Tên buổi học</label>
              <input
                type="text"
                className="form-input"
                value={session.title}
                disabled
              />
            </div>

            <div className="form-group">
              <label className="form-label">Địa điểm / Link Online</label>
              <input
                type="text"
                name="location"
                className="form-input"
                defaultValue={session.location || ''}
                placeholder="VD: Phòng A301 hoặc https://meet.google.com/..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mô tả / Ghi chú cho sinh viên</label>
              <textarea
                name="description"
                className="form-input form-textarea"
                defaultValue={session.description || ''}
                placeholder="Ghi chú cho sinh viên..."
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tài liệu đính kèm</label>
              <div className="upload-section">
                <label className="btn-upload">
                  <i className="material-icons">cloud_upload</i> Thêm file
                  <input type="file" hidden multiple />
                </label>
                <span className="no-file-text">
                  {session.materials.length > 0
                    ? `${session.materials.length} file đã tải lên`
                    : 'Chưa có file nào'}
                </span>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn btn-save">
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
