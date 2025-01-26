import { fullBlog } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/app/lib/sanity";
import CommentSection from "@/app/components/CommentSection";

// Fetch blog data by slug
async function getData(slug: string) {
  const query = `*[_type == 'blog' && slug.current == $slug]{
    "currentSlug": slug.current,
    title,
    content,
    titleImage
  }`;

  const data = await client.fetch(query, { slug });

  if (!data || data.length === 0) {
    throw new Error(`No blog found for slug: ${slug}`);
  }

  return data[0];
}

// Generate static params (for dynamic routing)
export async function generateStaticParams() {
  const query = `*[_type == 'blog']{
    slug {
      current
    }
  }`;

  const blogs = await client.fetch(query);

  return blogs.map((blog: { slug: { current: string } }) => ({
    slug: blog.slug.current,
  }));
}

// Define BlogArticleProps
interface BlogArticleProps {
  params: {
    slug: string;
  };
}

// Blog Article Page Component
export default async function BlogArticle({ params }: BlogArticleProps) {
  const { slug } = params;

  try {
    const data: fullBlog = await getData(slug);

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

        {data.titleImage && (
          <Image
            src={urlFor(data.titleImage).url()}
            width={500}
            height={500}
            alt="Title Image"
            priority
            className="mt-8 mx-auto"
          />
        )}

        <div className="mt-16 prose prose-blue prose-xl dark:prose-invert prose-li:marker:text-blue-600">
          {data.content && Array.isArray(data.content) ? (
            <PortableText value={data.content} />
          ) : null}
        </div>
        <CommentSection />
      </div>
    );
  } catch (error) {
    console.error(`Error loading blog with slug "${slug}":`, error);
    return <div>Error loading blog data. Please try again later.</div>;
  }
}
