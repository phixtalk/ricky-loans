import { useState } from "react";
import { useSnackbar } from "../providers/SnackbarProvider";

export const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const { showSnackbar } = useSnackbar();

  const handleSubmitFeedback = async () => {
    if (!feedbackText.trim()) {
      setError("Feedback cannot be empty.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: feedbackText }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send feedback.");
      }

      showSnackbar({
        mode: "success",
        message: "Thanks for your feedback.",
      });
      setShowFeedback(false);
      setFeedbackText("");
    } catch (err: unknown) {
      console.error("Error sending feedback:", err);
      showSnackbar({
        mode: "error",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setShowFeedback(true)}
          className="mt-6 text-sm text-blue-400 cursor-pointer justify-end"
        >
          💬 Send Feedback
        </button>
      </div>
      {showFeedback && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm"
          onClick={() => setShowFeedback(false)}
        >
          <div
            className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-md shadow-lg border border-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-3">
              We would love your feedback
            </h2>
            <textarea
              rows={4}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
              placeholder="What would you like to see improved or added to the results?"
              value={feedbackText}
              required
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowFeedback(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center min-w-[100px] cursor-pointer"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
