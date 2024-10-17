'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="h-16 w-full">
      <NavigationMenuList>
        {[
          { label: 'home', href: '/' },
          { label: 'about', href: '/about' },
          { label: 'contact', href: '/contact' },
        ].map(({ label, href }) => (
          <NavigationMenuItem key={href}>
            <Link href={href} passHref legacyBehavior>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'font-medium hover:font-bold',
                  pathname.includes(href) && 'font-bold',
                )}
              >
                {label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
