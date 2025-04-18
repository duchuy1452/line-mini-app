import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavigationProps {
  onEmergencyClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onEmergencyClick }) => {
  const router = useRouter();

  const handleEmergencyClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (router.pathname !== '/') {
      // Nếu không ở trang chủ, chuyển về trang chủ với query parameter
      await router.push('/?showEmergencyForm=true');
    } else {
      // Nếu đã ở trang chủ, mở form ngay
      onEmergencyClick();
    }
  };

  return (
    <nav className="navigation">
      <button onClick={handleEmergencyClick} className="nav-button emergency">
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