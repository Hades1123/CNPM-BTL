import '@/styles/feedback.css';
import { useNavigate } from 'react-router';

export const FeedBackPage = () => {
	const navigate = useNavigate();

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
							<button className="nav-item" onClick={() => navigate('/')}>
								Trang chủ
							</button>
							<button className="nav-item" onClick={() => navigate('/findTutor')}>
								Tìm tutor
							</button>
							<button className="nav-item" onClick={() => navigate('/myCourse')}>
								Lịch học
							</button>
							<button className="nav-item" onClick={() => navigate('/profile')}>
								Tài khoản
							</button>
						</nav>
					</header>

					{/* <!-- Page Title --> */}
					<h1 className="page-title">Đánh giá Buổi học</h1>

					{/* <!-- Session Info Card --> */}
					<div className="session-info-card">
						<div className="session-icon">
							<i className="material-icons">event</i>
						</div>
						<div className="session-details">
							<h2 className="session-title">Toán cao cấp</h2>
							<div className="session-meta">
								<div className="session-meta-item">
									<i className="material-icons">person</i>
									<span>Nguyễn Văn An</span>
								</div>
								<div className="session-meta-item">
									<i className="material-icons">schedule</i>
									<span>Thứ 5, 24/10/2025, 14:00-16:00</span>
								</div>
								<div className="session-meta-item">
									<i className="material-icons">location_on</i>
									<span>Phòng A301</span>
								</div>
							</div>
						</div>
					</div>

					{/* <!-- Feedback Form --> */}
					<div className="feedback-form" id="feedbackForm">
						<div className="form-section">
							<h3 className="section-title">
								<i className="material-icons">star</i>
								Đánh giá chất lượng buổi học
							</h3>

							<div className="rating-item">
								<div className="rating-label">Chất lượng giảng dạy</div>
								<div className="rating-stars" data-rating="quality">
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
								</div>
							</div>

							<div className="rating-item">
								<div className="rating-label">Sự chuẩn bị của tutor</div>
								<div className="rating-stars" data-rating="preparation">
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
								</div>
							</div>

							<div className="rating-item">
								<div className="rating-label">Khả năng truyền đạt kiến thức</div>
								<div className="rating-stars" data-rating="communication">
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
								</div>
							</div>

							<div className="rating-item">
								<div className="rating-label">Tính hữu ích của buổi học</div>
								<div className="rating-stars" data-rating="usefulness">
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
								</div>
							</div>

							<div className="rating-item">
								<div className="rating-label">Sự tương tác và hỗ trợ</div>
								<div className="rating-stars" data-rating="interaction">
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
									<i className="material-icons star">star_border</i>
								</div>
							</div>
						</div>

						<div className="form-section">
							<h3 className="section-title">
								<i className="material-icons">comment</i>
								Nhận xét chi tiết
							</h3>

							<div className="form-group">
								<label style={{ display: 'block', marginBottom: 10, fontWeight: 500 }}>Điểm mạnh của buổi học</label>
								<textarea
									className="text-area"
									placeholder="Hãy chia sẻ những điểm bạn thấy tốt nhất trong buổi học này..."
								></textarea>
							</div>

							<div className="form-group" style={{ marginTop: 20 }}>
								<label style={{ display: 'block', marginBottom: 10, fontWeight: 500 }}>Điểm cần cải thiện</label>
								<textarea
									className="text-area"
									placeholder="Góp ý của bạn sẽ giúp chúng tôi cải thiện chất lượng buổi học..."
								></textarea>
							</div>
						</div>

						<div className="form-actions">
							{/* onclick="resetForm()" */}
							<button className="form-button secondary-button">Làm lại</button>
							{/* onclick="submitFeedback()" */}
							<button className="form-button primary-button">Gửi đánh giá</button>
						</div>
					</div>

					{/* <!-- Thank You Message --> */}
					<div className="thank-you-message" id="thankYouMessage">
						<div className="thank-you-icon">
							<i className="material-icons">check_circle</i>
						</div>
						<h2 className="thank-you-title">Cảm ơn bạn đã đánh giá!</h2>
						<p className="thank-you-text">Phản hồi của bạn rất quan trọng để chúng tôi cải thiện chất lượng dịch vụ.</p>
						{/* onclick="backToHome()" */}
						<button className="form-button primary-button">Về trang chủ</button>
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
