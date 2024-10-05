// app/post/[path]/page.tsx

import PostContent from './PostContent';

interface Params {
  path: string;
}

interface ContentItem {
  tag: string;
  attrs?: Record<string, string>;
  children: (string | ContentItem)[];
}

interface PostData {
  title: string;
  content: ContentItem[];
  description?: string;
  author_name?: string;
  author_url?: string;
  views?: number;
  date?: string;
}

async function getPostData(path: string): Promise<PostData> {
  const response = await fetch(`http://localhost:3000/api/post/${path}`);
  if (!response.ok) {
    throw new Error('Failed to fetch post data');
  }
  return response.json();
}

export async function generateMetadata({ params }: { params: Params }) {
  const data = await getPostData(params.path);
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function Post({ params }: { params: Params }) {
  const postData = await getPostData(params.path);
  return <PostContent initialData={postData} />;
}