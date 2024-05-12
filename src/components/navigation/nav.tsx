import {ChevronDown, LucideIcon} from "lucide-react"
import {cn} from "@/lib/utils.ts"
import {Button, buttonVariants} from "@/components/ui/button.tsx"
import {Link} from "@tanstack/react-router";
import {ReactNode, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {MenuItem} from "@/store/store.ts";

type NavProps = {
    isCollapsed: boolean
    links: MenuItem[]
}

export function Nav({links, isCollapsed}: NavProps) {
    return (
        <nav
            data-collapsed={isCollapsed}
            className="group flex flex-col px-8 overflow-auto h-[93%]">
            <ul className="-mx-2 mt-4 lg:flex hidden flex-col gap-y-5 group-[[data-collapsed=true]]:gap-y-4 group-[[data-collapsed=true]]:items-center group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((parent, index) => isCollapsed ? (
                        <NavCollapse key={index} parent={parent}/>
                    ) : (
                        <NavGroup title={parent.title} icon={parent.icon} key={index}>
                            {parent.group.map((link, index) => (
                                <li className="flex flex-col" key={index}>
                                    <Link
                                        to={link.path || "#"}
                                        className={cn(
                                            buttonVariants({variant: link.variant,}),
                                            link.variant === "default" &&
                                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                            "justify-start"
                                        )}
                                    >
                                        <ChevronDown className="mr-2h-4 w-4"/>
                                        {link.title}
                                        {link.label && (
                                            <span
                                                className={cn(
                                                    "ml-auto",
                                                    link.variant === "default" &&
                                                    "text-background dark:text-white"
                                                )}
                                            >
                                              {link.label}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            ))}
                        </NavGroup>
                    )
                )}
            </ul>
            <ul className="-mx-2 flex flex-col gap-y-4 items-center justify-center px-2 lg:hidden">
                {links.map((parent, index) => (
                    <NavCollapse key={index} parent={parent}/>
                ))}
            </ul>
        </nav>
    )
}

const NavGroup = ({title, icon, children}: {
    title?: string,
    icon?: LucideIcon,
    children: ReactNode
}) => {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <li className="flex flex-col gap-y-1">
            {title && (
                <div className="flex items-center gap-x-3 px-2 py-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <span className="flex-1 font-semibold flex gap-2">
                        {icon && <ChevronDown className="h-6 w-6"/>}
                        {title}
                    </span>
                    <Button variant="ghost" size="icon">
                        <ChevronDown className={cn("h-4 w-4 transition-all transform", !isOpen && "rotate-180")}/>
                    </Button>
                </div>
            )}
            <ul className={cn(
                "flex flex-col gap-y-1 max-h-screen transition-all duration-300 ease-in-out",
                !isOpen && 'max-h-0 overflow-hidden'
            )}>
                {children}
            </ul>
        </li>
    )
}

const NavGroupCollapse = ({title, icon, children}: {
    title?: string,
    icon?: LucideIcon,
    children: ReactNode
}) => {
    return (
        <li className="flex flex-col gap-y-1">
            {title ? (
                <Popover>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    {icon && <ChevronDown className="h-4 w-4"/>}
                                </Button>
                            </PopoverTrigger>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            {title}
                        </TooltipContent>
                    </Tooltip>
                    <PopoverContent className="w-80" side="right" align="start">
                        <ul className="flex flex-col gap-y-1">
                            {children}
                        </ul>
                    </PopoverContent>
                </Popover>
            ) : (
                <ul className="flex flex-col gap-y-1">
                    {children}
                </ul>
            )}
        </li>
    )
}

type NavCollapseProps = {
    title?: string
    icon?: LucideIcon
    group: {
        title: string
        label?: string
        icon: LucideIcon
        variant: "default" | "ghost"
        path?: string
    }[]
}

const NavCollapse = ({parent}: { parent: NavCollapseProps }) => {
    return (
        <NavGroupCollapse title={parent.title} icon={parent.icon}>
            {parent.group.map((link, index) => parent.title ? (
                <li className="flex flex-col" key={index}>
                    <Link
                        to={link.path || "#"}
                        className={cn(
                            buttonVariants({variant: link.variant, size: "sm"}),
                            link.variant === "default" &&
                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                            "justify-start"
                        )}
                    >
                        <ChevronDown className="mr-2 h-4 w-4"/>
                        {link.title}
                        {link.label && (
                            <span
                                className={cn(
                                    "ml-auto",
                                    link.variant === "default" &&
                                    "text-background dark:text-white"
                                )}
                            >
                              {link.label}
                            </span>
                        )}
                    </Link>
                </li>
            ) : (
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <ChevronDown className="h-4 w-4"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        {link.title}
                    </TooltipContent>
                </Tooltip>
            ))}
        </NavGroupCollapse>
    )
}