
import ServicesCardSection from '@/components/Services';
import HeroSection from '@/components/HeroSection';
import YtServices from '@/components/YtServices';
export default async function Home() {

  const res = await fetch('http://localhost:3000/api/services', {

    cache: 'no-store'
  })
  const data = await res.json();
  // console.log(data);



  return (
    <div className="relative min-h-[200vh] font-[family-name:var(--font-geist-sans)] overflow-hidden">

      <div className="fixed top-0 left-0 -z-10 h-[850px] w-[830px] rotate-45 bg-gradient-to-l from-red-950 to-red-500 opacity-30 blur-[150px]"></div>

      <div className="grid   items-center justify-items-center  sm:p-20 z-10">
        <div className="container ">
          <section className="relative   text-white  flex items-center  ">

            <div className="absolute top-0  left-0 w-full h-full pointer-events-none z-0">
              <div className="absolute top-80   rounded-full blur-3xl" />
            </div>
            <HeroSection></HeroSection>
          </section>


        </div>


      </div>

      <div className=" bg-white/5 py-10 snap-y snap-mandatory overflow-scroll">

        <h2 className="text-3xl text-white  sticky top-0 sm:text-4xl animate-float1 font-bold text-center ">
          <span className="text-red-500 ">
            YouTube
          </span> Services
        </h2>
        <div className='grid grid-cols-1 container mx-auto  md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>

          {
            data?.services?.map((service: any) => <YtServices key={service._id} service={service}></YtServices>)
          }

        </div>
        <ServicesCardSection></ServicesCardSection>



      </div>

    </div>
  );
}
