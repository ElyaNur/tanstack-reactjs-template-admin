import {createLazyFileRoute, Link} from '@tanstack/react-router'
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {columns} from "@/components/page/users/columns.tsx";
import {DataTable} from "@/components/data-tables/data-table.tsx";
import {useUserTable} from "@/components/page/users/hooks/use-user-table.ts";

export const Route = createLazyFileRoute('/_authenticated/users/')({
    component: Users
})

function Users() {
    const hooks = useUserTable()

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>User</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <header className="flex justify-between">
                <div>
                    <h1 className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-bold text-3xl">User</h1>
                </div>

                <Button asChild>
                    <Link to='/users/tambah'>Tambah User</Link>
                </Button>
            </header>
            <Card className="p-4 bg-primary-foreground">
                <DataTable columns={columns} hooks={hooks}/>
            </Card>
        </>
    )
}