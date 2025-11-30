interface CreateSessionModalProps {
  onClose: () => void;
  onCreate: (data: CreateSessionData) => void;
}

export interface CreateSessionData {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  maxStudents: number;
}

export const CreateSessionModal = ({ onClose, onCreate }: CreateSessionModalProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data: CreateSessionData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
      location: formData.get('location') as string,
      maxStudents: parseInt(formData.get('maxStudents') as string) || 1,
    };

    onCreate(data);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Tạo buổi học mới</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Tên buổi học *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="VD: Lập trình Web với React"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Thời gian bắt đầu *</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Thời gian kết thúc *</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Địa điểm</label>
                <input
                  type="text"
                  name="location"
                  className="form-input"
                  placeholder="VD: Phòng A301 hoặc Google Meet"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Số sinh viên tối đa</label>
                <input
                  type="number"
                  name="maxStudents"
                  className="form-input"
                  defaultValue={5}
                  min={1}
                  max={50}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Mô tả</label>
              <textarea
                name="description"
                className="form-input form-textarea"
                placeholder="Mô tả nội dung buổi học..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Hủy bỏ
            </button>
            <button type="submit" className="btn btn-save">
              Tạo buổi học
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
