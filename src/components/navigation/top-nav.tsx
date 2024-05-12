import Time from "@/components/time.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {cn} from "@/lib/utils.ts";
import {Button, buttonVariants} from "@/components/ui/button.tsx";
import {Bell, HeartPulse, LogOut, Menu, Monitor, Moon, Sun} from "lucide-react";
import {Separator} from "@/components/ui/separator.tsx";
import {useTheme} from "@/components/theme-provider.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {useNavigationStore} from "@/store/store.ts";
import {useAuth} from "@/hooks/useAuth.ts";
import {useNavigate} from "@tanstack/react-router";

const TopNav = () => {
    const {isMenuOpen, setNotificationOpen, setMenuOpen} = useNavigationStore(state => ({
        isMenuOpen: state.isSideNavOpen,
        setNotificationOpen: state.setIsNotificationOpen,
        setMenuOpen: state.setIsSideNavOpen
    }))
    const {logout} = useAuth();
    const navigate = useNavigate()
    const {setTheme} = useTheme()

    const handleLogout = () => {
        logout()
        navigate({to: '/login'})
    }

    return (
        <>
            <nav
                className="flex h-16 items-center gap-x-4 px-4 shadow-sm ring-1 ring-gray-950/5 md:px-6 lg:px-8">
                <div className="flex justify-between w-full items-center">
                    <div className="block sm:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!isMenuOpen)}>
                            <Menu/>
                        </Button>
                    </div>
                    <div>
                        {!isMenuOpen && <HeartPulse className="h-6 w-6 text-primary block sm:hidden"/>}
                        <Time/>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative"
                                onClick={() => setNotificationOpen(true)}>
                            <Bell/>
                            <Badge variant="notification">4</Badge>
                        </Button>

                        <TooltipProvider delayDuration={0}>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src="undefined"/>
                                        <AvatarFallback>
                                            <img
                                                src={`https://ui-avatars.com/api/?background=random&name=${encodeURIComponent('charis')}`}
                                                alt="avatar-fallback"/>
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <div className="flex gap-4">
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <DropdownMenuItem
                                                    onClick={() => setTheme("light")}
                                                    className={cn(buttonVariants({
                                                        variant: 'ghost',
                                                        size: 'icon'
                                                    }), 'cursor-pointer')}
                                                >
                                                    <Sun className="w-5 h-5"/>
                                                </DropdownMenuItem>
                                            </TooltipTrigger>
                                            <TooltipContent>Terang</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <DropdownMenuItem
                                                    onClick={() => setTheme("dark")}
                                                    className={cn(buttonVariants({
                                                        variant: 'ghost',
                                                        size: 'icon'
                                                    }), 'cursor-pointer')}
                                                >
                                                    <Moon className="w-5 h-5"/>
                                                </DropdownMenuItem>
                                            </TooltipTrigger>
                                            <TooltipContent>Gelap</TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <DropdownMenuItem
                                                    onClick={() => setTheme("system")}
                                                    className={cn(buttonVariants({
                                                        variant: 'ghost',
                                                        size: 'icon'
                                                    }), 'cursor-pointer')}
                                                >
                                                    <Monitor className="w-5 h-5"/>
                                                </DropdownMenuItem>
                                            </TooltipTrigger>
                                            <TooltipContent>Sistem</TooltipContent>
                                        </Tooltip>
                                    </div>
                                    <DropdownMenuSeparator/>
                                    <Button
                                        variant="ghost"
                                        className="flex gap-4 w-full"
                                        size="icon"
                                        onClick={handleLogout}
                                    >
                                        <span>Keluar</span>
                                        <LogOut/>
                                    </Button>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TooltipProvider>
                    </div>
                </div>
            </nav>
            <Separator/>
        </>
    );
};

export default TopNav;