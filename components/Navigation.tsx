import React from 'react';
import Link from 'next/link';

interface NavigationProps {
  onEmergencyClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onEmergencyClick }) => {
  return (
    <nav className="navigation">
      <button onClick={onEmergencyClick} className="nav-button emergency">
        <span className="icon">🚨</span>
        <span>救助要請</span>
      </button>
      <Link href="/profile" className="nav-button">
        <span className="icon">👤</span>
        <span>プロフィール</span>
      </Link>
      <Link href="/history" className="nav-button">
        <span className="icon">📋</span>
        <span>履歴</span>
      </Link>
      <Link href="/services" className="nav-button">
        <span className="icon">🔧</span>
        <span>サービス</span>
      </Link>
      <Link href="/points" className="nav-button">
        <span className="icon">⭐</span>
        <span>ポイント</span>
      </Link>
      <Link href="/settings" className="nav-button">
        <span className="icon">⚙️</span>
        <span>設定</span>
      </Link>
    </nav>
  );
};

export default Navigation; 