// src/pages/_app.js
import React from "react";
import { Provider } from "react-redux";
import { wrapper } from "../redux/store";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap" });

function MyApp({ Component, pageProps }) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <div className={inter.className}>
      <SessionProvider session={pageProps.session}>
        <Provider store={store}>
          {/* Landmark for the skip link */}
          <main id="main-content">
            <Component {...pageProps} />
          </main>
          <ToastContainer />
        </Provider>
      </SessionProvider>
    </div>
  );
}

export default MyApp;
