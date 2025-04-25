import Head from "next/head";
import Link from "next/link";

export default function KnowledgeBase() {
  return (
    <main className="font-sans text-gray-800">
      <Head>
        <title>Knowledge Base | Ricky Loans and Finance</title>
      </Head>

      <header className="bg-blue-900 text-white py-12 px-6 text-center">
        <h1 className="text-4xl font-bold">Knowledge Base</h1>
        <p className="text-lg mt-2">Your guide to our services and policies</p>
        <div className="mt-4">
          <Link href="/" className="text-green-400 hover:text-white text-lg">
            ← Back to Home
          </Link>
        </div>
      </header>

      <section className="py-12 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Company Overview */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">📌 Company Overview</h2>
            <div className="bg-white p-6 rounded shadow text-gray-700">
              <p>
                <strong>Ricky Loans and Finance</strong> is a trusted provider
                of personal and small business loans. We offer flexible
                repayment options, fast processing, and tailored financial
                guidance.
              </p>
            </div>
          </div>

          {/* Services Offered */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">💼 Services Offered</h2>
            <div className="space-y-6">
              {[
                {
                  title: "1. Personal Loans",
                  details: [
                    "Amount: $1,000 - $25,000",
                    "Terms: 6 - 36 months",
                    "Approval in 24 hours",
                    "Fixed interest rates",
                    "Use cases: medical, rent, school, emergencies",
                  ],
                },
                {
                  title: "2. Business Loans",
                  details: [
                    "Amount: $5,000 - $100,000",
                    "Terms: 3 - 48 months",
                    "Designed for SMEs and entrepreneurs",
                    "Documentation: business registration, cash flow, etc.",
                  ],
                },
                {
                  title: "3. Financial Advisory",
                  details: [
                    "Budgeting and savings plans",
                    "Credit score repair",
                    "Debt restructuring",
                  ],
                },
              ].map((service, idx) => (
                <div key={idx} className="bg-white p-6 rounded shadow">
                  <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {service.details.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Offers & Discounts */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              🛍️ Current Offers & Discounts
            </h2>
            <div className="bg-white p-6 rounded shadow">
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Spring Promo:</strong> 0.5% interest discount for all
                  new customers (until May 31)
                </li>
                <li>
                  <strong>Referral Bonus:</strong> $100 for every new customer
                  referred
                </li>
                <li>
                  <strong>Quick Approval Boost:</strong> Upload all documents
                  upfront to get a 12-hour approval window
                </li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              🔎 Common Questions & Answers
            </h2>
            <div className="bg-white p-6 rounded shadow space-y-4">
              {[
                {
                  q: "How fast can I get the loan?",
                  a: "Within 24 hours after submitting all documents.",
                },
                {
                  q: "What documents are required?",
                  a: "Government ID, proof of income, bank statement (last 3 months), utility bill.",
                },
                {
                  q: "Can I repay early?",
                  a: "Yes, early repayment is allowed with no penalty.",
                },
                {
                  q: "Is there a minimum credit score?",
                  a: "No strict requirement, but better scores get better rates.",
                },
              ].map((faq, i) => (
                <div key={i}>
                  <p className="font-semibold">Q: {faq.q}</p>
                  <p className="text-sm text-gray-700">A: {faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-6 bg-gray-100 text-sm">
        &copy; {new Date().getFullYear()} Ricky Loans and Finance. All rights
        reserved.
      </footer>
    </main>
  );
}
