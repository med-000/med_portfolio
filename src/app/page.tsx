import { MainLayout } from "@/components/main/main-layout";

const Home = () => {
    return (
        <MainLayout>
            <div className="min-h-screen flex flex-col items-center gap-5 pt-[25vh]">
                <div className="text-7xl font-bold">Explore me .</div>
                <a
                    className="text-xl group inline-flex items-center gap-2 transition"
                    href="/about"
                >
                    Launch med
                    <span className="transition-transform group-hover:translate-x-1">
                        →
                    </span>
                </a>
            </div>
        </MainLayout>
    );
};

export default Home;
