import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Index from './create-trip'
import Header from './components/custom/Header'
import { Toaster } from './components/ui/sonner'
import { ClerkProvider } from '@clerk/clerk-react'
import ViewTrip from './view-trip/[tripid]/ViewTrip'
// import 'leaflet/dist/leaflet.css';


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>
  },
  {
    path:'/create-trip',
    element: <Index/>
  },
  {
    path:'/view-trip/:tripid',
    element: <ViewTrip/>

  }
])


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
    <Header/>
    <Toaster/> 
    <RouterProvider router={router}/>
    </ClerkProvider>
  </StrictMode>,
)
