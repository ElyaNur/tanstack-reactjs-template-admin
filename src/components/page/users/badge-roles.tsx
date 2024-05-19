import {useEffect, useMemo, useState} from "react";
import {UserData} from "@/components/page/users/columns.tsx";
import {Badge} from "@/components/ui/badge.tsx";

const BadgeRoles = ({user}: { user: UserData }) => {
    const [roles, setPermissions] = useState(
        user.roles.slice(0, 3) || []
    );
    const [clickSeeMore, setClickSeeMore] = useState(false);

    const isSeeMore = useMemo(
        () => user.roles.length > 3,
        [user.roles]
    );

    useEffect(() => {
        if (clickSeeMore) {
            setPermissions(user.roles || []);
        } else {
            setPermissions(user.roles.slice(0, 3) || []);
        }
    }, [clickSeeMore, user.roles]);

    return (
        <div className="max-w-lg">
            {roles.map(role => (
                <Badge
                    key={role.id}
                    className="rounded-md p-1 border-2 border-slate-700"
                >
                    {role.name}
                </Badge>
            ))}
            {isSeeMore && (
                <Badge
                    className="rounded-md p-1 border-2 border-slate-700 bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
                    onClick={() => setClickSeeMore(!clickSeeMore)}
                >
                    {clickSeeMore ? "See less" : "See more..."}
                </Badge>
            )}
        </div>
    );
};

export default BadgeRoles;