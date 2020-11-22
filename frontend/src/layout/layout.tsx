import React from 'react';
import { Header } from './header';
import { Footer } from './footer';
import './layout.css';

export const Layout: React.FC = ({ children }) => {
  return <div className="layout">
    <Header />
    <div className="content">
      {children}
    </div>
    <Footer />
  </div>;
}
