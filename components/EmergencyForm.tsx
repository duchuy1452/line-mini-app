import React, { useState } from 'react';

interface EmergencyFormProps {
  onSubmit: (data: EmergencyData) => void;
  onClose: () => void;
}

export interface EmergencyData {
  incident: string;
  location: string;
  phone: string;
  description: string;
}

export const EmergencyForm: React.FC<EmergencyFormProps> = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState<EmergencyData>({
    incident: '',
    location: '',
    phone: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="emergency-form-overlay">
      <div className="emergency-form">
        <h2>Yêu Cầu Cứu Hộ</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="incident">Loại Sự Cố *</label>
            <select
              id="incident"
              value={formData.incident}
              onChange={(e) => setFormData({ ...formData, incident: e.target.value })}
              required
            >
              <option value="">Chọn loại sự cố</option>
              <option value="flat_tire">Xẹp lốp</option>
              <option value="battery">Hết bình/Chết máy</option>
              <option value="accident">Tai nạn</option>
              <option value="other">Khác</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">Vị Trí *</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Nhập địa chỉ của bạn"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số Điện Thoại *</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô Tả Chi Tiết</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Mô tả thêm về tình trạng xe của bạn"
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Gửi Yêu Cầu
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 