"use client";
import MarkdownPreview, { MarkdownPreviewProps } from '@uiw/react-markdown-preview';

interface PreviewProps extends MarkdownPreviewProps {
  source: string;
}

export default function Preview({source, ...props}: PreviewProps) {
  return <MarkdownPreview source={source} {...props} />
}