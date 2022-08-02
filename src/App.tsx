import './scss/app.scss';
import {Route, Routes} from "react-router-dom";
import * as React from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import FullPizza from "./pages/FullPizza";
import NotFoundBlock from "./components/NotFoundBlock";

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<MainLayout/>}>
                <Route path={''} element={<Home/>}/>
                <Route path={'cart'} element={<Cart/>}/>
                <Route path={'pizza/:id'} element={<FullPizza/>}/>
                <Route path={'*'} element={<NotFoundBlock/>}/>
            </Route>
        </Routes>
    );
}

export default App;
