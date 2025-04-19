"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // Honeypot
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];

    if (!formData.name.trim()) newErrors.push("Name is required.");
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.push("Valid email is required.");
    if (!formData.phone.trim()) newErrors.push("Phone number is required.");
    if (formData.message.trim().length < 10)
      newErrors.push("Message must be at least 10 characters.");

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (validationErrors.length > 0) return;

    // Honeypot check
    if (formData.website) return; // bot trap

    setSubmitting(true);
    try {
      const res = await fetch(
        "http://localhost:5678/webhook-test/form-inquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          }),
        }
      );

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          website: "",
        });
      } else {
        setErrors(["Failed to submit the form. Please try again later."]);
      }
    } catch (err) {
      console.error(err);
      setErrors(["Something went wrong. Please try again."]);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="font-sans text-gray-800">
      {/* Hero */}
      <header className="bg-blue-900 text-white py-12 px-6 text-center">
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Ricky Loans and Finance"
            width={200}
            height={200}
            className="mb-4"
          />
        </div>
        <h1 className="text-4xl font-bold">Ricky Loans and Finance</h1>
        <p className="text-lg mt-2">
          Your Trusted Partner for Loans & Accounting Solutions
        </p>
      </header>

      {/* Services */}
      <section className="py-12 px-6 bg-gray-100 text-center">
        <h2 className="text-2xl font-semibold mb-6">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="p-6 border rounded shadow bg-white">
            <h3 className="text-xl font-bold mb-2">Loan Services</h3>
            <p>
              Personal and business loan assistance with expert consultation and
              fast approvals.
            </p>
          </div>
          <div className="p-6 border rounded shadow bg-white">
            <h3 className="text-xl font-bold mb-2">Accounting Services</h3>
            <p>
              Professional bookkeeping, tax preparation, and business financial
              advisory.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 px-6 bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Get in Touch
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          You can also contact us at{" "}
          <a
            href="mailto:nicheai.ng@gmail.com"
            className="text-blue-700 font-medium"
          >
            nicheai.ng@gmail.com
          </a>
        </p>

        {submitted ? (
          <p className="text-center text-green-600 font-medium">
            Thanks! Your message has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
            {/* Hidden honeypot field */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {errors.length > 0 && (
              <ul className="bg-red-100 text-red-700 p-3 rounded text-sm">
                {errors.map((err, idx) => (
                  <li key={idx}>• {err}</li>
                ))}
              </ul>
            )}

            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-900 text-white py-3 px-6 rounded hover:bg-blue-800 transition cursor-pointer"
            >
              {submitting ? "Sending..." : "Submit Inquiry"}
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-100 text-sm">
        &copy; {new Date().getFullYear()} Ricky Loans and Finance. All rights
        reserved..
      </footer>
    </main>
  );
}
