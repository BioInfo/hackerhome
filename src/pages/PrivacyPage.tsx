import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>
            HackerHome collects minimal information to provide and improve our Service. The information 
            we collect includes:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Browser type and version</li>
            <li>Usage data and preferences</li>
            <li>Device information</li>
            <li>Cookies and local storage data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p>We use the collected information for:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Providing and maintaining the Service</li>
            <li>Improving user experience</li>
            <li>Analyzing usage patterns</li>
            <li>Detecting and preventing technical issues</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Data Storage</h2>
          <p>
            We store minimal data locally in your browser using local storage and cookies. This data 
            includes your preferences and settings. No personal information is stored on our servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
          <p>
            We integrate with third-party services to provide content. These services may collect 
            information as governed by their respective privacy policies:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Hacker News</li>
            <li>DEV.to</li>
            <li>GitHub</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our Service and hold 
            certain information. You can instruct your browser to refuse all cookies or to indicate when 
            a cookie is being sent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Security</h2>
          <p>
            We value your trust in providing us your information, thus we strive to use commercially 
            acceptable means of protecting it. But remember that no method of transmission over the 
            internet, or method of electronic storage is 100% secure and reliable.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page. Changes are effective immediately after they 
            are posted.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@hackerhome.dev" className="text-blue-500 hover:text-blue-600">
              privacy@hackerhome.dev
            </a>
          </p>
        </section>
      </div>
    </div>
  );
} 