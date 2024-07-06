"use client";

import {
  useGetQuizQuery,
  useGetSingleQuizQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} from "@/redux/api/quiz";
import { useState, useEffect } from "react";
import { Button, Card, Modal, message, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import Loading from "@/app/loading";

const QuizList = () => {
  const [quizID, setQuizID] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, refetch } = useGetQuizQuery({
    refetchOnMountOrArgChange: true,
  });
  const quizList = data;

  const { data: singleQuizData } = useGetSingleQuizQuery(quizID, {
    refetchOnMountOrArgChange: true,
  });

  const [updateQuiz] = useUpdateQuizMutation();
  const [deleteQuiz] = useDeleteQuizMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (singleQuizData) {
      setValue("questionText", singleQuizData.questionText);
      setValue("quizId", singleQuizData.quizId);
      setValue("options", JSON.stringify(singleQuizData.options, null, 2));
      setValue("timeLimit", singleQuizData.timeLimit);
    }
  }, [singleQuizData, setValue]);

  const showModal = (id: string) => {
    setQuizID(id);
    setIsModalOpen(true);
  };

  const onSubmit = async (data: any) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    try {
      await updateQuiz({ data, id: quizID });
      refetch();
      setIsModalOpen(false);
      message.destroy(key);
      message.success("Quiz updated successfully");
      reset();
    } catch (err: any) {
      setIsModalOpen(false);
      message.destroy(key);
      message.error("Quiz update failed");
    }
  };

  const handleDelete = async (id: string) => {
    const key = "loadingKey";
    message.loading({ content: "Loading...", key });
    try {
      await deleteQuiz({ id });
      refetch();
      message.destroy(key);
      message.success("Quiz deleted successfully");
    } catch (err: any) {
      message.destroy(key);
      message.error("Quiz deletion failed");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    reset();
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-xl text-blue-500 font-semibold">
        Quiz List
      </h1>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizList.map((quiz: any) => (
            <Card key={quiz.id} title={quiz.questionText} bordered>
              <p>Quiz ID: {quiz.quizId}</p>
              <p>Time Limit: {quiz.timeLimit} seconds</p>
              <Button
                type="primary"
                onClick={() => showModal(quiz.id)}
                className="mr-2"
              >
                <EditOutlined />
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => handleDelete(quiz._id)}
              >
                <DeleteOutlined />
              </Button>
            </Card>
          ))}
        </div>
      )}

      <Modal
        visible={isModalOpen}
        okText="Update"
        onOk={handleSubmit(onSubmit)}
        onCancel={handleCancel}
        okButtonProps={{ style: { background: "blue" } }}
      >
        <div className="my-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="font-weight-bold">Question Text</label>
              <br />
              <Input
                {...register("questionText", { required: true })}
                placeholder="Question Text"
              />
              {errors.questionText && (
                <span className="text-red-500">Question Text is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="font-weight-bold">Quiz ID</label>
              <br />
              <Input
                type="number"
                {...register("quizId", { required: true })}
                placeholder="Quiz ID"
              />
              {errors.quizId && (
                <span className="text-red-500">Quiz ID is required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="font-weight-bold">Options</label>
              <br />
              <Input.TextArea
                {...register("options", { required: true })}
                rows={4}
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
              />
              {errors.options && (
                <span className="text-red-500">Options are required</span>
              )}
            </div>
            <div className="mb-4">
              <label className="font-weight-bold">Time Limit</label>
              <br />
              <Input
                type="number"
                {...register("timeLimit", { required: true })}
                placeholder="Time Limit"
              />
              {errors.timeLimit && (
                <span className="text-red-500">Time Limit is required</span>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default QuizList;
