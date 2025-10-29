import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./pages/dashboard/components/ProtectedRoute";
import { DomainRedirect } from "./components/DomainRedirect";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import PricingPage from "./pages/PricingPage";
import ConnectPage from "./pages/ConnectPage";
import AccessPage from "./pages/AccessPage";
import DashboardHomePage from "./pages/dashboard/DashboardHomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import BuyCreditsPage from "./pages/dashboard/BuyCreditsPage";
import ComingSoonPage from "./pages/dashboard/ComingSoonPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
              {/* Public Marketing Routes - Only on main domain */}
              <Route path="/" element={<DomainRedirect type="marketing"><HomePage /></DomainRedirect>} />
              <Route path="/product" element={<DomainRedirect type="marketing"><ProductPage /></DomainRedirect>} />
              <Route path="/pricing" element={<DomainRedirect type="marketing"><PricingPage /></DomainRedirect>} />
              <Route path="/connect" element={<DomainRedirect type="marketing"><ConnectPage /></DomainRedirect>} />
              
              {/* Auth Routes - Only on app subdomain */}
              <Route path="/access" element={<DomainRedirect type="app"><AccessPage /></DomainRedirect>} />
              
              {/* Protected Dashboard Routes - Only on app subdomain */}
              <Route 
                path="/dashboard" 
                element={
                  <DomainRedirect type="app">
                    <ProtectedRoute>
                      <DashboardHomePage />
                    </ProtectedRoute>
                  </DomainRedirect>
                } 
              />
            <Route 
              path="/dashboard/sales-navigator" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/buy-credits" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <BuyCreditsPage />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/url-enrichment"
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="URL Enrichment" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/email-finder" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Email Finder" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/email-verifier" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Email Verifier" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/credits" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Credits" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/team" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Team" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/api" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="API" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            <Route 
              path="/dashboard/account" 
              element={
                <DomainRedirect type="app">
                  <ProtectedRoute>
                    <ComingSoonPage title="Account" />
                  </ProtectedRoute>
                </DomainRedirect>
              } 
            />
            
              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
  </QueryClientProvider>
);

export default App;
