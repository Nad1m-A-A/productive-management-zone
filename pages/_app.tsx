import './globals.css';
import type { AppProps } from 'next/app'
import Head from 'next/head';
import { Provider } from 'react-redux'
import store from '../redux/app-store/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Productivity Managment Zone</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300&display=swap" rel="stylesheet"/> 
      </Head>
      <Component {...pageProps} />
    </Provider>
    )
}
