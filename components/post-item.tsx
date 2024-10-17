import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Post } from '@/.velite';

export default function PostItem({ title, description, cover, slug, date }: Post) {
  return (
    <Link href={`/posts/${slug}`}>
      <Card className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
          {cover && <Image src={cover} alt={title} placeholder="blur" />}
        </CardContent>
        <CardFooter>
          <CardDescription>{slug}</CardDescription>
          <CardDescription>{date}</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}
