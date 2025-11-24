import '@/styles/login.css';
export const LoginPage = () => {
	return (
		<div className="poster-container">
			{/* <!-- Background Shapes --> */}
			<div className="background-shape shape-1"></div>
			<div className="background-shape shape-2"></div>

			<div className="content">
				{/* <!-- Header --> */}
				<div className="header-content">
					<header className="header">
						{/* <!-- Navigation Links -->
                    <div className="header-nav">
                        <a href="#">Trang chủ</a>
                        <a href="#">Tìm tutor</a>
                        <a href="#">Lịch học</a>
                        <a href="#">Hỗ trợ</a>
                    </div> --> */}

						<div className="logo">
							<img src="https://sfile.chatglm.cn/images-ppt/47f595050ee8.svg" alt="HCMUT Logo" className="logo-image" />
							<div className="logo-text">Tutor Support System</div>
						</div>
						<p className="subtitle">
							Hệ thống hỗ trợ và quản lý chương trình Tutor/Mentor tại Trường Đại học Bách Khoa TP.HCM
						</p>

						{/* <!-- Stats --> */}
						<div className="header-stats">
							<div className="stat-item">
								<i className="material-icons">people</i>
								<span>500+ Tutors</span>
							</div>
							<div className="stat-item">
								<i className="material-icons">school</i>
								<span>10,000+ Sinh viên</span>
							</div>
							<div className="stat-item">
								<i className="material-icons">event</i>
								<span>1,000+ Buổi học/tuần</span>
							</div>
						</div>

						{/* <!-- Actions --> */}
						<div className="header-actions">
							<div className="contact-info">
								<i className="material-icons" style={{ fontSize: 16 }}>
									phone
								</i>
								<span>Hotline: (028) 3864 7256</span>
							</div>
							<div className="lang-switch">
								<i className="material-icons" style={{ fontSize: 16 }}>
									language
								</i>
								<span>Tiếng Việt</span>
							</div>
						</div>
					</header>

					{/* <!-- Login Form --> */}
					<div className="login-container">
						<h2 className="login-title">Đăng nhập</h2>

						<form>
							<div className="form-group">
								<label className="form-label">Tên đăng nhập</label>
								<div className="input-icon">
									<input type="text" className="form-input" placeholder="Mã số sinh viên hoặc email" />
									<i className="material-icons">person</i>
								</div>
							</div>

							<div className="form-group">
								<label className="form-label">Mật khẩu</label>
								<div className="input-icon">
									<input type="password" className="form-input" placeholder="Nhập mật khẩu" />
									<i className="material-icons">visibility_off</i>
								</div>
							</div>

							{/* <!-- <div className="form-group">
                            <label className="form-label">Đăng nhập với vai trò</label>
                            <div className="role-selector">
                                <div className="role-option active">Sinh viên</div>
                                <div className="role-option">Tutor</div>
                                <div className="role-option">Nhân viên</div>
                            </div>
                        </div> --> */}

							<div className="remember-forgot">
								<div className="remember-me">
									<input type="checkbox" id="remember" />
									<label htmlFor="remember">Ghi nhớ đăng nhập</label>
								</div>
								<a href="#" className="forgot-password">
									Quên mật khẩu?
								</a>
							</div>

							<button type="submit" className="login-button">
								<i className="material-icons">login</i>
								Đăng nhập
							</button>
						</form>

						<div className="divider">
							<div className="divider-line"></div>
							<div className="divider-text">HOẶC</div>
							<div className="divider-line"></div>
						</div>

						<div className="sso-login">
							<div className="sso-icon">
								<i className="material-icons">school</i>
							</div>
							<div className="sso-text">Đăng nhập với HCMUT_SSO</div>
						</div>

						<div className="help-links">
							<a href="#" className="help-link">
								Trợ giúp
							</a>
							<a href="#" className="help-link">
								Hướng dẫn sử dụng
							</a>
							<a href="#" className="help-link">
								Liên hệ hỗ trợ
							</a>
						</div>

						<div className="security-info">
							<i className="material-icons">security</i>
							<div className="security-text">
								Hệ thống sử dụng HCMUT_SSO để xác thực người dùng. Mọi thông tin đăng nhập được mã hóa và bảo mật theo
								tiêu chuẩn của trường.
							</div>
						</div>
					</div>
				</div>

				{/* <!-- Footer --> */}
				<footer className="footer">
					<p>© 2025 Tutor Support System. Đã đăng ký bản quyền.</p>
					<p>ĐẠI HỌC QUỐC GIA THÀNH PHỐ HỒ CHÍ MINH - TRƯƠNG ĐẠI HỌC BÁCH KHOA</p>
				</footer>
			</div>
		</div>
	);
};
