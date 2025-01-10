import CommentSection from "@/app/components/CommentSection";
import { fullBlog } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanity";

// Fetch blog data based on slug
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

  return data[0]; // Return the first blog post (it should only return one based on the slug)
}

export default async function BlogArticle({
  params,
}: {
  params: { slug: string };
}) {
  let data: fullBlog | null = null;
  
  // Error handling during data fetch
  try {
    data = await getData(params.slug);
    console.log("Fetched Data:", data);
  } catch (error) {
    console.error("Error fetching blog data:", error);
  }

  // If no data or an error occurred, you can return a fallback UI
  if (!data) {
    return <div className="text-center">Blog post not found!</div>;
  }

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

      {/* Image rendering with conditional check */}
      {data.titleImage ? (
        <Image
          src={urlFor(data.titleImage).url()} // Ensure urlFor returns a valid URL
          width={500}
          height={500}
          alt={data.title || "Blog image"} // Ensure alt text is defined
          priority
          className="mt-8 mx-auto"
        />
      ) : (
        <p className="mt-8 text-center text-gray-500">Image not available</p>
      )}

      {/* Content rendering using PortableText */}
      <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-blue-600">
        {data.content && Array.isArray(data.content) ? (
          <PortableText value={data.content} />
        ) : (
          <p className="text-gray-500">Content not available</p>
        )}
      </div>

      {/* Comment section */}
      <CommentSection />
    </div>
  );
}
