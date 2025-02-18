import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function PrivacyPage() {
  const { isDarkMode } = useTheme();
  const bgColor = isDarkMode ? 'bg-[#1a1b1e]' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';

  return (
    <div className={`${bgColor} rounded-lg p-8 shadow-sm`}>
      <h1 className={`text-3xl font-bold mb-8 ${textColor}`}>Privacy Policy</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>1. Information We Collect</h2>
          <p className={`${textColor} opacity-90 mb-4`}>
            HackerHome collects minimal information to provide and improve our Service. The information 
            we collect includes:
          </p>
          <ul className={`list-disc pl-6 ${textColor} opacity-90 space-y-1`}>
            <li>Browser type and version</li>
            <li>Usage data and preferences</li>
            <li>Device information</li>
            <li>Cookies and local storage data</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>2. How We Use Your Information</h2>
          <p className={`${textColor} opacity-90 mb-4`}>We use the collected information for:</p>
          <ul className={`list-disc pl-6 ${textColor} opacity-90 space-y-1`}>
            <li>Providing and maintaining the Service</li>
            <li>Improving user experience</li>
            <li>Analyzing usage patterns</li>
            <li>Detecting and preventing technical issues</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>3. Data Storage</h2>
          <p className={`${textColor} opacity-90`}>
            We store minimal data locally in your browser using local storage and cookies. This data 
            includes your preferences and settings. No personal information is stored on our servers.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>4. Third-Party Services</h2>
          <p className={`${textColor} opacity-90 mb-4`}>
            We integrate with third-party services to provide content. These services may collect 
            information as governed by their respective privacy policies:
          </p>
          <ul className={`list-disc pl-6 ${textColor} opacity-90 space-y-1`}>
            <li>Hacker News</li>
            <li>DEV.to</li>
            <li>GitHub</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>5. Cookies</h2>
          <p className={`${textColor} opacity-90`}>
            We use cookies and similar tracking technologies to track activity on our Service and hold 
            certain information. You can instruct your browser to refuse all cookies or to indicate when 
            a cookie is being sent.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>6. Security</h2>
          <p className={`${textColor} opacity-90`}>
            We value your trust in providing us your information, thus we strive to use commercially 
            acceptable means of protecting it. But remember that no method of transmission over the 
            internet, or method of electronic storage is 100% secure and reliable.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>7. Changes to This Policy</h2>
          <p className={`${textColor} opacity-90`}>
            We may update our Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page. Changes are effective immediately after they 
            are posted.
          </p>
        </section>
      </div>
    </div>
  );
} 