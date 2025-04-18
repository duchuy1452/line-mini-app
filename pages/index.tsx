import React from 'react';
import Head from "next/head";
import { useEffect, useState } from "react";
import { EmergencyForm, EmergencyData } from '../components/EmergencyForm';
import Navigation from '../components/Navigation';
import liff from '@line/liff';

interface HomeProps {
  liff: typeof liff;
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
            text: `🚨 緊急救助要請\n\n種類: ${data.incident}\n位置: ${data.location}\n電話: ${data.phone}\n詳細: ${data.description}`
          }
        ]);
      }

      alert('救助要請を送信しました！');
      setShowForm(false);
    } catch (error) {
      console.error('Error submitting emergency request:', error);
      alert('エラーが発生しました。もう一度お試しください。');
    }
  };

  if (liffError) {
    return <div>エラー: {liffError.message}</div>;
  }

  return (
    <div className="container">
      <Head>
        <title>緊急救助サービス</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      <main className="main">
        <h1 className="title">
          24時間緊急救助
        </h1>

        {name && (
          <p className="welcome">
            ようこそ、{name}さん！
          </p>
        )}

        <div className="description">
          <p>お困りですか？</p>
          <p>すぐに駆けつけます。</p>
        </div>

        {showForm && (
          <EmergencyForm
            onSubmit={handleEmergencySubmit}
            onClose={() => setShowForm(false)}
          />
        )}
      </main>

      <Navigation onEmergencyClick={() => setShowForm(true)} />

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