import { MainLayout } from "@/components/main/main-layout";
import { getProjects, getPages } from "@/lib/notion/notion";

const Page = async () => {
  const projects = await getProjects();
  const Info = await getPages("2d7b7863bd2f8096872dcbd7dbc20424");
  return (
    <MainLayout>
      <div className='min-h-screen'>
        <pre className='whitespace-pre-wrap text-sm'>
          {projects.map(async (project) => {
            const projectPage = await getPages(`${project.id}`);
            return <div key={project.id}>{projectPage.content}</div>;
          })}
        </pre>
      </div>
    </MainLayout>
  );
};

export default Page;
