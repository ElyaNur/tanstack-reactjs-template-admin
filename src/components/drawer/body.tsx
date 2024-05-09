import {CircleCheck, X} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

const Body = () => {
    return (
        <div className="flex flex-col gap-y-4 py-6 flex-1 px-6">
            <ul className="-mx-6 -mt-6 divide-y divide-gray-200 dark:divide-white/10 -mb-6">
                <li className="relative before:absolute before:start-0 before:h-full before:w-0.5 before:bg-primary dark:before:bg-primary">
                    <div>
                        <div className="flex w-full gap-3 p-3 ">
                            <CircleCheck className="w-6 h-6 dark:text-green-500 text-green-700"/>
                            <div className="mt-0.5 grid flex-1">
                                <h3 className="text-sm font-medium">Import Berhasil</h3>
                                <time className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    4 bulan yang lalu
                                </time>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Import berhasil.
                                </p>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="p-0"
                            >
                                <X className="w-4 h-4"/>
                            </Button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default Body;