import { MainLayout } from "@/components/main/main-layout";
import { BlogContent } from "@/components/blog/blog-content";
import { notion2markdown } from "@/lib/notion/notion";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};
const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const blogContent = await notion2markdown(id);
  return (
    <MainLayout>
      <BlogContent content={blogContent.parent} />
    </MainLayout>
  );
};

export default Page;
