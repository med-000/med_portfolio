import type { DateRange, Page } from "@/lib/notion";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className='flex flex-col gap-3 max-w-4xl'>
      <div className='text-xl font-bold'>{timelineTitle}</div>
      <div>
        {timelineDate.start.month}
        {timelineDate.end && <>〜{timelineDate.end.month}</>}月
      </div>
      <div>{timelinePage.content}</div>
      <div>
        {relatedPages.map((tag) => (
          <Badge className='outline' variant='secondary' key={tag.id}>
            <div>{tag.title}</div>
          </Badge>
        ))}
      </div>
    </Card>
  );
};
{
}
