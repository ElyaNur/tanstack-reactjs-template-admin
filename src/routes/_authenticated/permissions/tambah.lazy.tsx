import {createLazyFileRoute, Link} from '@tanstack/react-router'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb.tsx";
import TambahPermission from "@/components/page/permissions/tambah-permission.tsx";

export const Route = createLazyFileRoute('/_authenticated/permissions/tambah')({
    component: Tambah
})

function Tambah() {
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
                        <BreadcrumbPage>Tambah Permission</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <header className="flex justify-between">
                <div>
                    <h1 className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-bold text-3xl">
                        Tambah Permission
                    </h1>
                </div>
            </header>
            <TambahPermission/>
        </>
    )
}