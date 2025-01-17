import { MenuProps } from "antd";
import {
  ProfileOutlined,
  HeartOutlined,
  MonitorOutlined,
} from "@ant-design/icons";
import Link from "next/link";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <p className="hover:text-slate-400">Profile</p>,
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/profile/account-profile`}
            >
              Account Profile
            </Link>
          ),
          key: `/${role}/profile/account-profile`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: "User",
      icon: <HeartOutlined />,
      key: "User",
      children: [
        {
          label: (
            <Link className="hover:text-slate-400" href={`/${role}/user/view`}>
              View
            </Link>
          ),
          key: `/${role}/user/view`,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: "Quiz",
      icon: <HeartOutlined />,
      key: "Quiz",
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/quiz/create`}
            >
              Create
            </Link>
          ),
          key: `/${role}/quiz/create`,
        },
        {
          label: (
            <Link className="hover:text-slate-400" href={`/${role}/quiz/view`}>
              View
            </Link>
          ),
          key: `/${role}/quiz/view`,
        },
      ],
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: (
        <Link className="hover:text-slate-400" href={`/${role}/attempt-quiz`}>
          Attempt Quiz
        </Link>
      ),
      icon: <MonitorOutlined />,
      key: `/${role}/attempt-quiz`,
    },
  ];

  if (role === "admin") {
    return adminSidebarItems;
  } else if (role === "user") {
    return userSidebarItems;
  } else {
    return defaultSidebarItems;
  }
};
