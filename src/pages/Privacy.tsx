function Privacy() {
  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-h1 font-bold text-neutral-900">Privacy Policy</h1>
          <p className="mt-2 text-body-sm text-neutral-400">Last updated: 1 March 2026</p>

          <div className="mt-8 space-y-8 text-body text-neutral-700 leading-relaxed">
            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                1. Introduction
              </h2>
              <p>
                Welcome to HumbleHalal ("<strong>we</strong>", "<strong>our</strong>", or "
                <strong>us</strong>"). We operate the HumbleHalal platform (the "Service"), a halal
                business and events directory for Singapore's Muslim community. This Privacy Policy
                explains how we collect, use, and protect your personal information when you use our
                Service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                2. Information We Collect
              </h2>
              <p className="mb-3">We may collect the following types of information:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong>Account Information:</strong> Name, email address, and password when you
                  register for an account.
                </li>
                <li>
                  <strong>Business Listings:</strong> Business name, address, contact details, halal
                  certification number, and description submitted by business owners.
                </li>
                <li>
                  <strong>Usage Data:</strong> Pages visited, search queries, and interaction with
                  listings (collected anonymously via analytics).
                </li>
                <li>
                  <strong>Contact Form Submissions:</strong> Name, email, and message content when
                  you contact us.
                </li>
                <li>
                  <strong>Newsletter Subscriptions:</strong> Email address when you subscribe to our
                  newsletter.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                3. How We Use Your Information
              </h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Provide and maintain our Service</li>
                <li>Display business listings and event information</li>
                <li>Send transactional emails (listing confirmations, updates)</li>
                <li>Send newsletter updates (only with your explicit consent)</li>
                <li>Respond to your enquiries and support requests</li>
                <li>Improve our platform through anonymised usage analytics</li>
                <li>Verify halal certification claims submitted by businesses</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                4. Sharing of Information
              </h2>
              <p>
                We do <strong>not</strong> sell, trade, or rent your personal information to third
                parties. Business listing information (name, address, contact details) is publicly
                displayed as part of the directory. We may share anonymised, aggregated data for
                analytical purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                5. Data Security
              </h2>
              <p>
                We implement appropriate technical and organisational measures to protect your
                personal information. Passwords are hashed and stored securely. We use HTTPS
                encryption for all data transmission. However, no method of transmission over the
                internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                6. Cookies
              </h2>
              <p>
                We use essential cookies to maintain your session and remember preferences. We may
                also use analytics cookies (e.g. Google Analytics) with your consent to understand
                how visitors use our site. You can control cookie settings through your browser.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                7. Your Rights
              </h2>
              <p className="mb-3">Under Singapore's Personal Data Protection Act (PDPA), you have the right to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Access the personal data we hold about you</li>
                <li>Correct any inaccurate personal data</li>
                <li>Withdraw consent for data collection and use</li>
                <li>Request deletion of your account and associated data</li>
              </ul>
              <p className="mt-3">
                To exercise these rights, please contact us at{" "}
                <a
                  href="mailto:privacy@humblehalal.sg"
                  className="text-primary-600 hover:underline"
                >
                  privacy@humblehalal.sg
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                8. Children's Privacy
              </h2>
              <p>
                Our Service is not directed at children under 13. We do not knowingly collect
                personal information from children under 13. If you believe we have inadvertently
                collected such data, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of
                significant changes by posting the new policy on this page with an updated date, and
                where appropriate, via email.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                10. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-3 rounded-xl bg-neutral-50 p-4 text-body-sm">
                <p><strong>HumbleHalal</strong></p>
                <p>Singapore</p>
                <p>
                  Email:{" "}
                  <a href="mailto:privacy@humblehalal.sg" className="text-primary-600 hover:underline">
                    privacy@humblehalal.sg
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Privacy
