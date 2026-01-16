import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const AboutMe = () => {
  return (
    <section className='space-y-4'>
      <div className='flex items-center gap-4'>
        <span className='text-2xl font-semibold'>About Me</span>
        <div className='flex-1 border-b' />
      </div>

      <div className='flex items-center gap-10 px-[5vw]'>
        <Avatar className='size-30'>
          <AvatarImage src='/images/icons/med_icon.png' alt='med avatar' />
          <AvatarFallback>med</AvatarFallback>
        </Avatar>

        <div className='space-y-1'>
          <p className='text-xl py-2 font-bold'> Riki Maeda</p>
          <div className='px-5'>
            <p>
              <span className='font-semibold'>Nickname:</span>
              med,前の田んぼ
            </p>
            <p>
              <span className='font-semibold'>Affiliation:</span>TDU
              (東京電機大学)
            </p>
            <p>
              <span className='font-semibold'>Comment:</span>
              バックエンド、フロントエンド、インフラなどに挑戦しています
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
