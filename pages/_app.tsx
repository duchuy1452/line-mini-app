import type { AppProps } from 'next/app';
import { useState, useEffect } from "react";
import liff from "@line/liff";
import debug from 'debug';

import "../styles/globals.css";
import '../styles/EmergencyForm.css';
import '../styles/Navigation.css';

const log = debug('myapp:log');

log('This is a debug message');

interface CustomPageProps {
  liff?: typeof liff;
  liffError?: string;
}

function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const [liffObject, setLiffObject] = useState<typeof liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [isLiffInitialized, setIsLiffInitialized] = useState(false);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    console.log("start liff.init()...");
    liff
      .init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID || '', withLoginOnExternalBrowser: true })
      .then(() => {
        console.log("liff.init() done");
        setLiffObject(liff);
        setIsLiffInitialized(true);
      })
      .catch((error: Error) => {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.NEXT_PUBLIC_LIFF_ID) {
          console.info(
            "LIFF Starter: Please make sure that you provided `NEXT_PUBLIC_LIFF_ID` as an environmental variable."
          );
        }
        setLiffError(error.toString());
      });
  }, []);

  if (!isLiffInitialized) {
    return <div>Loading...</div>;
  }

  // Provide `liff` object and `liffError` object
  // to page component as property
  const enhancedPageProps = {
    ...pageProps,
    liff: liffObject,
    liffError: liffError
  };

  return <Component {...enhancedPageProps} />;
}

export default MyApp; 