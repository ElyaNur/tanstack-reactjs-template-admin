import {createLazyFileRoute, Link} from '@tanstack/react-router'
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import {Card} from "@/components/ui/card.tsx";
import {columns} from "@/components/page/roles/columns.tsx";
import {DataTable} from "@/components/data-tables/data-table.tsx";
import {useRoleTable} from "@/components/page/roles/hooks/use-role-table.ts";
import {Button} from "@/components/ui/button.tsx";

export const Route = createLazyFileRoute('/_authenticated/roles/')({
    component: Roles
})

function Roles() {

    const hooks = useRoleTable()

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Role</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <header className="flex justify-between">
                <div>
                    <h1 className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-bold text-3xl">Role</h1>
                </div>

                <Button asChild>
                    <Link to='/roles/tambah'>Tambah Role</Link>
                </Button>
            </header>
            <Card className="p-4 bg-primary-foreground">
                <DataTable columns={columns} hooks={hooks}/>
            </Card>
        </>
    )
}