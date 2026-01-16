import { MainLayout } from "@/components/main/main-layout";
import { AboutMe } from "@/components/about/about-me";
import { AboutTechstack } from "@/components/about/about-techstack";
import { AboutLinks } from "@/components/about/about-links";

const Page = async () => {
  return (
    <MainLayout>
      <div className='min-h-screen px-[5vw]'>
        <div className='flex flex-col gap-5'>
          <AboutMe />
          <AboutTechstack />
          <AboutLinks />
        </div>
      </div>
    </MainLayout>
  );
};

export default Page;
