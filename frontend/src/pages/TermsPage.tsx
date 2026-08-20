import { useEffect } from 'react';

interface TermsPageProps {
  onBackToHome: () => void;
}

export default function TermsPage({ onBackToHome }: TermsPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white relative">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.06),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.03),transparent_70%)]" />
      </div>

      {/* Top Nav Bar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-gray-400 hover:text-[#00ffff] transition-colors duration-300 group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.35em] font-mono">Back to Home</span>
          </button>
          <span className="text-lg font-bold tracking-tighter font-krona text-white">SARVI AI.</span>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 container mx-auto px-6 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[10px] uppercase tracking-[0.5em] text-[#00ffff] font-mono mb-4">Legal</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4">
            Terms & Conditions
          </h1>
          <p className="text-sm text-gray-400 tracking-wide">
            Last Updated: 20 August 2026
          </p>
          <div className="mt-6 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#00ffff]/40 to-transparent" />
        </div>

        {/* Terms Content */}
        <div className="space-y-12">

          {/* Section 1 - Introduction */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">1</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Introduction</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>
                Welcome to <strong className="text-white">SARVI AI</strong>, an AI-powered mental health companion developed and operated by <strong className="text-white">Anuva Nexus</strong>. These Terms & Conditions ("Terms") govern your access to and use of the SARVI AI platform, including the website, mobile applications, and all related services.
              </p>
              <p>
                By accessing or using SARVI AI, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our services.
              </p>
            </div>
          </section>

          {/* Section 2 - Definitions */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">2</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Definitions</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-2 pl-11">
              <p><strong className="text-[#00ffff]">"Platform"</strong> — refers to the SARVI AI website, applications, and all services provided.</p>
              <p><strong className="text-[#00ffff]">"User" / "You"</strong> — refers to any individual who accesses or uses the Platform.</p>
              <p><strong className="text-[#00ffff]">"We" / "Us" / "Company"</strong> — refers to Anuva Nexus, the entity operating SARVI AI.</p>
              <p><strong className="text-[#00ffff]">"Personal Data"</strong> — as defined under the Digital Personal Data Protection Act, 2023 (DPDP Act).</p>
              <p><strong className="text-[#00ffff]">"Data Fiduciary"</strong> — Anuva Nexus, as the entity that determines the purpose and means of processing Personal Data.</p>
              <p><strong className="text-[#00ffff]">"Data Principal"</strong> — The User, whose Personal Data is being collected and processed.</p>
            </div>
          </section>

          {/* Section 3 - Eligibility */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">3</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Eligibility</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>You must be at least <strong className="text-white">18 years of age</strong> to use SARVI AI. If you are below 18 years of age, you may only use the Platform with the verifiable consent of a parent or lawful guardian, as mandated by <strong className="text-white">Section 9 of the DPDP Act, 2023</strong>.</p>
              <p>By using the Platform, you represent and warrant that you meet the eligibility requirements specified herein.</p>
            </div>
          </section>

          {/* Section 4 - Services Provided */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">4</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Services Provided</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>SARVI AI provides an <strong className="text-white">AI-powered mental health support companion</strong>. Our services include:</p>
              <ul className="list-none space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00ffff] flex-shrink-0" />
                  <span>Empathetic AI conversations for emotional well-being</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00ffff] flex-shrink-0" />
                  <span>Personalized mental health insights and guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00ffff] flex-shrink-0" />
                  <span>Mood tracking and wellness analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00ffff] flex-shrink-0" />
                  <span>Access to community support features</span>
                </li>
              </ul>
              <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                <p className="text-amber-300 text-xs font-semibold uppercase tracking-wider mb-1">⚠ Important Disclaimer</p>
                <p className="text-amber-200/80 text-xs leading-relaxed">
                  SARVI AI is <strong>NOT</strong> a substitute for professional medical or psychiatric advice, diagnosis, or treatment. Always seek the advice of your physician or qualified mental health professional. In case of emergency, please contact emergency services or a crisis helpline immediately.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 - DPDP Act Compliance */}
          <section className="terms-section rounded-2xl border border-[#00ffff]/10 bg-[#00ffff]/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">5</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Digital Personal Data Protection (DPDP) Act, 2023 — Compliance</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-4 pl-11">
              <p>
                SARVI AI operates in full compliance with the <strong className="text-[#00ffff]">Digital Personal Data Protection Act, 2023</strong> enacted by the Government of India. As a Data Fiduciary, Anuva Nexus adheres to the following principles:
              </p>

              <div className="space-y-4">
                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h3 className="text-white font-semibold text-sm mb-2">5.1 — Lawful Purpose & Consent (Section 4 & 6)</h3>
                  <p>We collect and process your Personal Data only for lawful purposes. We obtain your <strong className="text-white">free, specific, informed, unconditional, and unambiguous consent</strong> before processing any personal data. You may withdraw your consent at any time.</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h3 className="text-white font-semibold text-sm mb-2">5.2 — Purpose Limitation (Section 5)</h3>
                  <p>Your Personal Data is processed solely for the purpose for which it was collected. We do not use your data for any purpose beyond what is disclosed to you at the time of collection.</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h3 className="text-white font-semibold text-sm mb-2">5.3 — Data Minimization</h3>
                  <p>We collect only the minimum amount of Personal Data necessary to provide and improve our services. No unnecessary data is collected or retained.</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h3 className="text-white font-semibold text-sm mb-2">5.4 — Storage Limitation (Section 8(7))</h3>
                  <p>Personal Data is retained only for as long as necessary to fulfill the purpose for which it was collected. Upon fulfillment, or upon your request, data is securely erased.</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h3 className="text-white font-semibold text-sm mb-2">5.5 — Data Accuracy (Section 8(3))</h3>
                  <p>We take reasonable steps to ensure that the Personal Data we process is complete, accurate, and up-to-date. You have the right to correct any inaccurate data.</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h3 className="text-white font-semibold text-sm mb-2">5.6 — Security Safeguards (Section 8(4))</h3>
                  <p>We implement appropriate technical and organizational security measures — including encryption, access controls, and secure infrastructure — to protect your Personal Data against unauthorized access, disclosure, alteration, or destruction.</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h3 className="text-white font-semibold text-sm mb-2">5.7 — Data Breach Notification (Section 8(6))</h3>
                  <p>In the event of a Personal Data breach, we will notify the <strong className="text-white">Data Protection Board of India</strong> and the affected Data Principals (Users) without undue delay, as required by law.</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h3 className="text-white font-semibold text-sm mb-2">5.8 — Cross-Border Data Transfer (Section 16)</h3>
                  <p>Personal Data may be transferred outside India only to countries or territories not restricted by the Central Government. All cross-border transfers comply with the provisions of the DPDP Act.</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <h3 className="text-white font-semibold text-sm mb-2">5.9 — Protection of Children's Data (Section 9)</h3>
                  <p>We do not process the Personal Data of children (under 18 years) without verifiable consent from a parent or lawful guardian. We do not engage in tracking, behavioral monitoring, or targeted advertising directed at children.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 - User Rights */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">6</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Your Rights as a Data Principal</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>Under the DPDP Act, 2023, you have the following rights:</p>
              <ul className="list-none space-y-3 mt-2">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-md bg-[#00ffff]/10 text-[#00ffff] text-[10px] font-bold font-mono flex-shrink-0">a</span>
                  <span><strong className="text-white">Right to Access Information</strong> — You can request a summary of your Personal Data being processed and the processing activities undertaken.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-md bg-[#00ffff]/10 text-[#00ffff] text-[10px] font-bold font-mono flex-shrink-0">b</span>
                  <span><strong className="text-white">Right to Correction & Erasure</strong> — You can request correction of inaccurate or misleading data, and erasure of data no longer necessary for the stated purpose.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-md bg-[#00ffff]/10 text-[#00ffff] text-[10px] font-bold font-mono flex-shrink-0">c</span>
                  <span><strong className="text-white">Right to Grievance Redressal</strong> — You may raise grievances with our designated Grievance Officer. If unsatisfied, you may approach the Data Protection Board of India.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-md bg-[#00ffff]/10 text-[#00ffff] text-[10px] font-bold font-mono flex-shrink-0">d</span>
                  <span><strong className="text-white">Right to Withdraw Consent</strong> — You may withdraw your consent at any time. Upon withdrawal, we shall cease processing your Personal Data (unless required by law).</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-md bg-[#00ffff]/10 text-[#00ffff] text-[10px] font-bold font-mono flex-shrink-0">e</span>
                  <span><strong className="text-white">Right to Nominate</strong> — You may nominate another individual to exercise your rights in the event of your death or incapacity.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 7 - User Obligations */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">7</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">User Obligations</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>As a User, you agree to:</p>
              <ul className="list-none space-y-2 mt-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00ffff] flex-shrink-0" />
                  <span>Provide only accurate and authentic information during registration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00ffff] flex-shrink-0" />
                  <span>Not impersonate any person or entity, or provide false identity information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00ffff] flex-shrink-0" />
                  <span>Not use the Platform for any unlawful, harmful, or abusive purpose</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00ffff] flex-shrink-0" />
                  <span>Not attempt to reverse-engineer, hack, or compromise the Platform's security</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00ffff] flex-shrink-0" />
                  <span>Not use automated scripts, bots, or scrapers to access the Platform</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#00ffff] flex-shrink-0" />
                  <span>Comply with the duties of a Data Principal as outlined in <strong className="text-white">Section 15 of the DPDP Act, 2023</strong></span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 8 - Intellectual Property */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">8</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Intellectual Property</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>
                All content, features, functionality, branding, logos, AI models, source code, and technology used on the SARVI AI Platform are the exclusive property of <strong className="text-white">Anuva Nexus</strong> and are protected under applicable intellectual property laws of India.
              </p>
              <p>
                You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any content from the Platform without prior written consent from Anuva Nexus.
              </p>
            </div>
          </section>

          {/* Section 9 - Payment & Subscription */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">9</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Payment & Subscription</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>
                Certain features of SARVI AI may require a paid subscription. By subscribing, you agree to pay the fees as specified on our pricing page. All payments are processed through secure third-party payment gateways.
              </p>
              <p>
                Refund policies, if applicable, will be governed by the terms displayed at the time of purchase. Subscription auto-renewal terms will be clearly communicated before activation.
              </p>
            </div>
          </section>

          {/* Section 10 - Limitation of Liability */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">10</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Limitation of Liability</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>
                To the maximum extent permitted by applicable law, Anuva Nexus and its affiliates, officers, employees, agents, or partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Platform.
              </p>
              <p>
                SARVI AI is provided on an <strong className="text-white">"as is"</strong> and <strong className="text-white">"as available"</strong> basis, without warranties of any kind, either express or implied.
              </p>
            </div>
          </section>

          {/* Section 11 - Termination */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">11</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Termination</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>
                We reserve the right to suspend or terminate your access to SARVI AI at any time, with or without notice, for violation of these Terms or for any conduct that we determine to be harmful to other Users or the Platform.
              </p>
              <p>
                Upon termination, your right to use the Platform ceases immediately. Any data retention obligations under the DPDP Act shall continue to apply.
              </p>
            </div>
          </section>

          {/* Section 12 - Governing Law */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">12</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Governing Law & Jurisdiction</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>
                These Terms shall be governed by and construed in accordance with the laws of <strong className="text-white">India</strong>, including the <strong className="text-white">Digital Personal Data Protection Act, 2023</strong>, the <strong className="text-white">Information Technology Act, 2000</strong>, and all rules and regulations thereunder.
              </p>
              <p>
                Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in India.
              </p>
            </div>
          </section>

          {/* Section 13 - Changes to Terms */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">13</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Changes to These Terms</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>
                Anuva Nexus reserves the right to modify these Terms at any time. Changes will be effective upon posting on the Platform. We will notify Users of significant changes via email or prominent notice on the Platform. Your continued use of SARVI AI after such changes constitutes your acceptance of the revised Terms.
              </p>
            </div>
          </section>

          {/* Section 14 - Grievance Officer */}
          <section className="terms-section rounded-2xl border border-[#00ffff]/10 bg-[#00ffff]/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">14</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Grievance Officer</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>
                In accordance with the DPDP Act, 2023, and the Information Technology Act, 2000, we have appointed a Grievance Officer to address your concerns:
              </p>
              <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-4 space-y-2">
                <p><strong className="text-white">Grievance Officer:</strong> <span className="text-[#00ffff]">Anuva Nexus Team</span></p>
                <p><strong className="text-white">Email:</strong> <a href="mailto:grievance@sarvi.ai" className="text-[#00ffff] hover:underline">grievance@sarvi.ai</a></p>
                <p><strong className="text-white">Response Time:</strong> Within 48 hours of receiving the complaint</p>
                <p><strong className="text-white">Resolution Time:</strong> Within 30 days of receiving the complaint</p>
              </div>
            </div>
          </section>

          {/* Section 15 - Contact */}
          <section className="terms-section rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00ffff]/10 text-[#00ffff] text-xs font-bold font-mono">15</span>
              <h2 className="text-xl md:text-2xl font-serif font-semibold text-white">Contact Us</h2>
            </div>
            <div className="text-sm text-gray-300 leading-relaxed space-y-3 pl-11">
              <p>If you have any questions, concerns, or requests regarding these Terms & Conditions or our data practices, please contact us:</p>
              <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.03] p-4 space-y-2">
                <p><strong className="text-white">Company:</strong> Anuva Nexus</p>
                <p><strong className="text-white">Platform:</strong> SARVI AI</p>
                <p><strong className="text-white">Email:</strong> <a href="mailto:support@sarvi.ai" className="text-[#00ffff] hover:underline">support@sarvi.ai</a></p>
              </div>
            </div>
          </section>

        </div>

        {/* Bottom Acknowledgement */}
        <div className="mt-16 text-center">
          <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#00ffff]/40 to-transparent mb-8" />
          <p className="text-xs text-gray-500 leading-relaxed max-w-xl mx-auto">
            By using SARVI AI, you acknowledge that you have read, understood, and agreed to be bound by these Terms & Conditions and our Privacy Policy, in compliance with the Digital Personal Data Protection Act, 2023 (Government of India).
          </p>
          <button
            onClick={onBackToHome}
            className="mt-8 inline-flex items-center justify-center rounded-full border border-[#00ffff]/30 bg-[#00ffff]/10 px-8 py-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#00ffff] transition-all duration-300 hover:bg-[#00ffff]/20 hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]"
          >
            Back to Home
          </button>
        </div>

        {/* Footer copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-gray-600">
            ANUVA NEXUS © 2026 — All Rights Reserved
          </p>
          <p className="text-[10px] text-gray-600 mt-2">
            Compliant with the Digital Personal Data Protection Act, 2023 (DPDP Act) — Government of India
          </p>
        </div>
      </main>
    </div>
  );
}
