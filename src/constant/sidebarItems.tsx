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
      label: "Manage Users",
      icon: <HeartOutlined />,
      key: "Manage Users",
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/manage-faculties`}
            >
              Manage Faculties
            </Link>
          ),
          key: `/${role}/manage-faculties`,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Quiz Management",
      icon: <HeartOutlined />,
      key: "Quiz Management",
      children: [
        {
          label: (
            <Link
              className="hover:text-slate-400"
              href={`/${role}/manage-faculties`}
            >
              Manage Faculties
            </Link>
          ),
          key: `/${role}/manage-faculties`,
        },
      ],
    },
  ];

  const userSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: (
        <Link className="hover:text-slate-400" href={`/${role}/career-guide`}>
          Career Guide
        </Link>
      ),
      icon: <MonitorOutlined />,
      key: `/${role}/career-guide`,
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
