import { MainLayout } from "@/components/main/main-layout";
import { getProjects, getPages } from "@/lib/notion";

const Page = async () => {
  const projects = await getProjects();

  const projectsWithRelations = await Promise.all(
    projects.map(async (project) => {
      const projectPage = await getPages(project.id);

      const relatedPages = await Promise.all(
        project.relation.map((relationId) => getPages(relationId))
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
      <div className='min-h-screen'>
        {projectsWithRelations.map(({ project, projectPage, relatedPages }) => (
          <div key={project.id}>
            <div>{projectPage.title}</div>
            <div>{projectPage.content}</div>

            {projectPage.imageFile && <img src={projectPage.imageFile} />}

            <div>--------</div>
            <div>{project.url}</div>

            <div>
              {relatedPages.map((p) => (
                <div key={p.id}>{p.title}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default Page;
