import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, Route, 
        createBrowserRouter,
        createRoutesFromElements } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";

        
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import TravelInfo from "./pages/TravelInfo";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();
const router = createBrowserRouter(createRoutesFromElements(
            <Route element={<RootLayout/>}>  
              <Route path="/" element={<Index />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/tours/:slug" element={<TourDetail />} />
              <Route path="/travel-info" element={<TravelInfo />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
          </Route>
))

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />   
      <RouterProvider router ={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
