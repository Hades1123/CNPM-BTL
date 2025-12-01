/**
 * Parse datetime string từ API mà không bị lệch timezone
 * MySQL trả về datetime không có timezone info (e.g., "2025-12-01T07:00:00.000Z")
 * JavaScript tự động parse thành UTC và convert sang local → lệch giờ
 *
 * Hàm này sẽ parse và giữ nguyên giờ như trong database
 */
export const parseLocalDateTime = (dateString: string): Date => {
  // Nếu dateString có 'Z' ở cuối (UTC), bỏ đi để JS không convert timezone
  // Ví dụ: "2025-12-01T07:00:00.000Z" → "2025-12-01T07:00:00.000"
  const localString = dateString.replace('Z', '');
  return new Date(localString);
};

/**
 * Format ngày tháng theo locale Việt Nam
 */
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('vi-VN');
};

/**
 * Format giờ phút theo locale Việt Nam
 */
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
};

/**
 * Format ngày giờ đầy đủ
 */
export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`;
};
