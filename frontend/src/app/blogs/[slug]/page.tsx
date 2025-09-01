import BlogHero from "@/components/blog/BlogHero";
import TopArticles from "@/components/blog/TopArticles";
import React from "react";
async function page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="container !mt-16 md:!mt-20 lg:!mt-[126px] flex flex-col lg:flex-row justify-center items-start gap-6 lg:gap-16">
      <div className="w-full lg:w-2/3">
        <BlogHero slug={slug} />
      </div>
      <div className="w-full lg:w-1/3">
        <TopArticles />
      </div>
    </div>
  );
}
export default page;
