import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import App from "@/app.tsx";

// Create a new router instance


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1
        }
    }
})

const rootElement = document.getElementById('app')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <App/>
                </QueryClientProvider>
            </ThemeProvider>
        </StrictMode>,
    )
}
