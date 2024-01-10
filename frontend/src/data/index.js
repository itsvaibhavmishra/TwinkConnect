import {
  //   Nav Buttons
  UserCircle,
  ChatCircleDots,
  Users,
  UserList,
  Gear,

  //   Profile Menu
  IdentificationCard,
} from "phosphor-react";

const MembersList = [
  {
    _id: 0,
    firstName: "Vaibhav",
    lastName: "Mishra",
    avatar: "",
    activityStatus: "Hey there! I love using TwinkChat ❤️",
    msg: "Hello",
    time: "9:36",
    unread: 2,
    pinned: false,
    online: true,
  },
  {
    _id: 1,
    firstName: "Gaibhav",
    lastName: "Mishra",
    avatar: "",
    activityStatus: "Hey there! I love using TwinkChat ❤️",
    msg: "Hello",
    time: "9:36",
    unread: 0,
    pinned: false,
    online: true,
  },
  {
    _id: 2,
    firstName: "Baibhav",
    lastName: "Mishra",
    avatar: "",
    activityStatus: "Hey there! I love using TwinkChat ❤️",
    msg: "Hello",
    time: "9:36",
    unread: 5,
    pinned: false,
    online: true,
  },
  {
    _id: "65787ea22c8433b199ced18d",
    firstName: "Aaibhav",
    lastName: "Mishra",
    avatar: "",
    activityStatus: "Hey there! I love using TwinkChat ❤️",
    msg: "Hello",
    time: "9:36",
    unread: 0,
    pinned: false,
    online: true,
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <UserCircle size={28} />,
    address: "profile", // route to /app
  },
  {
    index: 1,
    icon: <ChatCircleDots />,
    address: "app", // route to /group
  },
  {
    index: 2,
    icon: <Users />,
    address: "group", // route to /call
  },
  {
    index: 3,
    icon: <UserList />,
    address: "contact", // route to /call
  },
  {
    index: 5,
    icon: <Gear />,
    address: "settings", // route to /call
  },
];

const Profile_Menu = [
  {
    title: "Profile",
    icon: <IdentificationCard size={18} />,
    address: "profile", // route to /profile
  },
  {
    title: "Settings",
    icon: <Gear size={18} />,
    address: "settings", // route to /settings
  },
];

export { Nav_Buttons, MembersList, Profile_Menu };
