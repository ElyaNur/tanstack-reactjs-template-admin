import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "@tanstack/react-router";
import {Eye, SquarePen} from "lucide-react";
import DeleteButton from "@/components/data-tables/delete-button.tsx";

function ActionColumn({url, queryKey}: { url: string, queryKey?: string[] }) {
    return (
        <div className="flex items-center gap-3">
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size="icon" variant="outline">
                            <Link to={url}>
                                <Eye className="w-4 h-4"/>
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Lihat</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button size="icon">
                            <Link to={`${url}/edit`}>
                                <SquarePen className="w-4 h-4"/>
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Edit</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DeleteButton url={url} queryKey={queryKey}/>
        </div>
    );
}

export default ActionColumn;