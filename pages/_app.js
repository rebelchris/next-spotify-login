import { SessionProvider } from 'next-auth/react';
import 'tailwindcss/tailwind.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <div className='flex items-center justify-center min-h-screen'>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
