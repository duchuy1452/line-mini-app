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
  const [showSuccess, setShowSuccess] = useState(false);

  const getIncidentText = (value: string): string => {
    switch (value) {
      case 'flat_tire':
        return 'パンク';
      case 'battery':
        return 'バッテリー切れ';
      case 'accident':
        return '事故';
      case 'other':
        return 'その他';
      default:
        return '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    onSubmit(formData);
    onClose();
  };

  if (showSuccess) {
    return (
      <div className="emergency-form-overlay" onClick={(e) => e.stopPropagation()}>
        <div className="success-popup">
          <h3>救助要請を受け付けました</h3>
          <div className="details">
            <p><strong>トラブルの種類:</strong> {getIncidentText(formData.incident)}</p>
            <p><strong>位置情報:</strong> {formData.location}</p>
            <p><strong>電話番号:</strong> {formData.phone}</p>
            {formData.description && (
              <p><strong>詳細説明:</strong> {formData.description}</p>
            )}
          </div>
          <p>まもなくスタッフが連絡いたします。</p>
          <button onClick={handleClose}>
            閉じる
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="emergency-form-overlay" onClick={(e) => e.stopPropagation()}>
      <div className="emergency-form">
        <h2>救助要請フォーム</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="incident">トラブルの種類 *</label>
            <select
              id="incident"
              value={formData.incident}
              onChange={(e) => setFormData({ ...formData, incident: e.target.value })}
              required
            >
              <option value="">選択してください</option>
              <option value="flat_tire">パンク</option>
              <option value="battery">バッテリー切れ</option>
              <option value="accident">事故</option>
              <option value="other">その他</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="location">位置情報 *</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="現在地を入力してください"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">電話番号 *</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="電話番号を入力してください"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">詳細説明</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="状況の詳細を入力してください"
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              送信
            </button>
            <button type="button" onClick={onClose} className="cancel-button">
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 