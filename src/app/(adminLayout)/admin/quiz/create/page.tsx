"use client";
import { useQuizCreateMutation } from "@/redux/api/quiz";
import { useState } from "react";
import { message, Input, Button } from "antd";

const QuizCreate = () => {
  const [questionText, setQuestionText] = useState("");
  const [quizId, setQuizId] = useState("");
  const [options, setOptions] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [quizCreate] = useQuizCreateMutation();

  const onSubmit = async () => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    setIsLoading(true);

    try {
      const data = {
        questionText,
        quizId: parseInt(quizId),
        options: JSON.parse(options),
        timeLimit: parseInt(timeLimit),
      };

      await quizCreate({ data })
        .unwrap()
        .then(() => {
          message.success("Quiz added successfully");
          resetForm();
        })
        .catch(() => {
          message.error("Failed to add quiz");
        })
        .finally(() => {
          message.destroy(key);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Failed to create quiz:", error);
      message.error("Failed to create quiz");
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setQuestionText("");
    setQuizId("");
    setOptions("");
    setTimeLimit("");
  };

  const validateOptionsFormat = (value: string) => {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="w-4/5 lg:w-1/2">
        <h1
          className="text-center text-xl text-blue-500 font-semibold"
          style={{ margin: "15px 0px" }}
        >
          Create Quiz Question
        </h1>
        <div className="my-1">
          <label>Question Text:</label>
          <Input
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>
        <div className="my-1">
          <label>Quiz ID:</label>
          <Input
            type="number"
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
          />
        </div>
        <div className="my-1">
          <label>Options (JSON format):</label>
          <Input.TextArea
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            placeholder={`[
              {
                "text": "Berlin",
                "isCorrect": false
              },
              {
                "text": "Madrid",
                "isCorrect": false
              },
              {
                "text": "Paris",
                "isCorrect": true
              },
              {
                "text": "Rome",
                "isCorrect": false
              }
            ]`}
            autoSize={{ minRows: 4, maxRows: 6 }}
          />
        </div>
        <div className="my-1">
          <label>Time Limit:</label>
          <Input
            type="number"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
          />
        </div>
        <div>
          <Button type="primary" onClick={onSubmit} loading={isLoading}>
            Create Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizCreate;
