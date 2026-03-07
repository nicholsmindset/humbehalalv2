function Terms() {
  return (
    <div className="section-padding">
      <div className="container-page">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-h1 font-bold text-neutral-900">Terms of Service</h1>
          <p className="mt-2 text-body-sm text-neutral-400">Last updated: 1 March 2026</p>

          <div className="mt-8 space-y-8 text-body text-neutral-700 leading-relaxed">
            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using HumbleHalal (the "Service"), you agree to be bound by these
                Terms of Service. If you do not agree, please do not use our Service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                2. Description of Service
              </h2>
              <p>
                HumbleHalal is an online directory and community platform connecting Singapore's
                Muslim community with halal-certified businesses, events, and classifieds. The
                Service is provided "as is" and is intended for informational purposes.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                3. Business Listings
              </h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  Business owners are responsible for the accuracy of all information submitted,
                  including halal certification details.
                </li>
                <li>
                  HumbleHalal reserves the right to verify, edit, or remove any listing at its
                  discretion.
                </li>
                <li>
                  Misrepresenting halal certification status is a serious violation that will result
                  in immediate removal from the platform.
                </li>
                <li>
                  Business listings are free. HumbleHalal may introduce paid featured listing
                  options in the future.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                4. User Conduct
              </h2>
              <p className="mb-3">You agree not to:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>Submit false, misleading, or fraudulent information</li>
                <li>Post content that is offensive, defamatory, or harmful to the community</li>
                <li>Attempt to gain unauthorised access to the platform</li>
                <li>Use the Service for spam or unsolicited commercial communications</li>
                <li>Scrape or harvest data without written permission</li>
                <li>Violate any applicable Singapore laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                5. Classifieds
              </h2>
              <p>
                HumbleHalal provides a classifieds section for community members to buy, sell, and
                offer services. We are not a party to any transactions between users. Users are
                responsible for verifying the legitimacy of listings and transactions. HumbleHalal is
                not liable for any loss arising from classifieds transactions.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                6. Halal Certification Disclaimer
              </h2>
              <p>
                HumbleHalal makes reasonable efforts to verify halal certification claims. However,
                we are not MUIS or an official halal certification body. Users should independently
                verify halal status through official MUIS channels at{" "}
                <a
                  href="https://www.muis.gov.sg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:underline"
                >
                  www.muis.gov.sg
                </a>{" "}
                for critical decisions.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                7. Intellectual Property
              </h2>
              <p>
                All content on HumbleHalal — including design, text, graphics, and code — is the
                property of HumbleHalal or its content suppliers and is protected by Singapore
                copyright law. Business owners retain ownership of their listing content but grant
                HumbleHalal a licence to display it.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                8. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, HumbleHalal shall not be liable for any
                indirect, incidental, or consequential damages arising from your use of the Service
                or reliance on any listing information. Our total liability shall not exceed SGD 100.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                9. Modifications to Terms
              </h2>
              <p>
                HumbleHalal reserves the right to modify these Terms at any time. Continued use of
                the Service after changes constitutes acceptance of the updated Terms. Material
                changes will be communicated via email to registered users.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                10. Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of Singapore. Any disputes shall be subject to
                the exclusive jurisdiction of Singapore courts.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-display text-h3 font-semibold text-neutral-900">
                11. Contact
              </h2>
              <p>
                Questions about these Terms? Contact us at{" "}
                <a href="mailto:legal@humblehalal.sg" className="text-primary-600 hover:underline">
                  legal@humblehalal.sg
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Terms
