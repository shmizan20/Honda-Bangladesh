import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/layout/Footer/Footer';
import Home from './pages/Home/Home';
import ProductDetails from './features/product-detail/ProductDetails/ProductDetails';
import ProductsPage from './pages/ProductsListPage/ProductsListPage';

/**
 * Main Application Component
 * Refactored to follow Senior Frontend Developer standards
 * Using modular page and layout components
 */
function App() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [currentView, setCurrentView] = useState('home'); // 'home' | 'details' | 'products'
    const [selectedBike, setSelectedBike] = useState(null);

    // History/Back-button handling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handlePopState = (event) => {
            if (event.state) {
                setCurrentView(event.state.view || 'home');
                setSelectedBike(event.state.bike || null);
            } else {
                setCurrentView('home');
                setSelectedBike(null);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('popstate', handlePopState);
        
        // Initial state set
        window.history.replaceState({ view: 'home', bike: null }, '');

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    // Handlers
    const handleExplore = (bike) => {
        setSelectedBike(bike);
        setCurrentView('details');
        window.history.pushState({ view: 'details', bike }, '');
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setCurrentView('home');
        window.history.pushState({ view: 'home', bike: null }, '');
        window.scrollTo(0, 0);
    };

    const handleNavigateProducts = () => {
        setCurrentView('products');
        window.history.pushState({ view: 'products', bike: null }, '');
        window.scrollTo(0, 0);
    };

    return (
        <div className="app-container">
            <Navbar 
                scrolled={scrolled} 
                mobileMenuOpen={mobileMenuOpen} 
                setMobileMenuOpen={setMobileMenuOpen}
                currentView={currentView}
                navigateToHome={handleBack}
                navigateToProducts={handleNavigateProducts}
            />

            <main>
                {currentView === 'home' && (
                    <Home 
                        onExplore={handleExplore} 
                        onNavigateProducts={handleNavigateProducts}
                    />
                )}
                
                {currentView === 'products' && (
                    <ProductsPage onExplore={handleExplore} />
                )}
                
                {currentView === 'details' && (
                    <ProductDetails bike={selectedBike} onBack={handleBack} />
                )}
            </main>

            <Footer />
        </div>
    );
}

export default App;
