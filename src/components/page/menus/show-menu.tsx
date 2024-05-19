import {Card} from "@/components/ui/card.tsx";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Badge} from "@/components/ui/badge.tsx";

const ShowMenu = ({menuId}: { menuId: string }) => {
    const {data: menu} = useQuery({
        queryKey: ['menus', menuId],
        queryFn: () => client.get(`/menus/${menuId}`, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }).then((res) => res.data)
    })

    return (
        <Card className="p-4 bg-primary-foreground grid grid-cols-2 gap-4">
            <div className="flex flex-col w-full gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" value={menu?.data.name} disabled/>
            </div>

            <div className="flex flex-col w-full gap-1.5">
                <Label htmlFor="icon">Icon</Label>
                <Input type="text" id="icon" value={menu?.data.icon} disabled/>
            </div>

            <div className="flex flex-col w-full gap-1.5">
                <Label htmlFor="sort">Sort</Label>
                <Input type="number" id="sort" value={menu?.data.sort} disabled/>
            </div>

            <div className="flex flex-col w-full gap-1.5">
                <Label htmlFor="path">Path</Label>
                <Input type="text" id="path" value={menu?.data.path} disabled/>
            </div>

            <div className="flex flex-col w-full gap-1.5">
                <Label htmlFor="parent">Parent</Label>
                <Input type="text" id="parent" value={menu?.data.parent?.name} disabled/>
            </div>

            <div className="flex flex-col w-full gap-1.5">
                <Label htmlFor="permission">Permissions</Label>
                <div>
                    {menu?.data.permissions.map((permission: { [key: string]: string }) => (
                        <Badge key={permission.id}>{permission.name}</Badge>
                    ))}
                    {menu?.data.permissions.length === 0 && <Badge>No Permission</Badge>}
                </div>
            </div>
        </Card>
    );
};

export default ShowMenu;