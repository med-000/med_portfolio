import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Card,
  CardHeader,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { Project, Page } from "@/lib/notion";

type ProjectCardProps = {
  project: Project;
  projectPage: Page;
  relatedPages: Page[];
};
export const ProjectCard = async ({
  project,
  projectPage,
  relatedPages,
}: ProjectCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='overflow-hidden flex flex-col w-75 h-75 gap-1 py-0 z-40  transition-all duration-200 hover:scale-105 hover:z-40 cursor-pointer'>
          <CardHeader className='p-0'>
            <AspectRatio ratio={18 / 9}>
              {projectPage.imageFile && (
                <Image
                  src={projectPage.imageFile}
                  alt='header'
                  fill
                  className='object-cover'
                />
              )}
            </AspectRatio>
          </CardHeader>
          <CardContent className='flex-1 flex-col'>
            <h1 className='font-bold text-2xl pb-2'>{project.title}</h1>
            <p className='text-neutral-400'>{project.summary}</p>
          </CardContent>
          <CardFooter className='p-3'>
            <p className='flex gap-3'>
              {relatedPages.map((tag) => (
                <Badge className='outline' variant='secondary' key={tag.id}>
                  {tag.title}
                </Badge>
              ))}
            </p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className='max-h-[80vh] flex flex-col min-h-[50vh] min-w-[30vw] max-w-[90vw]'>
        <div className='overflow-y-auto flex flex-col gap-3'>
          <AspectRatio ratio={18 / 9}>
            {projectPage.imageFile && (
              <Image
                src={projectPage.imageFile}
                alt='header'
                fill
                className='object-cover py-2 rounded-xl'
              />
            )}
          </AspectRatio>
          <h1 className='text-3xl font-bold'>{project.title}</h1>
          <div className='text-neutral-500 font-bold'>{project.summary}</div>
          <div className='flex gap-3'>
            <Button
              variant='outline'
              size='sm'
              asChild
              className='inline-flex w-fit'
            >
              <Link href={project.github} target='_blank'>
                GitHub
              </Link>
            </Button>
            <Button
              variant='outline'
              size='sm'
              asChild
              className='inline-flex w-fit'
            >
              <Link href={project.zenn} target='_blank'>
                Zenn
              </Link>
            </Button>
          </div>
          <div className='prose prose-invert'>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {projectPage.content}
            </ReactMarkdown>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
