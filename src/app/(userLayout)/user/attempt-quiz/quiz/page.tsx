"use client";

import React, { useState, useEffect } from "react";
import {
  useGetSingleQuizByQuizIdQuery,
  useGetQuizQuery,
} from "@/redux/api/quiz";
import { Button, Progress, message } from "antd";
import { useUpdateQuizMarkMutation } from "@/redux/api/UserApi";
import { getUserInfo } from "@/services/auth.service";

interface Answer {
  questionId: number;
  isCorrect: boolean;
}

const Quiz = () => {
  const [quizId, setQuizId] = useState(1);
  const [score, setScore] = useState<string>("");
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [showScore, setShowScore] = useState(false);
  const [totalQuizzes, setTotalQuizzes] = useState(0);

  const {
    data: quizData,
    error: quizError,
    isLoading: quizLoading,
    refetch: refetchQuiz,
  } = useGetSingleQuizByQuizIdQuery(String(quizId));

  const { data: allQuizzesData, error: allQuizzesError } = useGetQuizQuery({
    refetchOnMountOrArgChange: true,
  });
  const [updateQuizMark] = useUpdateQuizMarkMutation();
  const { userId } = getUserInfo() as any;

  useEffect(() => {
    if (allQuizzesData) {
      setTotalQuizzes(allQuizzesData.length);
    }
  }, [allQuizzesData]);

  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (showScore) {
      const correctAnswers = userAnswers.filter(
        (answer) => answer.isCorrect
      ).length;
      const score = ((correctAnswers / totalQuizzes) * 100).toFixed(2);
      setScore(String(score));
      updateUser(score);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showScore, totalQuizzes, userAnswers]);

  const handleNextQuestion = () => {
    if (quizId < totalQuizzes) {
      setQuizId((prevId) => prevId + 1);
      setTimeLeft(30);
    } else {
      setShowScore(true);
    }
  };

  const handleAnswer = (option: any) => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId: quizId, isCorrect: option.isCorrect },
    ]);
    handleNextQuestion();
  };

  const updateUser = async (score: string) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    try {
      await updateQuizMark({ data: { quizMark: score }, id: userId });
      message.destroy(key);
      message.success("Quiz Mark updated successfully");
    } catch (err: any) {
      message.destroy(key);
      message.error("Quiz Mark update failed");
    }
  };

  if (quizLoading) return <div>Loading...</div>;
  if (quizError || allQuizzesError) {
    message.error("Failed to load quiz");
    return <div>Error loading quiz</div>;
  }

  if (showScore) {
    const correctAnswers = userAnswers.filter(
      (answer) => answer.isCorrect
    ).length;
    const score = ((correctAnswers / totalQuizzes) * 100).toFixed(2);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-md text-center">
          <h1 className="text-2xl font-semibold mb-4">Quiz Completed!</h1>
          <p className="text-lg">Your Score: {score}%</p>
          <Button type="primary" onClick={() => window.location.reload()} block>
            Restart Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Quiz Question
        </h1>
        <div className="mb-4">
          <Progress percent={(timeLeft / 30) * 100} showInfo={false} />
          <div className="text-center text-gray-500">
            {timeLeft} seconds left
          </div>
        </div>
        <div className="mb-6">
          <p className="text-lg">{quizData.questionText}</p>
          <ul className="mt-4">
            {quizData.options.map((option: any, index: number) => (
              <li key={index} className="my-2">
                <Button block onClick={() => handleAnswer(option)}>
                  {option.text}
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <Button type="primary" onClick={handleNextQuestion} block>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
