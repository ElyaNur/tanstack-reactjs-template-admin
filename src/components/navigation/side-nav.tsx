import {cn} from "@/lib/utils.ts";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {ArchiveX, CircleArrowLeft, CircleArrowRight, FileIcon, HeartPulse, Inbox, Send} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {Nav} from "@/components/navigation/nav.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigationStore} from "@/store/store.ts";

const SideNav = () => {
    const {isCollapsed, setIsCollapsed} = useNavigationStore(state => ({
        isCollapsed: state.isSideNavOpen,
        setIsCollapsed: state.setIsSideNavOpen
    }))

    return (
        <aside
            className={cn("lg:w-80 w-16 inset-y-0 start-0 z-30 sticky bg-primary-foreground h-svh hidden sm:block", isCollapsed && "max-w-16 block")}>
            <TooltipProvider delayDuration={0}>
                <div
                    className={cn("flex h-16 items-center justify-center relative", isCollapsed && "px-2")}
                >
                    <HeartPulse className={cn("h-6 w-6 text-primary hidden sm:block", isCollapsed && "block")}/>
                    {!isCollapsed && <h3 className="font-bold text-2xl ml-3 hidden lg:block">Klinik sehat</h3>}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("absolute -right-3 hidden lg:block", isCollapsed && "-right-8")}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? <CircleArrowRight/> : <CircleArrowLeft/>}
                    </Button>
                </div>
                <Separator/>
                <Nav
                    isCollapsed={isCollapsed}
                    links={[
                        {
                            title: "Admin",
                            icon: FileIcon,
                            group: [
                                {
                                    title: "Dashboard",
                                    label: "128",
                                    icon: Inbox,
                                    variant: "default",
                                },
                                {
                                    title: "Users",
                                    label: "",
                                    icon: Send,
                                    variant: "ghost",
                                },
                                {
                                    title: "Settings",
                                    label: "",
                                    icon: ArchiveX,
                                    variant: "ghost",
                                },
                            ]
                        },
                    ]}
                />

                <Separator/>
            </TooltipProvider>
        </aside>
    );
};

export default SideNav;