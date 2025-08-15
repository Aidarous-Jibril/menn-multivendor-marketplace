// import { Provider } from 'react-redux';
// import { store } from '../redux/store';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../styles/globals.css'; //for tailwind css to work


// function MyApp({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <Component {...pageProps} />
//       <ToastContainer />
//     </Provider>
//   );
// }

// export default MyApp;


// import React from 'react';
// import { Provider } from 'react-redux';
// import { wrapper } from '../redux/store';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../styles/globals.css'; // for tailwind css to work


// function MyApp({ Component, pageProps }) {
//   return (
//     <Provider store={wrapper.useWrappedStore(pageProps).store}>
//       <Component {...pageProps} />
//       <ToastContainer />
//     </Provider>
//   );
// }

// export default wrapper.withRedux(MyApp);


import React from 'react';
import { Provider } from 'react-redux';
import { wrapper } from '../redux/store';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react'; 
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'; // Tailwind CSS


function MyApp({ Component, pageProps }) {
  const { store } = wrapper.useWrappedStore(pageProps); 

  return (
    <SessionProvider session={pageProps.session}> 
      <Provider store={store}>
        <Component {...pageProps} />
        <ToastContainer />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;

