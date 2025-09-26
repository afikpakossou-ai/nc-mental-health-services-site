import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Blog from './components/Blog';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import ADHDSubscription from './components/ADHDSubscription';
import LiveChat from './components/LiveChat';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Services />
              <ADHDSubscription />
              <About />
              <Blog />
              <FAQ />
              <Testimonials />
              <Contact />
            </>
          } />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Footer />
        <LiveChat />
      </div>
    </Router>
  );
}

export default App;