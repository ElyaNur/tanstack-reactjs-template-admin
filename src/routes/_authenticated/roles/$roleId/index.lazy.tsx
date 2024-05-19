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
import ShowRole from "@/components/page/roles/show-role.tsx";

export const Route = createLazyFileRoute('/_authenticated/roles/$roleId/')({
    component: Show
})

function Show() {
    const {roleId} = Route.useParams()

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/roles">Role</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Lihat Role</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <header className="flex justify-between">
                <div>
                    <h1 className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-bold text-3xl">
                        Lihat Role
                    </h1>
                </div>
                <Button>
                    <Link to={`/roles/${roleId}/edit`}>Edit</Link>
                </Button>
            </header>
            <ShowRole roleId={roleId}/>
        </>
    )
}