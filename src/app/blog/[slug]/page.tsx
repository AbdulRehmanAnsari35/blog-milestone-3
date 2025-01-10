import { fullBlog } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanity";
import CommentSection from "@/app/components/CommentSection";

interface BlogArticleProps {
  params: {
    slug: string;
  };
}

async function getData(slug: string) {
  const query = `*[_type == 'blog' && slug.current == '${slug}']{
    "currentSlug": slug.current,
    title,
    content,
    titleImage
  }`;

  const data = await client.fetch(query);
  
  if (!data || data.length === 0) {
    throw new Error(`No blog found for slug: ${slug}`);
  }

  return data[0]; 
}

export default async function BlogArticle({ params }: BlogArticleProps) {
  const data: fullBlog = await getData(params.slug);

  console.log("Fetched Data:", data);

  return (
    <div className="mt-12">
      <h1>
        <span className="block text-3xl text-center text-primary font-bold tracking-wide uppercase">
          Silent Pages-Blogs
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      {data.titleImage ? (
        <Image
          src={urlFor(data.titleImage).url()} 
          width={500}
          height={500} 
          alt="Title Image" 
          priority 
          className="mt-8 mx-auto" 
        />
      ) : (
        <p className="mt-8 text-center text-gray-500">Image not available</p>
      )}

      <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-blue-600">
        {data.content && Array.isArray(data.content) ? (
          <PortableText value={data.content} />
        ) : (
          <p className="text-gray-500">Content not available</p>
        )}
      </div>
      {/* comment */}
      <CommentSection/>
    </div>
  );
}
