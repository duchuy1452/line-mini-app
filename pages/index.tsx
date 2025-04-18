import React, { useState } from 'react';
import Head from "next/head";
import { useEffect } from "react";
import { Liff } from "@line/liff";
import { EmergencyForm, EmergencyData } from '../components/EmergencyForm';
import '../styles/EmergencyForm.css';

interface HomeProps {
  liff: Liff;
  liffError?: Error;
}

export default function Home({ liff, liffError }: HomeProps) {
  const [name, setName] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (liff.isLoggedIn()) {
      liff.getProfile().then((profile) => {
        setName(profile.displayName);
      });
    }
  }, [liff]);

  const handleEmergencySubmit = async (data: EmergencyData) => {
    try {
      // Tại đây bạn có thể thêm logic để gửi dữ liệu đến server
      console.log('Emergency data:', data);
      
      // Gửi tin nhắn qua LINE (nếu cần)
      if (liff.isLoggedIn()) {
        await liff.sendMessages([
          {
            type: 'text',
            text: `🚨 YÊU CẦU CỨU HỘ\n\nLoại sự cố: ${data.incident}\nVị trí: ${data.location}\nSĐT: ${data.phone}\nMô tả: ${data.description}`
          }
        ]);
      }

      alert('Yêu cầu cứu hộ đã được gửi thành công!');
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting emergency request:', error);
      alert('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại!');
    }
  };

  if (liffError) {
    return <div>Error: {liffError.message}</div>;
  }

  return (
    <div className="container">
      <Head>
        <title>Dịch Vụ Cứu Hộ</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      <main className="main">
        <h1 className="title">
          Dịch Vụ Cứu Hộ 24/7
        </h1>

        {name && (
          <p className="welcome">
            Xin chào, {name}!
          </p>
        )}

        <div className="description">
          <p>Gặp sự cố? Đừng lo lắng!</p>
          <p>Chúng tôi sẽ có mặt trong thời gian sớm nhất.</p>
        </div>

        <button
          className="emergency-button"
          onClick={() => setShowForm(true)}
          aria-label="Yêu cầu cứu hộ"
        >
          🚨
        </button>

        {showForm && (
          <EmergencyForm
            onSubmit={handleEmergencySubmit}
            onClose={() => setShowForm(false)}
          />
        )}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 800px;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 3rem;
          text-align: center;
          color: #e74c3c;
        }

        .welcome {
          font-size: 1.5rem;
          margin: 1rem 0;
        }

        .description {
          text-align: center;
          line-height: 1.5;
          font-size: 1.2rem;
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
} 