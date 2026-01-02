import { MainLayout } from "@/components/main/main-layout";
import { getTimelines } from "@/lib/notion";

const Page = async () => {
  const timelines = await getTimelines();
  return (
    <MainLayout>
      <div className='min-h-screen'>
        {timelines.map((timeline) => {
          return (
            <div key={timeline.id}>
              <div>{timeline.title}</div>
              <div>
                {timeline.date.map((date) => (
                  <div key={date.id}>{date.name}</div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default Page;
