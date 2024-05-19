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
import ShowPermission from "@/components/page/permissions/show-permission.tsx";

export const Route = createLazyFileRoute('/_authenticated/permissions/$permissionId/')({
    component: Show
})

function Show() {
    const {permissionId} = Route.useParams()

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/permissions">Permission</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Lihat Permission</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <header className="flex justify-between">
                <div>
                    <h1 className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-bold text-3xl">
                        Lihat Permission
                    </h1>
                </div>
                <Button>
                    <Link to={`/permissions/${permissionId}/edit`}>Edit</Link>
                </Button>
            </header>
            <ShowPermission permissionId={permissionId}/>
        </>
    )
}