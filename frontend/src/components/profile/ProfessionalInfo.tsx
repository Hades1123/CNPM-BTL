interface ProfessionalInfoProps {
  onSave: () => void;
}

export const ProfessionalInfo = ({ onSave }: ProfessionalInfoProps) => {
  return (
    <section className="professional-section">
      <h3 className="section-title">
        <i className="material-icons">work</i>
        Chuyên môn và Lĩnh vực quan tâm
      </h3>

      <div className="editable-field">
        <div className="info-label">Chuyên môn chính</div>
        <input type="text" placeholder="Ví dụ: Khoa học máy tính, Kỹ thuật phần mềm" />
      </div>

      <div className="editable-field">
        <div className="info-label">Các môn học cần hỗ trợ</div>
        <div className="skill-tags">
          <div className="skill-tag">
            <i className="material-icons">close</i>
            Toán cao cấp
          </div>
          <div className="skill-tag">
            <i className="material-icons">close</i>
            Lập trình cơ bản
          </div>
          <div className="skill-tag">
            <i className="material-icons">close</i>
            Cấu trúc dữ liệu
          </div>
          <button className="add-skill-button">
            <i className="material-icons">add</i>
            Thêm môn học
          </button>
        </div>
      </div>

      <div className="editable-field">
        <div className="info-label">Lĩnh vực quan tâm</div>
        <textarea placeholder="Ví dụ: Trí tuệ nhân tạo, Học máy, Phát triển ứng dụng web" />
      </div>

      <div className="editable-field">
        <div className="info-label">Kỹ năng đặc biệt</div>
        <div className="skill-tags">
          <div className="skill-tag">
            <i className="material-icons">close</i>
            Python
          </div>
          <div className="skill-tag">
            <i className="material-icons">close</i>
            JavaScript
          </div>
          <div className="skill-tag">
            <i className="material-icons">close</i>
            React
          </div>
          <div className="skill-tag">
            <i className="material-icons">close</i>
            Node.js
          </div>
          <button className="add-skill-button">
            <i className="material-icons">add</i>
            Thêm kỹ năng
          </button>
        </div>
      </div>

      <div className="save-button-container">
        <button className="save-btn" onClick={onSave}>
          <i className="material-icons">save</i>
          Lưu thay đổi
        </button>
      </div>
    </section>
  );
};
