import TopNav from "@/components/navigation/top-nav.tsx";
import {ReactNode} from "react";

const Main = ({children}: { children: ReactNode }) => {

    return (
        <div className="w-screen flex-1 flex-col">
            <div className="sticky top-0 z-20 overflow-x-clip bg-primary-foreground">
                <TopNav/>
            </div>

            <main className="mx-auto h-auto w-full px-4 md:px-6 lg:px-8 max-w-full">
                <section className="flex flex-col gap-y-8 py-8">
                    {children}
                </section>
            </main>
        </div>
    );
};

export default Main;