"use client";

import { useGetUsersQuery } from "@/redux/api/UserApi";
import React from "react";

const UserTrack = () => {
  const { data, isLoading, refetch } = useGetUsersQuery({
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl text-blue-500 font-semibold mb-4">
        User List
      </h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Quiz Mark</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((user: any) => (
              <tr key={user._id} className="even:bg-gray-100">
                <td className="py-2 px-4 border-b">{user.fullName}</td>
                <td className="py-2 px-4 border-b">{user.quizMark}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="py-2 px-4 text-center border-b">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTrack;
