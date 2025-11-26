USE `cnpm`;
-- Password: Giả lập đã hash (ví dụ: dùng 'password123' cho tất cả)
INSERT INTO users (id, email, username, password, mssv, name, faculty, role) VALUES 
(1, 'tutor.hung@hcmut.edu.vn', 'tutor_hung', '12345', 'GV001', 'Nguyễn Thanh Hưng', 'KHMT', 'TUTOR'),
(2, 'tutor.lan@hcmut.edu.vn',  'tutor_lan',  '12345', 'GV002', 'Trần Thị Lan',      'KTMT', 'TUTOR'),
(3, 'sv.an@hcmut.edu.vn',      'sv_an',      '12345', '2010001', 'Lê Văn An',         'Điện - Điện tử', 'STUDENT'),
(4, 'sv.binh@hcmut.edu.vn',    'sv_binh',    '12345', '2010002', 'Phạm Thị Bình',     'Khoa học Máy tính', 'STUDENT'),
(5, 'sv.cuong@hcmut.edu.vn',   'sv_cuong',   '12345', '2010003', 'Hoàng Quốc Cường',  'Xây Dựng', 'STUDENT');
INSERT INTO sessions (id, title, description, startTime, endTime, location, maxStudents, tutorId, createdAt, updatedAt) VALUES 
(1, 'Lập trình Web (ReactJS)', 'Học cơ bản về React và NestJS', '2025-12-01 07:00:00', '2025-12-01 11:00:00', 'H6-301', 50, 1, NOW(), NOW()),
(2, 'NodeJS Backend Nâng cao', 'Kiến trúc Microservices',       '2025-12-03 07:00:00', '2025-12-03 11:00:00', 'Online Meet', 40, 1, NOW(), NOW()),
(3, 'Nhập môn Trí tuệ nhân tạo', 'Các thuật toán tìm kiếm',     '2025-12-02 13:00:00', '2025-12-02 16:00:00', 'H6-302', 45, 2, NOW(), NOW()),
(4, 'Machine Learning',        'Hồi quy tuyến tính',            '2025-12-04 13:00:00', '2025-12-04 16:00:00', 'H6-303', 30, 2, NOW(), NOW()),
(5, 'Đồ án Chuyên ngành',      'Hướng dẫn làm đồ án tốt nghiệp','2025-12-05 08:00:00', '2025-12-05 10:00:00', 'Văn phòng Khoa', 5, 1, NOW(), NOW());
INSERT INTO materials (id, fileName, fileUrl, sessionId, createdAt) VALUES 
(1, 'Slide Chuong 1.pdf',      'https://drive.google.com/file/d/slide1', 1, NOW()),
(2, 'Source Code Demo.zip',    'https://github.com/hcmut/demo',          1, NOW()),
(3, 'Microservices Guide.pdf', 'https://drive.google.com/file/d/micro',  2, NOW()),
(4, 'AI Introduction.pptx',    'https://drive.google.com/file/d/ai_intro',3, NOW()),
(5, 'Dataset Kaggle.csv',      'https://kaggle.com/dataset/123',         4, NOW());
INSERT INTO registrations (id, status, registeredAt, studentId, sessionId) VALUES 
(1, 'REGISTERED', NOW(), 3, 1), -- SV An đăng ký Session 1
(2, 'REGISTERED', NOW(), 3, 3), -- SV An đăng ký Session 3
(3, 'REGISTERED', NOW(), 4, 1), -- SV Bình đăng ký Session 1
(4, 'REGISTERED', NOW(), 4, 2), -- SV Bình đăng ký Session 2
(5, 'CANCELLED',  NOW(), 5, 4); -- SV Cường đăng ký Session 4, sau đó hủy