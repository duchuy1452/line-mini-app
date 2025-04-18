import React from 'react';
import Navigation from '../components/Navigation';
import Head from 'next/head';

export default function Services() {
  return (
    <div className="container">
      <Head>
        <title>サービス | 緊急救助サービス</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      <main className="main">
        <h1 className="title">サービス</h1>
        <p className="welcome">サービスページへようこそ</p>
      </main>

      <Navigation onEmergencyClick={() => {}} />

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
          font-size: 2.5rem;
          text-align: center;
          color: #333;
        }

        .welcome {
          font-size: 1.2rem;
          margin: 2rem 0;
          text-align: center;
          color: #666;
        }
      `}</style>
    </div>
  );
} 