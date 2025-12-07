import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, Route, 
        createBrowserRouter,
        createRoutesFromElements } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import { AuthProvider } from "@/hooks/useAuth";

        
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import TravelInfo from "./pages/TravelInfo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy"
import ErrorElement from "./pages/ErrorElement";

import Auth from "./pages/Auth";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Bookings from "./pages/admin/Bookings";
import DestinationsAdmin from "./pages/admin/Destinations";


const queryClient = new QueryClient();
const router = createBrowserRouter(createRoutesFromElements(
            <Route element={<RootLayout/>} errorElement={<ErrorElement/>}>  
              <Route path="/" element={<Index />}  errorElement={<ErrorElement/>}/>
              <Route path="/destinations" element={<Destinations />}  errorElement={<ErrorElement/>}/>
              <Route path="/tours" element={<Tours />}  errorElement={<ErrorElement/>}/>
              <Route path="/tours/:slug" element={<TourDetail />}  errorElement={<ErrorElement/>}/>
              <Route path="/travel-info" element={<TravelInfo />}  errorElement={<ErrorElement/>}/>
              <Route path="/about" element={<About />}  errorElement={<ErrorElement/>}/>
              <Route path="/contact" 
                  element={<Contact />} 
                  errorElement={<ErrorElement/>}
              />
              <Route path="/privacy" element={<PrivacyPolicy/>} errorElement={<ErrorElement/>}/>
              <Route path="/terms" element={<TermsOfService/>} errorElement={<ErrorElement/>}/>
              <Route path="/auth" element={<Auth />}
               errorElement={<ErrorElement/>}
               />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} errorElement={<ErrorElement/>}/>
                <Route path="bookings" element={<Bookings />} errorElement={<ErrorElement/>}/>
                <Route path="destinations" element={<DestinationsAdmin />} errorElement={<ErrorElement/>} />
              </Route>
              <Route path="*" element={<NotFound />} />
          </Route>
))

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />   
        <RouterProvider router ={router} />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
