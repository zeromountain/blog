import { ArrowLeftIcon } from '@radix-ui/react-icons';

import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link href="/" className="fixed left-0 top-0">
        <ArrowLeftIcon className="h-8 w-8" />
      </Link>
      {children}
    </>
  );
}
