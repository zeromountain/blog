import { posts } from '#site/content';
import dayjs from 'dayjs';

export default function Home() {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.slug}>
          <h1>{post.title}</h1>
          <p>{dayjs(post.date).format('YYYY-MM-DD')}</p>
          <p>{post.metadata.readingTime}m</p>
        </div>
      ))}
    </div>
  );
}
