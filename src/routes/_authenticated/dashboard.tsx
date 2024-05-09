import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/dashboard')({
    component: Dashboard
})

function Dashboard() {

    return (
        <h1>Samlekom</h1>
    )
}