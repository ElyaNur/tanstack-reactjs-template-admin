import SideNav from "@/components/navigation/side-nav.tsx";
import Main from "@/components/main.tsx";
import {ReactNode} from "react";

const Navigation = ({children}: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen w-full overflow-x-clip">
            <SideNav/>
            <Main>
                {children}
            </Main>
        </div>
    );
};

export default Navigation;