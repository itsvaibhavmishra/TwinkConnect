import {
  //   Nav Buttons
  UserCircle,
  ChatCircleDots,
  Users,
  UserList,
  Gear,

  //   Profile Menu
  IdentificationCard,

  // Text Field Actions
  Image,
  Sticker,
  Camera,
  File,
  User,
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

const Friend_Requests = [
  {
    _id: "65432fsdfsd09fds0",
    firstName: "User",
    lastName: "1",
    avatar: "",
    email: "user@gmail.com",
    createdAt: "2023-12-12T15:39:14.688+00:00",
  },
  {
    _id: "65432fsdfsd09fds1",
    firstName: "Akshat",
    lastName: "Mishra",
    avatar: "",
    email: "akshat@gmail.com",
    createdAt: "2023-12-12T15:39:14.688+00:00",
  },
  {
    _id: "65432fsdfsd09fds2",
    firstName: "Dhananjay",
    lastName: "Jain",
    avatar: "",
    email: "dhananjay@gmail.com",
    createdAt: "2023-12-12T15:39:14.688+00:00",
  },
  {
    _id: "65432fsdfsd09fds3",
    firstName: "Vipul",
    lastName: "Kumar",
    avatar: "",
    email: "vipulk0000@gmail.com",
    createdAt: "2023-12-12T15:39:14.688+00:00",
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

const Actions = [
  {
    color: "lighter",
    contrast: "#222",
    icon: <User size={24} />,
    y: 382,
    title: "Contact",
  },
  {
    color: "light",
    contrast: "#333",
    icon: <File size={24} />,
    y: 312,
    title: "Document",
  },

  {
    color: "main",
    contrast: "#fff",
    icon: <Camera size={24} />,
    y: 242,
    title: "Image",
  },
  {
    color: "dark",
    contrast: "#fff",
    icon: <Sticker size={24} />,
    y: 172,
    title: "Stickers",
  },

  {
    color: "darker",
    contrast: "#fff",
    icon: <Image size={24} />,
    y: 102,
    title: "Photo/Video",
  },
];

export { Nav_Buttons, MembersList, Friend_Requests, Profile_Menu, Actions };
