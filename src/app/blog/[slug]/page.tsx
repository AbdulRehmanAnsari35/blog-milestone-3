import { notFound } from "next/navigation";
import { client, urlFor } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";
import CommentSection from "@/app/components/CommentSection";

async function getBlogData(slug: string) {
  const query = `*[_type == 'blog' && slug.current == $slug][0]{
    title,
    content,
    titleImage
  }`;
  const blog = await client.fetch(query, { slug });
  if (!blog) {
    notFound(); 
  }

  return blog;
}

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPageProps) {
  const blog = await getBlogData(params.slug);
  return {
    title: blog.title,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = params;

  const blog = await getBlogData(slug);

  return (
    <div className="max-w-4xl mx-auto px-4 mt-12">
      <h1 className="text-3xl font-bold text-center">{blog.title}</h1>

      {blog.titleImage && (
        <div className="relative h-80 mt-8">
          <Image
            src={urlFor(blog.titleImage).url()}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div className="mt-8 prose max-w-none prose-blue prose-xl prose-headings:text-red-400 dark:prose-invert ">
        <PortableText value={blog.content} />
      </div>
      <br />
      <CommentSection />
    </div>
  );
}
