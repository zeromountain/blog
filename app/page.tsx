import { posts } from '#site/content';
import PostItem from '@/components/post-item';

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostItem key={post.slug} {...post} />
      ))}
    </div>
  );
}
