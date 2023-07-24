import { useRouter } from 'next/router';
import { Inconsolata } from 'next/font/google';
import { Fragment, PropsWithChildren } from 'react';

const inconsolata = Inconsolata({ subsets: ['latin'] });

function Layout({ children }: PropsWithChildren) {
  const router = useRouter();

  return (
    <div className={inconsolata.className}>
      <Fragment key={router.asPath}>{children}</Fragment>
    </div>
  );
}

export default Layout;
