import "../styles/globals.css";
import { useState, useEffect } from "react";
import liff from "@line/liff";

import debug from 'debug';

const log = debug('myapp:log');

log('This is a debug message');

function MyApp({ Component, pageProps }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const [isLiffInitialized, setIsLiffInitialized] = useState(false);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    console.log("start liff.init()...");
    liff
      .init({ liffId: process.env.LIFF_ID })
      .then(() => {
        console.log("liff.init() done");
        setLiffObject(liff);
        setIsLiffInitialized(true);
      })
      .catch((error) => {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.liffId) {
          console.info(
            "LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable."
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
  pageProps.liff = liffObject;
  pageProps.liffError = liffError;
  return <Component {...pageProps} />;
}

export default MyApp;
