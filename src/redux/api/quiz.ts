import { } from "@/types";
import { tagTypes } from "../tag-types"
import { baseApi } from "./baseApi"


const Quiz_URL = "/quiz"
export const quizApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        quizCreate: build.mutation({
            query: ({ data }: { data: any }) => ({
                url: `${Quiz_URL}/create`,
                method: 'POST',
                data
            }),
            invalidatesTags: [tagTypes.quiz],
        }),

        getQuiz: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `${Quiz_URL}`,
                    method: "GET",
                    params: arg,
                };
            },
            providesTags: [tagTypes.quiz]
        }),

        getSingleQuiz: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${Quiz_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.quiz],
        }),

        getSingleQuizByQuizId: build.query({
            query: (quizId: string | string[] | undefined) => ({
                url: `${Quiz_URL}/${quizId}`,
                method: "GET",
            }),
            providesTags: [tagTypes.quiz],
        }),

        updateQuiz: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `${Quiz_URL}/update/${id}`,
                method: 'PATCH',
                data
            }),
            invalidatesTags: [tagTypes.quiz],
        }),

        deleteQuiz: build.mutation({
            query: ({ id }: { id: string }) => ({
                url: `${Quiz_URL}/delete/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [tagTypes.quiz],
        }),
    }),
})

export const {
    useQuizCreateMutation,
    useGetQuizQuery,
    useGetSingleQuizQuery,
    useGetSingleQuizByQuizIdQuery,
    useUpdateQuizMutation,
    useDeleteQuizMutation
} = quizApi