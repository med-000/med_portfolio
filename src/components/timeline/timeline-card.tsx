import type { DateRange, Page } from "@/lib/notion";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
type TimelineCardProps = {
  timelineTitle: string;
  timelineDate: DateRange;
  timelinePage: Page;
  relatedPages: Page[];
};

export const TimelineCard = async ({
  timelineTitle,
  timelineDate,
  timelinePage,
  relatedPages,
}: TimelineCardProps) => {
  return (
    <Card className='min-w-[60vw]'>
      <CardHeader>
        {timelineTitle}
        {timelineDate.start.month}
      </CardHeader>
      <CardContent>{timelinePage.content}</CardContent>
      <CardFooter>
        {relatedPages.map((tag) => (
          <div className='outline' key={tag.id}>
            {tag.title}
          </div>
        ))}
      </CardFooter>
    </Card>
  );
};
