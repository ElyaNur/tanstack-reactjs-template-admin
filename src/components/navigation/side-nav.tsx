import {cn} from "@/lib/utils.ts";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {CircleArrowLeft, CircleArrowRight, HeartPulse} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {Nav} from "@/components/navigation/nav.tsx";
import {Button} from "@/components/ui/button.tsx";
import {MenuItem, useNavigationStore} from "@/store/store.ts";
import {Link, useRouterState} from "@tanstack/react-router";
import {useMemo} from "react";

const SideNav = () => {
    const {menus, isCollapsed, setIsCollapsed} = useNavigationStore(state => ({
        menus: state.menus,
        isCollapsed: state.isSideNavOpen,
        setIsCollapsed: state.setIsSideNavOpen
    }))

    const router = useRouterState()

    const processedMenu = useMemo<MenuItem[]>(
        () => menus.map(menu => ({
            ...menu,
            group: menu.group.map((group) => ({
                ...group,
                variant: router.location.pathname === group.path ? "default" : 'ghost'
            }))
        })), [menus, router.location.pathname])

    return (
        <aside
            className={cn("lg:w-80 w-16 inset-y-0 start-0 z-30 sticky bg-primary-foreground h-svh hidden sm:block", isCollapsed && "max-w-16 block")}>
            <TooltipProvider delayDuration={0}>
                <Link
                    to="/"
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
                </Link>
                <Separator/>
                <Nav
                    isCollapsed={isCollapsed}
                    links={processedMenu}
                />

                <Separator/>
            </TooltipProvider>
        </aside>
    );
};

export default SideNav;