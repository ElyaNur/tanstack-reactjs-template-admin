import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Loader2, TriangleAlert} from "lucide-react";
import {ReactNode} from "react";

type DeleteButtonWithAlertProps = {
    isLoading: boolean
    onClick: () => void
    children: ReactNode
}

const DeleteButtonWithAlert = ({isLoading, onClick, children}: DeleteButtonWithAlertProps) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Apakah anda yakin ingin menghapus data ini?
                    </DialogTitle>
                    <DialogDescription className="text-center">
                        Tindakan ini tidak bisa dibatalkan. Ini akan menghapus data secara permanen!
                    </DialogDescription>
                </DialogHeader>
                <TriangleAlert className="h-16 text-primary flex justify-center w-full"/>
                <DialogFooter className="sm:justify-center">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="button" variant="destructive" disabled={isLoading} onClick={onClick}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                    Please wait...
                                </>
                            ) : 'Delete'}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteButtonWithAlert;