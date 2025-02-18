import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function TermsPage() {
  const { isDarkMode } = useTheme();
  const bgColor = isDarkMode ? 'bg-[#1a1b1e]' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';

  return (
    <div className={`${bgColor} rounded-lg p-8 shadow-sm`}>
      <h1 className={`text-3xl font-bold mb-8 ${textColor}`}>Terms & Conditions</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>1. Agreement to Terms</h2>
          <p className={`${textColor} opacity-90`}>
            By accessing and using HackerHome ("the Service"), you agree to be bound by these Terms and 
            Conditions ("Terms"). If you disagree with any part of these terms, you may not access the Service.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>2. Use License</h2>
          <p className={`${textColor} opacity-90 mb-4`}>
            Permission is granted to temporarily access the materials (information or software) on 
            HackerHome's website for personal, non-commercial viewing only.
          </p>
          <p className={`${textColor} opacity-90 mb-2`}>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul className={`list-disc pl-6 ${textColor} opacity-90 space-y-1`}>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on HackerHome's website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
            <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
          </ul>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>3. Disclaimer</h2>
          <p className={`${textColor} opacity-90`}>
            The materials on HackerHome's website are provided on an 'as is' basis. HackerHome makes no 
            warranties, expressed or implied, and hereby disclaims and negates all other warranties 
            including, without limitation, implied warranties or conditions of merchantability, fitness 
            for a particular purpose, or non-infringement of intellectual property or other violation 
            of rights.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>4. Limitations</h2>
          <p className={`${textColor} opacity-90`}>
            In no event shall HackerHome or its suppliers be liable for any damages (including, without 
            limitation, damages for loss of data or profit, or due to business interruption) arising 
            out of the use or inability to use the materials on HackerHome's website.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>5. Accuracy of Materials</h2>
          <p className={`${textColor} opacity-90`}>
            The materials appearing on HackerHome's website could include technical, typographical, or 
            photographic errors. HackerHome does not warrant that any of the materials on its website 
            are accurate, complete, or current.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>6. Links</h2>
          <p className={`${textColor} opacity-90`}>
            HackerHome has not reviewed all of the sites linked to its website and is not responsible 
            for the contents of any such linked site. The inclusion of any link does not imply 
            endorsement by HackerHome of the site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>7. Modifications</h2>
          <p className={`${textColor} opacity-90`}>
            HackerHome may revise these terms of service for its website at any time without notice. 
            By using this website, you are agreeing to be bound by the then current version of these 
            terms of service.
          </p>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>8. Governing Law</h2>
          <p className={`${textColor} opacity-90`}>
            These terms and conditions are governed by and construed in accordance with the laws and 
            you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>
      </div>
    </div>
  );
} 