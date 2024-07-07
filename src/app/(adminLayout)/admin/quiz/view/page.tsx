"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Modal, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Loading from "@/app/loading";
import {
  useGetQuizQuery,
  useGetSingleQuizQuery,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
} from "@/redux/api/quiz";

const { confirm } = Modal;
const QuizList = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [quizID, setQuizID] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: quizList,
    isLoading,
    refetch,
  } = useGetQuizQuery({
    refetchOnMountOrArgChange: true,
  });

  const { data: singleQuizData } = useGetSingleQuizQuery(quizID, {
    refetchOnMountOrArgChange: true,
  });

  const [updateQuiz] = useUpdateQuizMutation();
  const [deleteQuiz] = useDeleteQuizMutation();

  const showModal = (_id: string) => {
    console.log(_id);
    setQuizID(_id);
    setIsModalOpen(true);
  };

  const onSubmit = async (value: any) => {
    try {
      const formData = {
        questionText: value.questionText,
        quizId: value.quizId,
        options: JSON.parse(value.options),
        timeLimit: value.timeLimit,
      };
      await updateQuiz({ data: formData, id: quizID });
      refetch();
      setIsModalOpen(false);
      message.success("Quiz updated successfully");
    } catch (err: any) {
      setIsModalOpen(false);
      message.error("Quiz update failed");
    }
  };

  const handleDelete = async (id: string) => {
    confirm({
      title: "Are you sure you want to delete this quiz?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteQuiz({ id });
          refetch();
          message.success("Quiz deleted successfully");
        } catch (err: any) {
          message.error("Quiz deletion failed");
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setQuizID("");
    reset(); // Reset form fields when modal is closed
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
                onClick={() => showModal(quiz._id)}
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
        title="Update"
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
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                {...register("questionText", { required: true })}
                defaultValue={singleQuizData?.questionText}
              />
              {errors.questionText && (
                <p className="text-red-500">Question Text is required</p>
              )}
            </div>
            <div className="mb-4">
              <label className="font-weight-bold">Quiz ID</label>
              <br />
              <input
                type="number"
                className="input input-bordered w-full"
                {...register("quizId", { required: true })}
                defaultValue={singleQuizData?.quizId}
              />
              {errors.quizId && (
                <p className="text-red-500">Quiz ID is required</p>
              )}
            </div>
            <div className="mb-4">
              <label className="font-weight-bold">Options</label>
              <br />
              <textarea
                className="textarea textarea-bordered w-full"
                {...register("options", { required: true })}
                rows={4}
                defaultValue={JSON.stringify(singleQuizData?.options, null, 2)}
              />
              {errors.options && (
                <p className="text-red-500">Options are required</p>
              )}
            </div>
            <div className="mb-4">
              <label className="font-weight-bold">Time Limit</label>
              <br />
              <input
                type="number"
                className="input input-bordered w-full"
                {...register("timeLimit", { required: true })}
                defaultValue={singleQuizData?.timeLimit}
              />
              {errors.timeLimit && (
                <p className="text-red-500">Time Limit is required</p>
              )}
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default QuizList;
