import '@/styles/landing.css';
export const LandingPage = () => {
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
							<div className="nav-item">Tính năng</div>
							<div className="nav-item">Lợi ích</div>
							<div className="nav-item">Liên hệ</div>
						</nav>
					</header>

					{/* <!-- Hero Section --> */}
					<section className="hero">
						<h1 className="hero-title">Hệ thống Hỗ trợ Tutor/Mentor</h1>
						<p className="hero-subtitle">
							Nền tảng kỹ thuật số hiện đại và tập trung, giúp quản lý và vận hành hiệu quả chương trình Tutor/Mentor
							tại Trường Đại học Bách Khoa Thành phố Hồ Chí Minh
						</p>
						<img
							src="https://sfile.chatglm.cn/images-ppt/5964e2578c33.jpg"
							alt="Sinh viên và Tutor"
							className="hero-image"
						/>
						<button className="cta-button">Bắt đầu ngay</button>
					</section>

					{/* <!-- Features Section --> */}
					<section className="section">
						<h2 className="section-title">Tính năng nổi bật</h2>
						<div className="features-grid">
							<div className="feature-card">
								<div className="feature-icon">
									<i className="material-icons">search</i>
								</div>
								<h3 className="feature-title">Tìm kiếm và lựa chọn Tutor</h3>
								<p className="feature-description">
									Cho phép sinh viên tìm kiếm và lọc danh sách tutor để chọn người hướng dẫn phù hợp nhất với nhu cầu
									của mình.
								</p>
							</div>
							<div className="feature-card">
								<div className="feature-icon">
									<i className="material-icons">event</i>
								</div>
								<h3 className="feature-title">Quản lý lịch học</h3>
								<p className="feature-description">
									Cung cấp công cụ trực quan để xem lịch rảnh của tutor, đặt lịch, hủy lịch cho các buổi hẹn.
								</p>
							</div>
							<div className="feature-card">
								<div className="feature-icon">
									<i className="material-icons">rate_review</i>
								</div>
								<h3 className="feature-title">Đánh giá và phản hồi</h3>
								<p className="feature-description">
									Cho phép sinh viên và tutor gửi đánh giá về chất lượng buổi học, góp phần cải thiện chất lượng giảng
									dạy.
								</p>
							</div>
							<div className="feature-card">
								<div className="feature-icon">
									<i className="material-icons">analytics</i>
								</div>
								<h3 className="feature-title">Phân tích và báo cáo</h3>
								<p className="feature-description">
									Hệ thống tự động tổng hợp báo cáo, phân tích dữ liệu đánh giá và theo dõi tiến độ học tập của sinh
									viên.
								</p>
							</div>
						</div>
					</section>

					{/* <!-- Benefits Section --> */}
					<section className="section">
						<h2 className="section-title">Lợi ích cho người dùng</h2>
						<div className="benefits-container">
							<div className="benefits-tabs">
								{/* onClick="switchTab('student')" */}
								<div className="benefit-tab active">Sinh viên</div>
								{/* onClick="switchTab('tutor')" */}
								<div className="benefit-tab">Tutor</div>
								{/* onClick="switchTab('staff')" */}
								<div className="benefit-tab">Nhân viên</div>
							</div>

							<div id="student" className="benefit-content active">
								<ul className="benefit-list">
									<li className="benefit-item">
										<i className="material-icons">check_circle</i>
										<span>Tìm kiếm và lựa chọn tutor phù hợp với nhu cầu học tập</span>
									</li>
									<li className="benefit-item">
										<i className="material-icons">check_circle</i>
										<span>Đặt và quản lý lịch hẹn linh hoạt, tiện lợi</span>
									</li>
									<li className="benefit-item">
										<i className="material-icons">check_circle</i>
										<span>Nhận tài liệu học tập và bài tập từ tutor</span>
									</li>
									<li className="benefit-item">
										<i className="material-icons">check_circle</i>
										<span>Gửi phản hồi và đánh giá chất lượng buổi học</span>
									</li>
								</ul>
							</div>

							<div id="tutor" className="benefit-content">
								<ul className="benefit-list">
									<li className="benefit-item">
										<i className="material-icons">check_circle</i>
										<span>Thiết lập và quản lý khung giờ làm việc linh hoạt</span>
									</li>
									<li className="benefit-item">
										<i className="material-icons">check_circle</i>
										<span>Quản lý lịch hẹn và xác nhận yêu cầu từ sinh viên</span>
									</li>
									<li className="benefit-item">
										<i className="material-icons">check_circle</i>
										<span>Đăng tải tài liệu và bài tập cho sinh viên</span>
									</li>
									<li className="benefit-item">
										<i className="material-icons">check_circle</i>
										<span>Ghi nhận tiến độ học tập của sinh viên</span>
									</li>
								</ul>
							</div>

							<div id="staff" className="benefit-content">
								<ul className="benefit-list">
									<li className="benefit-item">
										<i className="material-icons">check_circle</i>
										<span>Quản lý hồ sơ sinh viên và phân bổ giảng viên</span>
									</li>
									<li className="benefit-item">
										<i className="material-icons">check_circle</i>
										<span>Phân tích dữ liệu đánh giá và tạo báo cáo</span>
									</li>
									<li className="benefit-item">
										<i className="material-icons">check_circle</i>
										<span>Thực hiện cộng điểm rèn luyện và xét học bổng</span>
									</li>
									<li className="benefit-item">
										<i className="material-icons">check_circle</i>
										<span>Tổng hợp kết quả chương trình dạy của tutor</span>
									</li>
								</ul>
							</div>
						</div>
					</section>

					{/* <!-- System Interface Section --> */}
					<section className="section">
						<h2 className="section-title">Giao diện hệ thống</h2>
						<div className="interface-container">
							<img
								src="https://sfile.chatglm.cn/images-ppt/4732a5701342.jpg"
								alt="Giao diện hệ thống"
								className="interface-image"
							/>
							<p className="interface-description">
								Giao diện hiện đại, trực quan, dễ sử dụng cho cả sinh viên và tutor. Hệ thống hỗ trợ song ngữ Anh -
								Việt, tương thích tốt với các trình duyệt phổ biến.
							</p>
						</div>
					</section>

					{/* <!-- Analytics Section --> */}
					<section className="section">
						<h2 className="section-title">Phân tích dữ liệu</h2>
						<div className="analytics-container">
							<img
								src="https://sfile.chatglm.cn/images-ppt/52dc6250b5ad.jpg"
								alt="Phân tích dữ liệu"
								className="analytics-image"
							/>
							<p className="analytics-description">
								Hệ thống cung cấp công cụ phân tích dữ liệu mạnh mẽ, giúp quản lý đánh giá hiệu quả chương trình và đưa
								ra quyết định chiến lược.
							</p>
						</div>
					</section>

					{/* <!-- Footer --> */}
					<footer className="footer">
						<div className="footer-content">
							<div className="footer-column">
								<h3 className="footer-title">Về dự án</h3>
								<ul className="footer-links">
									<li className="footer-link">Giới thiệu</li>
									<li className="footer-link">Tính năng</li>
									<li className="footer-link">Lợi ích</li>
								</ul>
							</div>
							<div className="footer-column">
								<h3 className="footer-title">Hỗ trợ</h3>
								<ul className="footer-links">
									<li className="footer-link">Hướng dẫn sử dụng</li>
									<li className="footer-link">Câu hỏi thường gặp</li>
									<li className="footer-link">Liên hệ</li>
								</ul>
							</div>
							<div className="footer-column">
								<h3 className="footer-title">Liên kết</h3>
								<ul className="footer-links">
									<li className="footer-link">HCMUT_SSO</li>
									<li className="footer-link">HCMUT_DATACORE</li>
									<li className="footer-link">HCMUT_LIBRARY</li>
								</ul>
							</div>
						</div>
						<div className="footer-bottom">
							<p>&copy; 2025 Tutor Support System. Đã đăng ký bản quyền.</p>
						</div>
					</footer>

					<div className="university-info">
						<p>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH - TRƯƠNG ĐẠI HỌC BÁCH KHOA</p>
						<p>KHOA KHOA HỌC VÀ KỸ THUẬT MÁY TÍNH</p>
					</div>
				</div>
			</div>
		</>
	);
};

{
	/* <body>
    

    <script>
        function switchTab(tabName) {
            // Remove active classNameName from all tabs and contents
            const tabs = document.querySelectorAll('.benefit-tab');
            const contents = document.querySelectorAll('.benefit-content');

            tabs.forEach(tab => tab.classNameNameList.remove('active'));
            contents.forEach(content => content.classNameNameList.remove('active'));

            // Add active classNameName to selected tab and content
            event.target.classNameNameList.add('active');
            document.getElementById(tabName).classNameNameList.add('active');
        }
    </script>
</body>

</html> */
}
