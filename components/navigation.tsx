'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from './ui/navigation-menu';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu className="flex w-full min-w-full justify-start py-6">
      <NavigationMenuList className="h-full">
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
                  'text-md font-medium hover:font-bold',
                  pathname === href && 'font-bold',
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
