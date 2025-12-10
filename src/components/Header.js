import React from 'react';

/**
 * Header Component
 * Displays the app logo and subtitle
 */
function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">
          <span style={{ color: '#fbbc04' }}>K</span>
          <span style={{ color: '#ea4335' }}>e</span>
          <span style={{ color: '#4285f4' }}>e</span>
          <span style={{ color: '#34a853' }}>p</span>
          {' '}Notes
        </h1>
        <p className="app-subtitle">Simple. Beautiful. Organized.</p>
      </div>
    </header>
  );
}

export default Header;
