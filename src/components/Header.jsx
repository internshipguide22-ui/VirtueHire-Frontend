// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Login from "./Login";


// const Header = () => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [showLoginModal, setShowLoginModal] = useState(false);
//     const location = useLocation();

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     const closeMenu = () => {
//         setIsMenuOpen(false);
//     };

//     const toggleLoginModal = () => {
//         setShowLoginModal(!showLoginModal);
//         closeMenu(); // Close mobile menu when opening login
//     };

//     const scrollToSection = (sectionId) => {
//         if (location.pathname === '/') {
//             const target = document.getElementById(sectionId);
//             if (target) {
//                 target.scrollIntoView({
//                     behavior: 'smooth',
//                     block: 'start'
//                 });
//             }
//         } else {
//             window.location.href = `/#${sectionId}`;
//         }
//         closeMenu();
//     };

//     return (
//         <>
//             <header>
//                 <nav className="container">
//                     <div className="logo">
//                         <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
//                             Virtue Hire
//                         </Link>
//                     </div>
//                     <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
//                         <li>
//                             <Link to="/" onClick={closeMenu}>Home</Link>
//                         </li>
//                         <li>
//                             <Link to="/about" onClick={closeMenu}>About</Link>
//                         </li>
//                         <li><Link to="/features" onClick={closeMenu}>Features</Link></li>
//                         <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
//                     </ul>
//                     {/* Updated Login Button */}
//                     <button onClick={toggleLoginModal} className="login-btn">
//                         <i className="fas fa-sign-in-alt"></i>
//                         Login / Register
//                     </button>
//                     <button className="mobile-menu-btn" onClick={toggleMenu}>
//                         <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
//                     </button>
//                 </nav>
//             </header>

//             {/* Login Modal */}
//             {showLoginModal && (
//                 <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
//                     <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button
//                             className="close-button"
//                             onClick={() => setShowLoginModal(false)}
//                         >
//                             <i className="fas fa-times"></i>
//                         </button>
//                         <Login onClose={() => setShowLoginModal(false)} />
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Header;



// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = () => {
            const candidate = localStorage.getItem("candidate");
            const hr = localStorage.getItem("current_hr_user");
            const admin = localStorage.getItem("admin_logged_in");
            const currentUser = localStorage.getItem("currentUser");

            setIsLoggedIn(!!(candidate || hr || admin || currentUser));
        };

        checkAuth();
        // Listen for storage changes in other tabs
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, [location.pathname]); // Re-check on route changes

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const goToLanding = () => {
        navigate("/landing"); // Redirect to LandingPage
        closeMenu(); // Close mobile menu
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/");
        closeMenu();
    };

    const scrollToSection = (sectionId) => {
        if (location.pathname === '/') {
            const target = document.getElementById(sectionId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } else {
            window.location.href = `/#${sectionId}`;
        }
        closeMenu();
    };

    return (
        <header>
            <nav className="container">
                <div className="logo">
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Virtue Hire
                    </Link>
                </div>

                <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                    <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                    <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                    <li><Link to="/features" onClick={closeMenu}>Features</Link></li>
                    <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
                </ul>

                {/* Conditional rendering based on auth state */}
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="login-btn">
                        <i className="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                ) : (
                    <button onClick={goToLanding} className="login-btn">
                        <i className="fas fa-sign-in-alt"></i>
                        Login / Register
                    </button>
                )}

                <button className="mobile-menu-btn" onClick={toggleMenu}>
                    <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </nav>
        </header>
    );
};

export default Header;
