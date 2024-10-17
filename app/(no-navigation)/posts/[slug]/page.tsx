import Image from 'next/image';
import { notFound } from 'next/navigation';

import { posts } from '#site/content';
import Preview from '@/components/preview';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) notFound();

  return (
    <article className="p-4">
      <h1 className="mb-4 text-5xl font-bold">{post.title}</h1>
      {post.description && <p className="text-sm text-muted-foreground">{post.description}</p>}
      {post.cover && (
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image src={post.cover} alt={post.title} placeholder="blur" fill />
        </AspectRatio>
      )}
      <hr className="my-4" />
      <Preview source={post.content} />
    </article>
  );
}

const getPostBySlug = (slug: string) => posts.find((post) => post.slug === slug);

export const generateMetadata = ({ params }: PostPageProps) => {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
};

export const generateStaticParams = () => posts.map((post) => ({ slug: post.slug }));
