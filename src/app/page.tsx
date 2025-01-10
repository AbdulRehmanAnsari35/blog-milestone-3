import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleImage
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
      {data.map((post, idx) => (
        <Card key={idx} className="shadow-lg rounded-lg overflow-hidden">
          
            <div className="relative h-60"> {/* Add relative class to parent */}
              <Image
                src={urlFor(post.titleImage).url()} // Get the image URL using the `urlFor` function
                alt={post.title || "Blog image"} // Default alt text if title is missing
                fill={true} // Use `fill` instead of layout="fill" in Next.js 15
                style={{ objectFit: "cover" }} // Apply cover style to the image
                className="rounded-t-lg" // Rounded corners for the top of the image
              />
            </div>
          
          <CardContent className="mt-5">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-3 text-gray-600 dark:text-gray-300">
              {post.smallDescription}
            </p>
            <Link href={`/blog/${post.currentSlug}`}>
              <button className="w-full mt-7 bg-blue-600 dark:bg-blue-800 font-medium py-2 rounded-md">
                Read More
              </button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
