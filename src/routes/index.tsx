import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
    beforeLoad: ({context}) => {
        const {isLogged} = context.auth;
        throw redirect({
            to: !isLogged ? '/login' : '/dashboard',
        })
    },
    component: Home,
})

function Home() {
    return <div>Home</div>
}