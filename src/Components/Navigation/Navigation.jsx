import React, { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import LoaderContext from '../../Context/Loader.context.js';
import Refer from '../Pages/Refer/Refer';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/refer",
        element: <Refer />
    }
]);

export default function Navigation() {
    const [loader, setLoader] = useState(true);

    return (
        <LoaderContext.Provider value={{ loader, setLoader }}>
            <RouterProvider router={router} />
        </LoaderContext.Provider>
    )
}