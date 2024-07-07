import Link from "next/link";
import React from "react";

const AttemptQuiz = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundColor: "#f0f2f5", // Example background color for the page
      }}
    >
      <Link href="/user/attempt-quiz/quiz">
        <button
          className="btn text-white border-none text-xl  rounded-full shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
          style={{
            background:
              "linear-gradient(to right, #051937, #001b4b, #001c5f, #001b71, #0c1682)",
          }}
        >
          Start Quiz Now
        </button>
      </Link>
    </div>
  );
};

export default AttemptQuiz;
