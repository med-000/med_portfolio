import { MainLayout } from "@/components/main/main-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Page = async () => {
  return (
    <MainLayout>
      <div className='min-h-screen flex flex-col gap-3'>
        <div>About me</div>
        <div className='flex gap-3'>
          <Avatar className='size-20'>
            <AvatarImage src='/images/icons/med_icon.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className=''>med-000</p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Page;
