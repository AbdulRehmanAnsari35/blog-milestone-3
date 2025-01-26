import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "./lib/sanity";
async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "slug": slug.current,
    titleImage
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data = await getData();
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center">
        <p>No blog posts available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-5">
      {data.map((post) => (
        <div key={post.slug} className="card shadow-lg  rounded-lg overflow-hidden">
          <div className="relative h-60">
            {post.titleImage ? (
              <Image
                src={urlFor(post.titleImage).url()}
                alt={post.title || "Blog Image"}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-t-lg"
              />
            ) : (
              <div className="bg-gray-300 h-full flex items-center justify-center rounded-t-lg">
                <span className="text-gray-600">No Image Available</span>
              </div>
            )}
          </div>

          <div className="card-content p-5">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-sm text-gray-600">{post.smallDescription}</p>
            <Link href={`/blog/${post.slug}`}>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md">
                Read More
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
