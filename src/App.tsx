import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Features } from './pages/Features';
import { Documentation } from './pages/Documentation';
import { Contact } from './pages/Contact';
import { CloudPage } from './pages/Cloud';
import { Demo } from './pages/Demo';
import { Pricing } from './pages/Pricing';
import { Blog } from './pages/Blog';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { JobDetails } from './components/cloud/JobDetails';
import { AuthProvider } from './contexts/AuthContext';
import { QueryProvider } from './providers/QueryProvider';
import { Suspense } from 'react';
import { LoadingSpinner } from './components/shared/LoadingSpinner';

export function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/features" element={<Features />} />
                <Route path="/docs" element={<Documentation />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cloud" element={<CloudPage />} />
                <Route path="/cloud/jobs/:id" element={<JobDetails />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<div>Page not found</div>} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;