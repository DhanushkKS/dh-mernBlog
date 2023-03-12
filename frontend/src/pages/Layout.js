import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = (props) => {
   
    return (
        <main>
            <Header/>
            <Outlet/>
        </main>
      );
}
 
export default Layout;