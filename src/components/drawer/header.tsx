import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {X} from "lucide-react";
import {useNavigationStore} from "@/store/store.ts";

const Header = () => {
    const setOpen = useNavigationStore(state => state.setIsNotificationOpen)
    return (
        <div className="flex px-6 pt-6 sticky top-0 z-10 pb-6 gap-x-5">
            <div className="absolute end-6 top-6">
                <Button
                    variant="ghost"
                    size="icon"
                    className="p-0"
                    onClick={() => setOpen(false)}
                >
                    <X className="w-5 h-5"/>
                </Button>
            </div>
            <div>
                <h2 className="text-base font-semibold leading-6">
                    <span className="relative">
                        Notifikasi
                        <Badge variant="notification" className="-top-1 -right-6">4</Badge>
                    </span>
                </h2>
                <div className="mt-4 flex gap-x-3">
                    <Button size="sm">Tandai semua sudah dibaca</Button>
                    <Button variant="destructive" size="sm">Bersihkan</Button>
                </div>
            </div>
        </div>
    );
};

export default Header;