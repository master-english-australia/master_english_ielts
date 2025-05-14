'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function IELTSTestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if the current path is a test page
  const isTestPage = 
    pathname?.includes('/ielts-tests/writing/') || 
    pathname?.includes('/ielts-tests/reading/') || 
    pathname?.includes('/ielts-tests/listening/') || 
    pathname?.includes('/ielts-tests/speaking/');
  
  // Don't show the header for individual test pages
  if (isTestPage) {
    return <>{children}</>;
  }

  return (
    <div className="ielts-tests-layout">
      <div className="ielts-tests-header">
        <div className="header-container">
          <Link href="/" className="back-button">
            <span className="back-arrow">←</span> Back to Home
          </Link>
        </div>
      </div>
      
      <div className="ielts-tests-nav">
        <nav>
          <ul>
            <li>
              <Link 
                href="/ielts-tests/reading" 
                className="nav-link reading"
              >
                IELTS Reading Tests
              </Link>
            </li>
            <li>
              <Link 
                href="/ielts-tests/listening" 
                className="nav-link listening"
              >
                IELTS Listening Tests
              </Link>
            </li>
            <li>
              <Link 
                href="/ielts-tests/writing" 
                className="nav-link writing"
              >
                IELTS Writing Tests
              </Link>
            </li>
            <li>
              <Link 
                href="/ielts-tests/speaking" 
                className="nav-link speaking"
              >
                IELTS Speaking Tests
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
} 