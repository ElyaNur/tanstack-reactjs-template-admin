import {createLazyFileRoute} from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/menus')({
    component: Menus
})

function Menus() {
    return (
        <>
            <header>
                <div>
                    <h1 className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-bold text-3xl">Menu</h1>
                </div>
            </header>
        </>
    )
}