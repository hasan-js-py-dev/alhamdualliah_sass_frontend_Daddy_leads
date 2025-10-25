import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ProtectedRoute } from "./pages/dashboard/components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import PricingPage from "./pages/PricingPage";
import ConnectPage from "./pages/ConnectPage";
import AccessPage from "./pages/AccessPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ComingSoonPage from "./pages/dashboard/ComingSoonPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Marketing Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            
            {/* Auth Routes */}
            <Route path="/access" element={<AccessPage />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/sales-navigator" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/url-enrichment" 
              element={
                <ProtectedRoute>
                  <ComingSoonPage title="URL Enrichment" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/email-finder" 
              element={
                <ProtectedRoute>
                  <ComingSoonPage title="Email Finder" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/email-verifier" 
              element={
                <ProtectedRoute>
                  <ComingSoonPage title="Email Verifier" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/credits" 
              element={
                <ProtectedRoute>
                  <ComingSoonPage title="Credits" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/team" 
              element={
                <ProtectedRoute>
                  <ComingSoonPage title="Team" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/api" 
              element={
                <ProtectedRoute>
                  <ComingSoonPage title="API" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/account" 
              element={
                <ProtectedRoute>
                  <ComingSoonPage title="Account" />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
