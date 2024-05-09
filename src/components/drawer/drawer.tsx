import {Transition} from '@headlessui/react'
import {useNavigationStore} from "@/store/store.ts";
import {cn} from "@/lib/utils.ts";
import Header from "@/components/drawer/header.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import Body from "@/components/drawer/body.tsx";

const Drawer = () => {
    const {setIsOpen, isOpen} = useNavigationStore(state => ({
        setIsOpen: state.setIsNotificationOpen,
        isOpen: state.isNotificationOpen
    }))

    return (
        <>
            <div
                className={cn("fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden", !isOpen && "hidden")}>
                <div className="fixed inset-0 bg-gray-950/50 dark:bg-gray-950/75 cursor-pointer"></div>
            </div>
            <Transition
                show={isOpen}
                enter="transition-transform duration-300 ease-in-out"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition-transform duration-300 ease-in-out"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
            >
                <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden">
                    <div className="fixed inset-0 cursor-pointer"
                         onClick={() => setIsOpen(false)}></div>
                    <div className="pointer-events-none relative w-full transition">
                        <div
                            className="pointer-events-auto relative flex w-full cursor-default flex-col bg-primary-foreground shadow-xl ring-1 ring-gray-950/5 ms-auto overflow-y-auto h-screen max-w-md">
                            <Header/>
                            <Separator/>
                            <Body/>
                        </div>
                    </div>
                </div>
            </Transition>
        </>
    );
};

export default Drawer;