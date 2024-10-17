

import { posts } from "#site/content";
import Preview from "@/components/preview";
import Image from "next/image";
import { notFound } from "next/navigation";


interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if(!post) notFound();

  return (
    <article className="p-4">
      <h1>{post.title}</h1>
      {post.description && <p>{post.description}</p>}
      {post.cover && <Image src={post.cover} alt={post.title} placeholder="blur" />}
      <hr className="my-4" />
      <Preview source={post.content} />
    </article>
  )
}

const getPostBySlug = (slug: string) => posts.find((post) => post.slug === slug);

export const generateMetadata = ({ params }: PostPageProps) => { 
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  }
}

export const generateStaticParams = () => posts.map((post) => ({ slug: post.slug }));
