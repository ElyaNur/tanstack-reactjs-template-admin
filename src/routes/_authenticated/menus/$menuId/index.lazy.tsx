import {createLazyFileRoute, Link} from '@tanstack/react-router'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import {Button} from "@/components/ui/button.tsx";
import ShowMenu from "@/components/page/menus/show-menu.tsx";

export const Route = createLazyFileRoute('/_authenticated/menus/$menuId/')({
    component: Show
})

function Show() {
    const {menuId} = Route.useParams()

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/menus">Menu</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Lihat Menu</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <header className="flex justify-between">
                <div>
                    <h1 className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-bold text-3xl">
                        Lihat Menu
                    </h1>
                </div>
                <Button>
                    <Link to={`/menus/${menuId}/edit`}>Edit</Link>
                </Button>
            </header>
            <ShowMenu menuId={menuId}/>
        </>
    )
}