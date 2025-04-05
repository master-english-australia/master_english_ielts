import Link from 'next/link';
import React from 'react';

export default function IELTSTestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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