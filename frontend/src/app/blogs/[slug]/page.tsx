import BlogHero from "@/components/blog/BlogHero";
import React from "react";
async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <>
      <BlogHero slug={slug} />
    </>
  );
}
export default page;
