import {Card} from "@/components/ui/card.tsx";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/common/client.ts";
import {useAuthStore} from "@/store/store.ts";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Badge} from "@/components/ui/badge.tsx";

const ShowUser = ({userId}: { userId: string }) => {
    const {data: user} = useQuery({
        queryKey: ['users', userId],
        queryFn: () => client.get(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${useAuthStore.getState().accessToken}`
            }
        }).then((res) => res.data)
    })

    return (
        <Card className="p-4 bg-primary-foreground grid grid-cols-2 gap-4">
            <div className="flex flex-col w-full gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" value={user?.data.username} disabled/>
            </div>

            <div className="flex flex-col w-full gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="text" id="email" value={user?.data.email} disabled/>
            </div>

            <div className="flex flex-col w-full gap-1.5">
                <Label htmlFor="permission">Roles</Label>
                <div>
                    {user?.data.roles.map((role: { [key: string]: string }) => (
                        <Badge key={role.id}>{role.name}</Badge>
                    ))}
                    {user?.data.roles.length === 0 && <Badge>No Roles</Badge>}
                </div>
            </div>
        </Card>
    );
};

export default ShowUser;