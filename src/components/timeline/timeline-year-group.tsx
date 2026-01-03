import type { Timeline } from "@/lib/notion";
import { getPages } from "@/lib/notion";
import { TimelineCard } from "@/components/timeline/timeline-card";

type TimelineGroupYearProps = {
  year: number;
  timelines: Timeline[];
};

export const TimelineGroupYear = async ({
  year,
  timelines,
}: TimelineGroupYearProps) => {
  const timelinesWithRelations = await Promise.all(
    timelines.map(async (timeline) => {
      const timelinePage = await getPages(timeline.id);
      const relatedPages = await Promise.all(
        timeline.techstack.map((techstackId) => getPages(techstackId))
      );

      return {
        timeline,
        timelinePage,
        relatedPages,
      };
    })
  );

  return (
    <div className='px-8 md:px-16 lg:px-24'>
      <div className='space-y-6 max-w-5xl mx-auto'>
        <div className='grid grid-cols-[24px_1fr] gap-4'>
          <div className='flex justify-center'>
            <div className='text-xl font-bold'>{year}</div>
          </div>
          <div />
        </div>

        {timelinesWithRelations.map(
          ({ timeline, timelinePage, relatedPages }, index) => {
            const isEnd = index === timelinesWithRelations.length - 1;

            return (
              <div
                key={timeline.id}
                className='grid grid-cols-[24px_1fr] gap-4'
              >
                <div className='flex flex-col items-center'>
                  <div className='w-3 h-3 rounded-full bg-white' />
                  {!isEnd && <div className='w-px flex-1 bg-gray-300' />}
                </div>

                <TimelineCard
                  timelineTitle={timeline.title}
                  timelineDate={timeline.date}
                  timelinePage={timelinePage}
                  relatedPages={relatedPages}
                />
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
