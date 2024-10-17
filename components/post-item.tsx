import Image from 'next/image';
import Link from 'next/link';

import { AspectRatio } from './ui/aspect-ratio';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Post } from '@/.velite';
import dayjs from 'dayjs';

export default function PostItem({ title, description, cover, slug, date, metadata }: Post) {
  return (
    <Link href={`/posts/${slug}`}>
      <Card className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
          {cover && (
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <Image src={cover} alt={title} placeholder="blur" fill />
            </AspectRatio>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <CardDescription>{dayjs(date).format('YYYY-MM-DD')}</CardDescription>
          <CardDescription>{metadata.readingTime}분</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}
