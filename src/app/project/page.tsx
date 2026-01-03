import { MainLayout } from "@/components/main/main-layout";
import { getProjects, getPages } from "@/lib/notion";
import { ProjectCard } from "@/components/project/project-card";

const Page = async () => {
  const projects = await getProjects();

  const projectsWithRelations = await Promise.all(
    projects.map(async (project) => {
      const projectPage = await getPages(project.id);

      const relatedPages = await Promise.all(
        project.techstack.map((techstackId) => getPages(techstackId))
      );

      return {
        project,
        projectPage,
        relatedPages,
      };
    })
  );

  return (
    <MainLayout>
      <div className='min-h-screen flex flex-col gap-5'>
        <div className='text-center text-3xl'>Projects</div>
        <div className='grid gap-6 grid-cols-[repeat(auto-fill,300px)] justify-center'>
          {projectsWithRelations.map(
            ({ project, projectPage, relatedPages }) => (
              <ProjectCard
                key={project.id}
                project={project}
                projectPage={projectPage}
                relatedPages={relatedPages}
              />
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Page;
