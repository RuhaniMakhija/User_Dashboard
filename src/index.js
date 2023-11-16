import React,{lazy,Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
// import AccountCreate from './components/AccountCreate';
// import UserDetails from './components/UserDetails';


const UserDetails=lazy(()=>import('./components/UserDetails'))
const AccountCreate = lazy(() => import('./components/AccountCreate'));

const appRouter=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Suspense fallback={<h1>Loading</h1>}><UserDetails/></Suspense>
            },
            {
                path:"/create",
                element:<Suspense fallback={<h1>Loading</h1>}><AccountCreate /></Suspense>
            }
        ],
        errorElement:<h1>Error</h1>
    }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <RouterProvider router={appRouter}/>
  
);


