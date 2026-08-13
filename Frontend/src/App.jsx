import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import CTABanner from "./components/CTABanner/CTABanner";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Sitemap from "./pages/Sitemap";

import CCTVInstallation from "./pages/services/CCTVInstallation";
import SignalBoosting from "./pages/services/SignalBoosting";
import TelecomInfrastructure from "./pages/services/TelecomInfrastructure";
import FiberOpticCabling from "./pages/services/FiberOpticCabling";
import NetworkSetup from "./pages/services/NetworkSetup";
import AMCMaintenance from "./pages/services/AMCMaintenance";

import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManageRequests from "./pages/admin/ManageRequests";
import ManageContacts from "./pages/admin/ManageContacts";
import ManageGallery from "./pages/admin/ManageGallery";
import ManageTestimonials from "./pages/admin/ManageTestimonials";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageComments from "./pages/admin/ManageComments";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import Notifications from "./pages/admin/Notifications";

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/sitemap" element={<Sitemap />} />

        {/* Service detail pages */}
        <Route path="/services/cctv-installation" element={<CCTVInstallation />} />
        <Route path="/services/signal-boosting" element={<SignalBoosting />} />
        <Route path="/services/telecom-infrastructure" element={<TelecomInfrastructure />} />
        <Route path="/services/fiber-optic-cabling" element={<FiberOpticCabling />} />
        <Route path="/services/network-setup" element={<NetworkSetup />} />
        <Route path="/services/enterprise-networking" element={<NetworkSetup />} />
        <Route path="/services/amc-maintenance" element={<AMCMaintenance />} />
        <Route path="/services/access-control" element={<AMCMaintenance />} />

        {/* Protected user routes */}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="requests" element={<ManageRequests />} />
          <Route path="contacts" element={<ManageContacts />} />
          <Route path="gallery" element={<ManageGallery />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="comments" element={<ManageComments />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <CTABanner />
      <Footer />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
