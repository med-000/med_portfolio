import { MainLayout } from "@/components/main/main-layout";
import { getProjects, getPages } from "@/lib/notion";

const Page = async () => {
  const projects = await getProjects();
  return (
    <MainLayout>
      <div className='min-h-screen'>
        <pre className='whitespace-pre-wrap text-sm'>
          {projects.map(async (project) => {
            const projectPage = await getPages(`${project.id}`);
            return (
              <div key={project.id}>
                <div>{projectPage.title}</div>
                <div>{projectPage.content}</div>
              </div>
            );
          })}
        </pre>
      </div>
    </MainLayout>
  );
};

export default Page;
