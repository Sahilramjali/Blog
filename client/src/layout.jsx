import { Outlet } from "react-router-dom"

import Header from "./components/header"
import { Toaster } from "react-hot-toast"



const Layout = () => {
    return (
        <main>
            <Header />
            <Outlet />
           <Toaster/>
        </main>
    )
}

export default Layout