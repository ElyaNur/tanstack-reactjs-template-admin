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
import ShowUser from "@/components/page/users/show-user.tsx";

export const Route = createLazyFileRoute('/_authenticated/users/$userId/')({
    component: Show
})

function Show() {
    const {userId} = Route.useParams()

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/users">User</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbPage>Lihat User</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <header className="flex justify-between">
                <div>
                    <h1 className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-bold text-3xl">
                        Lihat User
                    </h1>
                </div>
                <Button>
                    <Link to={`/users/${userId}/edit`}>Edit</Link>
                </Button>
            </header>
            <ShowUser userId={userId}/>
        </>
    )
}