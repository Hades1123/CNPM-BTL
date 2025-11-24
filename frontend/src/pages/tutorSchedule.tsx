import '@/styles/tutor.css';

export const TutorPage = () => {
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
							<div className="nav-item">Lịch của tôi</div>
							<div className="nav-item">Buổi học</div>
							<div className="nav-item">Tài khoản</div>
						</nav>
					</header>

					{/* <!-- Page Title --> */}
					<h1 className="page-title">Thiết lập Lịch rảnh</h1>

					{/* <!-- Simple Calendar Section --> */}
					<section className="calendar-section">
						<div className="calendar-header">
							<h2 className="calendar-title">Lịch Tuần này (20/10 - 26/10/2025)</h2>
							<div className="calendar-controls">
								<button className="calendar-button active">Tuần</button>
								<button className="calendar-button">Tháng</button>
								<div className="calendar-nav">
									<button className="calendar-nav-button">
										<i className="material-icons">chevron_left</i>
									</button>
									<button className="calendar-nav-button">
										<i className="material-icons">chevron_right</i>
									</button>
								</div>
							</div>
						</div>

						<div className="weekly-schedule">
							{/* Header Row for Days */}
							<div className="week-header">
								<div className="day-col-header">
									<span className="day-name">Thứ 2</span>
									<span className="day-date">21/10</span>
								</div>
								<div className="day-col-header">
									<span className="day-name">Thứ 3</span>
									<span className="day-date">22/10</span>
								</div>
								<div className="day-col-header">
									<span className="day-name">Thứ 4</span>
									<span className="day-date">23/10</span>
								</div>
								<div className="day-col-header">
									<span className="day-name">Thứ 5</span>
									<span className="day-date">24/10</span>
								</div>
								<div className="day-col-header">
									<span className="day-name">Thứ 6</span>
									<span className="day-date">25/10</span>
								</div>
							</div>

							{/* Grid for Time Slots */}
							<div className="week-grid">
								{/* Monday Column */}
								<div className="day-column">
									<div className="time-slot slot-available">
										<span className="slot-time">8:00 - 9:30</span>
										<span className="slot-label">Rảnh</span>
									</div>
									<div className="time-slot slot-unavailable">
										<span className="slot-time">9:30 - 11:00</span>
										<span className="slot-label">Bận</span>
									</div>
									<div className="time-slot slot-available">
										<span className="slot-time">14:00 - 15:30</span>
										<span className="slot-label">Rảnh</span>
									</div>
									<div className="time-slot slot-booked">
										<span className="slot-time">15:30 - 17:00</span>
										<span className="slot-label">Đã ĐK</span>
									</div>
								</div>

								{/* Tuesday Column */}
								<div className="day-column">
									<div className="time-slot slot-available">
										<span className="slot-time">8:00 - 9:30</span>
										<span className="slot-label">Rảnh</span>
									</div>
									<div className="time-slot slot-booked">
										<span className="slot-time">10:00 - 11:30</span>
										<span className="slot-label">Đã ĐK</span>
									</div>
									<div className="time-slot slot-available">
										<span className="slot-time">14:00 - 15:30</span>
										<span className="slot-label">Rảnh</span>
									</div>
									<div className="time-slot slot-available">
										<span className="slot-time">15:30 - 17:00</span>
										<span className="slot-label">Rảnh</span>
									</div>
								</div>

								{/* Wednesday Column */}
								<div className="day-column">
									<div className="time-slot slot-unavailable">
										<span className="slot-time">8:00 - 10:00</span>
										<span className="slot-label">Bận</span>
									</div>
									<div className="time-slot slot-available">
										<span className="slot-time">10:00 - 11:30</span>
										<span className="slot-label">Rảnh</span>
									</div>
									<div className="time-slot slot-booked">
										<span className="slot-time">14:00 - 15:30</span>
										<span className="slot-label">Đã ĐK</span>
									</div>
									<div className="time-slot slot-available">
										<span className="slot-time">15:30 - 17:00</span>
										<span className="slot-label">Rảnh</span>
									</div>
								</div>

								{/* Thursday Column */}
								<div className="day-column">
									<div className="time-slot slot-available">
										<span className="slot-time">8:00 - 9:30</span>
										<span className="slot-label">Rảnh</span>
									</div>
									<div className="time-slot slot-booked">
										<span className="slot-time">10:00 - 11:30</span>
										<span className="slot-label">Đã ĐK</span>
									</div>
									<div className="time-slot slot-unavailable">
										<span className="slot-time">14:00 - 16:00</span>
										<span className="slot-label">Bận</span>
									</div>
								</div>

								{/* Friday Column */}
								<div className="day-column">
									<div className="time-slot slot-available">
										<span className="slot-time">8:00 - 9:30</span>
										<span className="slot-label">Rảnh</span>
									</div>
									<div className="time-slot slot-available">
										<span className="slot-time">9:30 - 11:00</span>
										<span className="slot-label">Rảnh</span>
									</div>
									<div className="time-slot slot-booked">
										<span className="slot-time">14:00 - 15:30</span>
										<span className="slot-label">Đã ĐK</span>
									</div>
								</div>
							</div>
						</div>
					</section>

					{/* <!-- Add Availability Section --> */}
					<section className="add-availability-section">
						<h2 className="section-title">Thêm lịch rảnh định kỳ</h2>

						<div className="form-row">
							<div className="form-group">
								<label className="form-label">Từ ngày</label>
								<input type="date" className="form-input" />
							</div>
							<div className="form-group">
								<label className="form-label">Đến ngày</label>
								<input type="date" className="form-input" />
							</div>
						</div>

						<div className="form-group">
							<label className="form-label">Lặp lại vào các ngày</label>
							<div className="weekdays-selector">
								<div className="weekday-checkbox">
									<input type="checkbox" id="monday" />
									<label htmlFor="monday">Thứ 2</label>
								</div>
								<div className="weekday-checkbox">
									<input type="checkbox" id="tuesday" />
									<label htmlFor="tuesday">Thứ 3</label>
								</div>
								<div className="weekday-checkbox">
									<input type="checkbox" id="wednesday" />
									<label htmlFor="wednesday">Thứ 4</label>
								</div>
								<div className="weekday-checkbox">
									<input type="checkbox" id="thursday" />
									<label htmlFor="thursday">Thứ 5</label>
								</div>
								<div className="weekday-checkbox">
									<input type="checkbox" id="friday" />
									<label htmlFor="friday">Thứ 6</label>
								</div>
								<div className="weekday-checkbox">
									<input type="checkbox" id="saturday" />
									<label htmlFor="saturday">Thứ 7</label>
								</div>
								<div className="weekday-checkbox">
									<input type="checkbox" id="sunday" />
									<label htmlFor="sunday">CN</label>
								</div>
							</div>
						</div>

						<div className="form-row">
							<div className="form-group">
								<label className="form-label">Thời gian bắt đầu</label>
								<input type="time" className="form-input" />
							</div>
							<div className="form-group">
								<label className="form-label">Thời gian kết thúc</label>
								<input type="time" className="form-input" />
							</div>
						</div>

						<div className="form-group">
							<label className="form-label">Số lượng sinh viên tối đa</label>
							<select className="form-select">
								<option>1 sinh viên</option>
								<option>2 sinh viên</option>
								<option>3 sinh viên</option>
								<option>4 sinh viên</option>
								<option>5 sinh viên</option>
							</select>
						</div>

						<div className="form-actions">
							<button className="form-button secondary-button">Hủy</button>
							<button className="form-button primary-button">Thêm lịch rảnh</button>
						</div>
					</section>

					{/* <!-- Session Requests Section --> */}
					<section className="session-requests-section">
						<h2 className="section-title">Yêu cầu buổi học mới</h2>

						<div className="request-card">
							<div className="request-header">
								<div className="request-title">Toán cao cấp</div>
								<div className="request-status status-pending">Chờ xác nhận</div>
							</div>
							<div className="request-info">
								<div className="request-info-item">
									<i className="material-icons">person</i>
									<span>Nguyễn Văn A</span>
								</div>
								<div className="request-info-item">
									<i className="material-icons">event</i>
									<span>Thứ 5, 24/10/2025</span>
								</div>
								<div className="request-info-item">
									<i className="material-icons">schedule</i>
									<span>14:00 - 16:00</span>
								</div>
							</div>
							<div className="request-message">
								Em cần hỗ trợ về phương pháp giải tích hàm nhiều biến, đặc biệt là phần đạo hàm riêng và tích phân kép.
							</div>
							<div className="request-actions">
								<button className="request-button accept-button">Chấp nhận</button>
								<button className="request-button reschedule-button">Dời lịch</button>
								<button className="request-button decline-button">Từ chối</button>
							</div>
						</div>

						<div className="request-card">
							<div className="request-header">
								<div className="request-title">Lập trình cơ bản</div>
								<div className="request-status status-pending">Chờ xác nhận</div>
							</div>
							<div className="request-info">
								<div className="request-info-item">
									<i className="material-icons">person</i>
									<span>Trần Thị B</span>
								</div>
								<div className="request-info-item">
									<i className="material-icons">event</i>
									<span>Thứ 3, 29/10/2025</span>
								</div>
								<div className="request-info-item">
									<i className="material-icons">schedule</i>
									<span>10:00 - 12:00</span>
								</div>
							</div>
							<div className="request-message">
								Em cần giúp đỡ về mảng và con trỏ trong ngôn ngữ C++. Em đã đọc tài liệu nhưng vẫn chưa hiểu rõ cách sử
								dụng.
							</div>
							<div className="request-actions">
								<button className="request-button accept-button">Chấp nhận</button>
								<button className="request-button reschedule-button">Dời lịch</button>
								<button className="request-button decline-button">Từ chối</button>
							</div>
						</div>
					</section>

					{/* <!-- Upcoming Sessions Section --> */}
					<section className="upcoming-sessions-section">
						<h2 className="section-title">Các buổi học sắp tới</h2>

						<div className="session-card">
							<div className="session-info">
								<div className="session-title">Cấu trúc dữ liệu</div>
								<div className="session-details">
									<div className="session-details-item">
										<i className="material-icons">person</i>
										<span>Lê Văn C</span>
									</div>
									<div className="session-details-item">
										<i className="material-icons">event</i>
										<span>Hôm nay, 15:00 - 17:00</span>
									</div>
									<div className="session-details-item">
										<i className="material-icons">location_on</i>
										<span>Phòng A301</span>
									</div>
								</div>
							</div>
							<div className="session-actions">
								<button className="request-button reschedule-button">Dời lịch</button>
								<button className="request-button decline-button">Hủy</button>
							</div>
						</div>

						<div className="session-card">
							<div className="session-info">
								<div className="session-title">Kỹ thuật phần mềm</div>
								<div className="session-details">
									<div className="session-details-item">
										<i className="material-icons">person</i>
										<span>Phạm Thị D</span>
									</div>
									<div className="session-details-item">
										<i className="material-icons">event</i>
										<span>Ngày mai, 9:00 - 11:00</span>
									</div>
									<div className="session-details-item">
										<i className="material-icons">location_on</i>
										<span>Phòng B205</span>
									</div>
								</div>
							</div>
							<div className="session-actions">
								<button className="request-button reschedule-button">Dời lịch</button>
								<button className="request-button decline-button">Hủy</button>
							</div>
						</div>
					</section>

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
