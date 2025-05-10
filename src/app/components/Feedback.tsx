import { useState } from "react";

export const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  //   const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //     setFeedbackText(e.target.value);
  //   };

  //   const handleFeedbackSubmit = () => {
  //     // Handle feedback submission logic here
  //     console.log("Feedback submitted:", feedbackText);
  //     setShowFeedback(false);
  //   };

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
          <div className="bg-gray-800 text-white p-6 rounded-xl w-full max-w-md shadow-lg border border-gray-600">
            <h2 className="text-lg font-semibold mb-3">
              We would love your feedback
            </h2>
            <textarea
              rows={4}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none"
              placeholder="What would you like to see improved or added to the results?"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowFeedback(false)}
                className="text-gray-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Send feedbackText to your backend (TODO)
                  setShowFeedback(false);
                  setFeedbackText("");
                  alert("Thanks for your feedback!");
                }}
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
