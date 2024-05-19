import {createLazyFileRoute, Link} from '@tanstack/react-router'
import {Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage} from "@/components/ui/breadcrumb.tsx";
import {DataTable} from "@/components/data-tables/data-table.tsx";
import {columns} from "@/components/page/menus/columns.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useMenuTable} from "@/components/page/menus/hooks/use-menu-table.ts";

export const Route = createLazyFileRoute('/_authenticated/menus/')({
    component: Menus
})

function Menus() {

    const hooks = useMenuTable()

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Menu</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <header className="flex justify-between">
                <div>
                    <h1 className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-bold text-3xl">Menu</h1>
                </div>

                <Button asChild>
                    <Link to='/menus/tambah'>Tambah Menu</Link>
                </Button>
            </header>
            <Card className="p-4 bg-primary-foreground">
                <DataTable columns={columns} hooks={hooks}/>
            </Card>
        </>
    )
}