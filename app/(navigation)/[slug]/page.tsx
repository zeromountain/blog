import { pages } from "#site/content";
import { MDXContent } from "@/components/mdx-content";
import { notFound } from "next/navigation";

interface SlugPageProps {
  params: {
    slug: string;
  };
}

export default function SlugPage({ params }: SlugPageProps) {
  const page = getPageBySlug(params.slug);
  
  if (!page) notFound();

  return (
    <article>
      <h1>{page.title}</h1>
      <hr />
      <MDXContent code={page.body} name="props for mdx" />
    </article>
  )
  
}

const getPageBySlug = (slug: string) => pages.find((page) => page.slug === slug);

export const generateMetadata = ({ params }: SlugPageProps) => {
  const post = getPageBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,

  }
}

export const generateStaticParams = () => pages.map((page) => ({ slug: page.slug }));