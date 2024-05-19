import {useEffect, useMemo, useState} from "react";
import {MenuData} from "@/components/page/menus/columns.tsx";
import {Badge} from "@/components/ui/badge.tsx";

const BadgePermissions = ({menu}: { menu: MenuData }) => {
    const [permissions, setPermissions] = useState(
        menu.permissions.slice(0, 3) || []
    );
    const [clickSeeMore, setClickSeeMore] = useState(false);

    const isSeeMore = useMemo(
        () => menu.permissions.length > 3,
        [menu.permissions]
    );

    useEffect(() => {
        if (clickSeeMore) {
            setPermissions(menu.permissions || []);
        } else {
            setPermissions(menu.permissions.slice(0, 3) || []);
        }
    }, [clickSeeMore, menu.permissions]);

    return (
        <div className="max-w-lg">
            {permissions.map(permission => (
                <Badge
                    key={permission.id}
                    className="rounded-md p-1 border-2 border-slate-700"
                >
                    {permission.name}
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

export default BadgePermissions;