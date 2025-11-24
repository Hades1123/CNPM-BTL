import '@/styles/profile.css';
export const ProfilePage = () => {
	return (
		<>
			<div className="poster-container">
				{/* <!-- Background Shapes --> */}
				<div className="background-shape shape-1"></div>
				<div className="background-shape shape-2"></div>
				<div className="background-shape shape-3"></div>

				<div className="content">
					{/* <!-- Header --> */}
					<header className="header">
						<div className="logo">
							<div className="logo-icon">
								<i className="material-icons">school</i>
							</div>
							<div className="logo-text">Tutor Support System</div>
						</div>
						<nav className="nav-menu">
							<div className="nav-item">Trang chủ</div>
							<div className="nav-item">Tìm tutor</div>
							<div className="nav-item">Lịch học</div>
							<div className="nav-item">Tài khoản</div>
						</nav>
					</header>

					{/* <!-- Page Title --> */}
					<h1 className="page-title">Thông tin cá nhân</h1>

					{/* <!-- Profile Section --> */}
					<section className="profile-section">
						<div className="profile-header">
							<div className="profile-avatar">NV</div>
							<div className="profile-info">
								<h2 className="profile-name">Nguyễn Văn An</h2>
								<div className="profile-id">MSSV: 2212719</div>
								<div className="profile-role">Sinh viên</div>
							</div>
							<button className="edit-button">
								<i className="material-icons">edit</i>
								Chỉnh sửa
							</button>
						</div>

						<div className="info-grid">
							<div className="info-item">
								<div className="info-label">Email</div>
								<div className="info-value">nguyenvana@hcmut.edu.vn</div>
							</div>
							<div className="info-item">
								<div className="info-label">Khoa</div>
								<div className="info-value">Khoa Khoa học và Kỹ thuật Máy tính</div>
							</div>
							<div className="info-item">
								<div className="info-label">Lớp</div>
								<div className="info-value">K2022 - Lớp KTPM02</div>
							</div>
							<div className="info-item">
								<div className="info-label">Ngày sinh</div>
								<div className="info-value">15/03/2004</div>
							</div>
						</div>
					</section>

					{/* <!-- Professional Info Section --> */}
					<section className="professional-section">
						<h3 className="section-title">
							<i className="material-icons">work</i>
							Chuyên môn và Lĩnh vực quan tâm
						</h3>

						<div className="editable-field">
							<div className="info-label">Chuyên môn chính</div>
							<input type="text" value="Khoa học máy tính, Kỹ thuật phần mềm" />
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
							<textarea>Trí tuệ nhân tạo, Học máy, Phát triển ứng dụng web, Phân tích dữ liệu</textarea>
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
					</section>

					{/* <!-- Session History Section --> */}
					<section className="history-section">
						<h3 className="section-title">
							<i className="material-icons">history</i>
							Lịch sử các buổi học
						</h3>

						<div className="history-item">
							<div className="history-info">
								<div className="history-title">Toán cao cấp</div>
								<div className="history-meta">
									<div className="history-meta-item">
										<i className="material-icons">person</i>
										<span>Trần Thị Bình</span>
									</div>
									<div className="history-meta-item">
										<i className="material-icons">event</i>
										<span>20/10/2025</span>
									</div>
									<div className="history-meta-item">
										<i className="material-icons">schedule</i>
										<span>14:00 - 16:00</span>
									</div>
								</div>
							</div>
							<div className="history-rating">
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star_half</i>
							</div>
						</div>

						<div className="history-item">
							<div className="history-info">
								<div className="history-title">Lập trình cơ bản</div>
								<div className="history-meta">
									<div className="history-meta-item">
										<i className="material-icons">person</i>
										<span>Lê Văn Cường</span>
									</div>
									<div className="history-meta-item">
										<i className="material-icons">event</i>
										<span>15/10/2025</span>
									</div>
									<div className="history-meta-item">
										<i className="material-icons">schedule</i>
										<span>10:00 - 12:00</span>
									</div>
								</div>
							</div>
							<div className="history-rating">
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
							</div>
						</div>

						<div className="history-item">
							<div className="history-info">
								<div className="history-title">Cấu trúc dữ liệu</div>
								<div className="history-meta">
									<div className="history-meta-item">
										<i className="material-icons">person</i>
										<span>Phạm Thị D</span>
									</div>
									<div className="history-meta-item">
										<i className="material-icons">event</i>
										<span>10/10/2025</span>
									</div>
									<div className="history-meta-item">
										<i className="material-icons">schedule</i>
										<span>9:00 - 11:00</span>
									</div>
								</div>
							</div>
							<div className="history-rating">
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star_border</i>
							</div>
						</div>
					</section>

					{/* <!-- Rating Section --> */}
					<section className="rating-section">
						<h3 className="section-title">
							<i className="material-icons">star</i>
							Đánh giá từ người khác
						</h3>

						<div className="rating-summary">
							<div className="rating-average">
								<div className="rating-number">4.7</div>
								<div className="rating-stars">
									<i className="material-icons">star</i>
									<i className="material-icons">star</i>
									<i className="material-icons">star</i>
									<i className="material-icons">star</i>
									<i className="material-icons">star_half</i>
								</div>
								<div className="rating-count">15 đánh giá</div>
							</div>

							<div className="rating-bars">
								<div className="rating-bar-item">
									<div className="rating-bar-label">5</div>
									<div className="rating-bar-container">
										<div className="rating-bar" style={{ width: '0%' }}></div>
									</div>
									<div className="rating-bar-count">9</div>
								</div>
								<div className="rating-bar-item">
									<div className="rating-bar-label">4</div>
									<div className="rating-bar-container">
										<div className="rating-bar" style={{ width: '0%' }}></div>
									</div>
									<div className="rating-bar-count">4</div>
								</div>
								<div className="rating-bar-item">
									<div className="rating-bar-label">3</div>
									<div className="rating-bar-container">
										<div className="rating-bar" style={{ width: '0%' }}></div>
									</div>
									<div className="rating-bar-count">2</div>
								</div>
								<div className="rating-bar-item">
									<div className="rating-bar-label">2</div>
									<div className="rating-bar-container">
										<div className="rating-bar" style={{ width: '0%' }}></div>
									</div>
									<div className="rating-bar-count">0</div>
								</div>
								<div className="rating-bar-item">
									<div className="rating-bar-label">1</div>
									<div className="rating-bar-container">
										<div className="rating-bar" style={{ width: '0%' }}></div>
									</div>
									<div className="rating-bar-count">0</div>
								</div>
							</div>
						</div>

						<div className="review-item">
							<div className="review-header">
								<div className="review-author">Trần Thị Bình</div>
								<div className="review-date">20/10/2025</div>
							</div>
							<div className="review-rating">
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star_half</i>
							</div>
							<div className="review-content">
								An rất nhiệt tình và có kiến thức sâu về Toán cao cấp. Em đã hiểu rõ hơn về các khái niệm phức tạp sau
								buổi học.
							</div>
						</div>

						<div className="review-item">
							<div className="review-header">
								<div className="review-author">Lê Văn Cường</div>
								<div className="review-date">15/10/2025</div>
							</div>
							<div className="review-rating">
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
								<i className="material-icons">star</i>
							</div>
							<div className="review-content">
								Rất hài lòng với buổi học. An giải thích rất rõ ràng và có nhiều ví dụ thực tế giúp em dễ hiểu.
							</div>
						</div>
					</section>

					{/* <!-- Save Button --> */}
					<div className="save-button-container">
						<button className="save-button">
							<i className="material-icons">save</i>
							Lưu thay đổi
						</button>
					</div>

					{/* <!-- Footer --> */}
					<footer className="footer">
						<p>© 2025 Tutor Support System. Đã đăng ký bản quyền.</p>
						<p>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH - TRƯƠNG ĐẠI HỌC BÁCH KHOA</p>
					</footer>
				</div>
			</div>
		</>
	);
};
