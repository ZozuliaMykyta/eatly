import BlogHero from "@/components/blog/BlogHero";
import TopArticles from "@/components/blog/TopArticles";
import React from "react";
async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="container !mt-[126px] flex justify-center items-start">
      <BlogHero slug={slug} />
      <TopArticles />
    </div>
  );
}
export default page;
