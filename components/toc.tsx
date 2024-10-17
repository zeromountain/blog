'use client';

import { ArrowLeftIcon, DoubleArrowUpIcon } from '@radix-ui/react-icons';

import { useEffect, useMemo, useState } from 'react';

import Link from 'next/link';

import { useLocation } from '@/hooks/use-location';
import useObservation from '@/hooks/use-observation';
import { cn } from '@/lib/utils';

export default function Toc() {
  const { location, setLocation } = useLocation();

  const hash = useMemo(() => decodeURIComponent(location), [location]);

  console.log({ hash });

  const [headingEls, setHeadingEls] = useState<Element[]>([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));
    setHeadingEls(headingElements);
  }, []);

  useObservation(setLocation, headingEls);

  return (
    <nav className="fixed left-24 top-[50%] flex w-[200px] translate-y-[-50%] flex-col gap-2 bg-red-500">
      <Link href="/">
        <ArrowLeftIcon className="h-8 w-8" />
      </Link>
      <div className="flex flex-col">
        {headingEls.map((heading, index) =>
          index === 0 ? null : (
            <Link
              key={`heading-${heading.id}`}
              href={`${heading.id}`}
              passHref={`${heading.id}` === hash}
              className={cn(
                `${heading.id}` === hash && 'bg-blue-500 animate-in slide-in-from-left',
                heading.tagName === 'H2' && 'pl-4',
                heading.tagName === 'H3' && 'pl-8',
              )}
            >
              {heading.textContent}
            </Link>
          ),
        )}
      </div>
      <DoubleArrowUpIcon className="h-8 w-8 animate-bounce" />
    </nav>
  );
}
