import { TimelineGroupYear } from "@/components/timeline/timeline-year-group";
import { getTimelinesByYear } from "@/lib/notion";
import { Card } from "@/components/ui/card";

export const AboutTimeline = async () => {
  const timelinesByYear = await getTimelinesByYear();
  return (
    <section className='space-y-6 py-[1vw]'>
      <div className='flex items-center gap-4'>
        <span className='sm:text-4xl text-2xl font-semibold'>TimeLine</span>
        <div className='flex-1 border-b-2' />
      </div>
      <div className='flex flex-col min-h-screen m-5 gap-3'>
        {timelinesByYear.map((group) => (
          <TimelineGroupYear
            key={group.year}
            year={group.year}
            timelines={group.timelines}
          ></TimelineGroupYear>
        ))}
      </div>
    </section>
  );
};
