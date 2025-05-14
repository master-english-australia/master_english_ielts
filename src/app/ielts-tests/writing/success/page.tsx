'use client';

import '@/app/ielts-tests/writing/success/SuccessPage.css';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  const handleBackToTests = () => {
    router.push('/ielts-tests/writing');
  };

  return (
    <div className="success-page">
      <div className="success-content">
        <h1>Test Submitted Successfully!</h1>
        <p>Your writing test has been submitted successfully.</p>
        <button className="back-to-tests-btn" onClick={handleBackToTests}>
          Back to Writing Tests
        </button>
      </div>
    </div>
  );
} 