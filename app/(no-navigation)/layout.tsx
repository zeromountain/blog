import Toc from '@/components/toc';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <Toc />
      {children}
    </div>
  );
}
