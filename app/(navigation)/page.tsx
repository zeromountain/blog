import { posts } from '#site/content';

import PostItem from '@/components/post-item';

export default function Home() {
  return (
    <div className="mt-10 flex flex-col gap-6">
      {posts.map((post) => (
        <PostItem key={post.slug} {...post} />
      ))}
    </div>
  );
}
