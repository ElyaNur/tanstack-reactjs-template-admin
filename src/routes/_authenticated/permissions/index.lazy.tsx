import {createLazyFileRoute, Link} from '@tanstack/react-router'
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Card} from "@/components/ui/card.tsx";
import {columns} from "@/components/page/permissions/columns.tsx";
import {DataTable} from "@/components/data-tables/data-table.tsx";
import {usePermissionTable} from "@/components/page/permissions/hooks/use-permission-table.ts";

export const Route = createLazyFileRoute('/_authenticated/permissions/')({
    component: Permissions
})

function Permissions() {

    const hooks = usePermissionTable()

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Permission</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <header className="flex justify-between">
                <div>
                    <h1 className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-bold text-3xl">Permission</h1>
                </div>

                <Button asChild>
                    <Link to='/permissions/tambah'>Tambah Permission</Link>
                </Button>
            </header>
            <Card className="p-4 bg-primary-foreground">
                <DataTable columns={columns} hooks={hooks}/>
            </Card>
        </>
    )
}