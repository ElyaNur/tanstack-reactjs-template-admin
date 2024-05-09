import {ChevronDown, LucideIcon} from "lucide-react"

import {cn} from "@/lib/utils.ts"
import {Button, buttonVariants} from "@/components/ui/button.tsx"
import {Link} from "@tanstack/react-router";
import {ReactNode, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";

interface NavProps {
    isCollapsed: boolean
    links: {
        title?: string
        icon: LucideIcon
        group: {
            title: string
            label?: string
            icon: LucideIcon
            variant: "default" | "ghost"
        }[]
    }[],
}

export function Nav({links, isCollapsed}: NavProps) {
    return (
        <nav
            data-collapsed={isCollapsed}
            className="group flex flex-col px-8 overflow-auto h-[93%]">
            <ul className="-mx-2 lg:flex hidden flex-col gap-y-5 group-[[data-collapsed=true]]:gap-y-4 group-[[data-collapsed=true]]:items-center group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) => isCollapsed ? (
                        <NavGroupCollapse title={link.title} icon={link.icon} key={index}>
                            {link.group.map((link, index) => (
                                <li className="flex flex-col" key={index}>
                                    <Link
                                        href="#"
                                        className={cn(
                                            buttonVariants({variant: link.variant, size: "sm"}),
                                            link.variant === "default" &&
                                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                            "justify-start"
                                        )}
                                    >
                                        <link.icon className="mr-2 h-4 w-4"/>
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
                        </NavGroupCollapse>
                    ) : (
                        <NavGroup title={link.title} icon={link.icon} key={index}>
                            {link.group.map((link, index) => (
                                <li className="flex flex-col" key={index}>
                                    <Link
                                        href="#"
                                        className={cn(
                                            buttonVariants({variant: link.variant, size: "sm"}),
                                            link.variant === "default" &&
                                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                            "justify-start"
                                        )}
                                    >
                                        <link.icon className="mr-2 h-4 w-4"/>
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
                {links.map((link, index) => (
                    <NavGroupCollapse title={link.title} icon={link.icon} key={index}>
                        {link.group.map((link, index) => (
                            <li className="flex flex-col" key={index}>
                                <Link
                                    href="#"
                                    className={cn(
                                        buttonVariants({variant: link.variant, size: "sm"}),
                                        link.variant === "default" &&
                                        "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                        "justify-start"
                                    )}
                                >
                                    <link.icon className="mr-2 h-4 w-4"/>
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
                    </NavGroupCollapse>
                ))}
            </ul>
        </nav>
    )
}

const NavGroup = ({
                      title, icon:
        Icon, children
                  }: {
    title?: string, icon
        :
        LucideIcon, children
        :
        ReactNode
}) => {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <li className="flex flex-col gap-y-1">
            {title && (
                <div className="flex items-center gap-x-3 px-2 py-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    <span className="flex-1 font-semibold flex gap-2">
                        <Icon className="h-6 w-6"/>
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

const NavGroupCollapse = ({title, icon: Icon, children}: { title?: string, icon: LucideIcon, children: ReactNode }) => {
    return (
        <li className="flex flex-col gap-y-1">
            {title ? (
                <Popover>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Icon className="h-4 w-4"/>
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
            ) : <ul className="flex flex-col gap-y-1">children</ul>}
        </li>
    )
}