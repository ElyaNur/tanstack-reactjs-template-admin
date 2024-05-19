import {Card} from "@/components/ui/card.tsx";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";

const ShowPermission = ({permissionId}: { permissionId: string }) => {
    const {data: permission} = useQuery({
        queryKey: ['permissions', permissionId],
        queryFn: () => client.get(`/permissions/${permissionId}`, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }).then((res) => res.data)
    })

    return (
        <Card className="p-4 bg-primary-foreground grid grid-cols-2 gap-4">
            <div className="flex flex-col w-full gap-1.5">
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" value={permission?.data.name} disabled/>
            </div>
        </Card>
    );
};

export default ShowPermission;