import Navigation from '@/components/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <Navigation />
      {children}
    </div>
  );
}
