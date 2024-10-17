import { posts } from '#site/content';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {posts.map((post) => (
        <Link key={post.slug} href={`/posts/${post.slug}`}>
          <h1>{post.title}</h1>
          <p>{dayjs(post.date).format('YYYY-MM-DD')}</p>
          <p>{post.metadata.readingTime}m</p>
        </Link>
      ))}
    </div>
  );
}
