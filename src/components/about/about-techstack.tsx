import { getTechstacks, getPages, getTechstackTypes } from "@/lib/notion";
export const AboutTechstack = async () => {
  const techstacks = await getTechstacks();
  const techstackTypes = await getTechstackTypes();

  const publicTechstackIds = new Set(
    techstacks
      .filter((techstack) => techstack.public === true)
      .map((techstack) => techstack.id)
  );

  const techstackTypesWithRelations = await Promise.all(
    techstackTypes.map(async (techstackType) => {
      const techstackTypePage = await getPages(techstackType.id);

      const techstackPages = (
        await Promise.all(
          techstackType.techstack.map((techstackId) => getPages(techstackId))
        )
      ).filter((page) => publicTechstackIds.has(page.id));

      return {
        techstackType,
        techstackTypePage,
        techstackPages,
      };
    })
  );
  return (
    <section className='space-y-4'>
      <div className='flex items-center gap-4'>
        <span className='text-2xl font-semibold'>Techstack</span>
        <div className='flex-1 border-b' />
      </div>
      {techstackTypesWithRelations.map(
        ({ techstackType, techstackTypePage, techstackPages }) => (
          <div key={techstackType.id}>
            <ul className='text-xl py-2 font-bold'>
              {techstackType.title}
              {techstackPages.map((techstack) => (
                <li className='px-5' key={techstack.id}>
                  ・{techstack.title}
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </section>
  );
};
