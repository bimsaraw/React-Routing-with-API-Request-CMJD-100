import { Link,Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <div>
                This is the common Layout
                <Link to="/">Home</Link>
                <Link to="/user">User</Link>
                <Link to="/help">Help</Link>
            </div>

            <Outlet />


            <footer>
                This i
                s footer area
            </footer>
        </div>
    )
}

export default Layout;