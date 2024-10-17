'use client';

import MarkdownPreview, { MarkdownPreviewProps } from '@uiw/react-markdown-preview';

import raw from 'rehype-raw';
import slug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { PluggableList } from 'unified';

interface PreviewProps extends MarkdownPreviewProps {
  source: string;
}

export default function Preview({ source, ...props }: PreviewProps) {
  return (
    <MarkdownPreview
      source={source}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[raw, slug] as PluggableList}
      {...props}
    />
  );
}
