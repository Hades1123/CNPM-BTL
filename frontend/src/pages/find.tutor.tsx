import '@/styles/findTutor.css';
export const FindTutorPage = () => {
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
					<h1 className="page-title">Tìm kiếm và Đăng ký Tutor</h1>

					{/* <!-- Search Section --> */}
					<section className="search-section">
						<div className="search-bar">
							<input type="text" className="search-input" placeholder="Tìm kiếm theo tên, môn học..." />
							<button className="search-button">
								<i className="material-icons">search</i>
								Tìm kiếm
							</button>
						</div>

						<div className="filter-section">
							<div className="filter-group">
								<label className="filter-label">Môn học</label>
								<select className="filter-select">
									<option>Tất cả</option>
									<option>Toán cao cấp</option>
									<option>Lập trình cơ bản</option>
									<option>Cấu trúc dữ liệu</option>
									<option>Kỹ thuật phần mềm</option>
									<option>Trí tuệ nhân tạo</option>
								</select>
							</div>

							<div className="filter-group">
								<label className="filter-label">Chuyên môn</label>
								<select className="filter-select">
									<option>Tất cả</option>
									<option>Khoa học máy tính</option>
									<option>Kỹ thuật phần mềm</option>
									<option>Hệ thống thông tin</option>
									<option>Mạng máy tính</option>
								</select>
							</div>

							<div className="filter-group">
								<label className="filter-label">Thời gian</label>
								<select className="filter-select">
									<option>Tất cả</option>
									<option>Sáng (7h-12h)</option>
									<option>Chiều (12h-18h)</option>
									<option>Tối (18h-22h)</option>
								</select>
							</div>

							<div className="filter-group">
								<label className="filter-label">Đánh giá</label>
								<select className="filter-select">
									<option>Tất cả</option>
									<option>5 sao</option>
									<option>4 sao trở lên</option>
									<option>3 sao trở lên</option>
								</select>
							</div>
						</div>
					</section>

					{/* <!-- Tutor List Section --> */}
					<section className="tutor-list-section">
						<div className="section-header">
							<h2 className="section-title">Danh sách Tutor</h2>
							<select className="sort-dropdown">
								<option>Sắp xếp theo: Đánh giá cao nhất</option>
								<option>Sắp xếp theo: Kinh nghiệm nhiều nhất</option>
								<option>Sắp xếp theo: Giá thấp nhất</option>
							</select>
						</div>

						{/* <!-- Tutor Card 1 --> */}
						<div className="tutor-card">
							<img src="https://sfile.chatglm.cn/images-ppt/aa7eaf65d023.jpg" alt="Tutor" className="tutor-avatar" />
							<div className="tutor-info">
								<h3 className="tutor-name">Nguyễn Văn An</h3>
								<div className="tutor-subject">Toán cao cấp, Lập trình cơ bản</div>
								<p className="tutor-bio">
									Có 5 năm kinh nghiệm giảng dạy, chuyên sâu về các môn toán cao cấp và lập trình cơ bản. Phương pháp
									giảng dạy rõ ràng, dễ hiểu.
								</p>
								<div className="tutor-meta">
									<div className="tutor-meta-item">
										<i className="material-icons">star</i>
										<span>4.8 (32 đánh giá)</span>
									</div>
									<div className="tutor-meta-item">
										<i className="material-icons">schedule</i>
										<span>5 năm kinh nghiệm</span>
									</div>
									<div className="tutor-meta-item">
										<i className="material-icons">people</i>
										<span>Đã dạy 120 sinh viên</span>
									</div>
								</div>
								<div className="tutor-actions">
									{/* onClick="openModal()" */}
									<button className="tutor-button view-profile-btn">Xem hồ sơ</button>
									{/* onClick="openModal()" */}
									<button className="tutor-button book-session-btn">Đăng ký buổi học</button>
								</div>
							</div>
						</div>

						{/* <!-- Tutor Card 2 --> */}
						<div className="tutor-card">
							<img src="https://sfile.chatglm.cn/images-ppt/23a3a1c921c8.jpeg" alt="Tutor" className="tutor-avatar" />
							<div className="tutor-info">
								<h3 className="tutor-name">Trần Thị Bình</h3>
								<div className="tutor-subject">Cấu trúc dữ liệu, Kỹ thuật phần mềm</div>
								<p className="tutor-bio">
									Chuyên gia về cấu trúc dữ liệu và kỹ thuật phần mềm với 7 năm kinh nghiệm. Luôn cập nhật các công nghệ
									mới nhất.
								</p>
								<div className="tutor-meta">
									<div className="tutor-meta-item">
										<i className="material-icons">star</i>
										<span>4.9 (45 đánh giá)</span>
									</div>
									<div className="tutor-meta-item">
										<i className="material-icons">schedule</i>
										<span>7 năm kinh nghiệm</span>
									</div>
									<div className="tutor-meta-item">
										<i className="material-icons">people</i>
										<span>Đã dạy 180 sinh viên</span>
									</div>
								</div>
								<div className="tutor-actions">
									{/* onClick="openModal()" */}
									<button className="tutor-button view-profile-btn">Xem hồ sơ</button>
									{/* onClick="openModal()" */}
									<button className="tutor-button book-session-btn">Đăng ký buổi học</button>
								</div>
							</div>
						</div>

						{/* <!-- Tutor Card 3 --> */}
						<div className="tutor-card">
							<img src="https://sfile.chatglm.cn/images-ppt/a8a24ee0becc.jpg" alt="Tutor" className="tutor-avatar" />
							<div className="tutor-info">
								<h3 className="tutor-name">Lê Văn Cường</h3>
								<div className="tutor-subject">Trí tuệ nhân tạo, Học máy</div>
								<p className="tutor-bio">
									Chuyên gia về trí tuệ nhân tạo và học máy với các dự án thực tế. Giảng dạy kết hợp lý thuyết và thực
									hành.
								</p>
								<div className="tutor-meta">
									<div className="tutor-meta-item">
										<i className="material-icons">star</i>
										<span>4.7 (28 đánh giá)</span>
									</div>
									<div className="tutor-meta-item">
										<i className="material-icons">schedule</i>
										<span>4 năm kinh nghiệm</span>
									</div>
									<div className="tutor-meta-item">
										<i className="material-icons">people</i>
										<span>Đã dạy 95 sinh viên</span>
									</div>
								</div>
								<div className="tutor-actions">
									{/* onClick="openModal()" */}
									<button className="tutor-button view-profile-btn">Xem hồ sơ</button>
									{/* onClick="openModal()" */}
									<button className="tutor-button book-session-btn">Đăng ký buổi học</button>
								</div>
							</div>
						</div>
					</section>

					{/* <!-- Schedule Section --> */}

					{/* <!-- Footer --> */}
					<footer className="footer">
						<p>© 2025 Tutor Support System. Đã đăng ký bản quyền.</p>
						<p>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH - TRƯƠNG ĐẠI HỌC BÁCH KHOA</p>
					</footer>
				</div>

				{/* <!-- Modal for Tutor Profile and Booking --> */}
				<div id="tutorModal" className="modal">
					<div className="modal-content">
						{/* onClick="closeModal()" */}
						<button className="modal-close">
							<i className="material-icons">close</i>
						</button>

						<h2 className="modal-title">Hồ sơ Tutor & Đăng ký buổi học</h2>

						<div className="tutor-profile">
							<img
								src="https://sfile.chatglm.cn/images-ppt/aa7eaf65d023.jpg"
								alt="Tutor"
								className="tutor-profile-avatar"
							/>
							<div className="tutor-profile-info">
								<h3 className="tutor-profile-name">Nguyễn Văn An</h3>
								<div className="tutor-profile-subject">Toán cao cấp, Lập trình cơ bản</div>
								<div className="tutor-profile-rating">
									<div className="rating-stars">
										<i className="material-icons">star</i>
										<i className="material-icons">star</i>
										<i className="material-icons">star</i>
										<i className="material-icons">star</i>
										<i className="material-icons">star_half</i>
									</div>
									<span>4.8 (32 đánh giá)</span>
								</div>
								<p className="tutor-profile-bio">
									Có 5 năm kinh nghiệm giảng dạy, chuyên sâu về các môn toán cao cấp và lập trình cơ bản. Phương pháp
									giảng dạy rõ ràng, dễ hiểu. Tốt nghiệp Đại học Bách Khoa TP.HCM, chuyên ngành Khoa học Máy tính.
								</p>
							</div>
						</div>

						<form className="booking-form">
							<div className="form-group">
								<label className="form-label">Chọn môn học</label>
								<select className="form-select">
									<option>Toán cao cấp</option>
									<option>Lập trình cơ bản</option>
								</select>
							</div>

							<div className="form-group">
								<label className="form-label">Chọn ngày</label>
								<input type="date" className="form-input" />
							</div>

							<div className="form-group">
								<label className="form-label">Chọn khung giờ</label>
								<div className="time-slots">
									<div className="time-slot">7:00 - 8:00</div>
									<div className="time-slot">8:00 - 9:00</div>
									<div className="time-slot">9:00 - 10:00</div>
									<div className="time-slot">10:00 - 11:00</div>
									<div className="time-slot">11:00 - 12:00</div>
									<div className="time-slot">13:00 - 14:00</div>
									<div className="time-slot">14:00 - 15:00</div>
									<div className="time-slot">15:00 - 16:00</div>
									<div className="time-slot">16:00 - 17:00</div>
								</div>
							</div>

							<div className="form-group">
								<label className="form-label">Nội dung cần hỗ trợ</label>
								<textarea
									className="form-textarea"
									placeholder="Mô tả ngắn gọn về nội dung bạn cần hỗ trợ..."
								></textarea>
							</div>

							<div className="form-actions">
								{/* onClick="closeModal()" */}
								<button type="button" className="form-button cancel-button">
									Hủy
								</button>
								<button type="submit" className="form-button submit-button">
									Đăng ký buổi học
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
