import { Outlet } from "react-router-dom"

import Header from "./components/header"
import { Toaster } from "react-hot-toast"
import { UserProvider } from "./hooks/userInfo"



const Layout = () => {
    return (
        <main>
            <UserProvider>
                <Header />
                <Outlet />
                <Toaster />
            </UserProvider>

        </main>
    )
}

export default Layout