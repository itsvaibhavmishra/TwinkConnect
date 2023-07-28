import { faker } from "@faker-js/faker";
import {
  ArrowBendUpLeft,
  ArrowBendUpRight,
  ChatCircleDots,
  Gear,
  GearSix,
  Phone,
  SignOut,
  SmileyXEyes,
  Star,
  Trash,
  User,
  Users,
  WarningCircle,
} from "phosphor-react";

const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
    address: "profile", // route to /profile
  },
  {
    title: "Settings",
    icon: <Gear />,
    address: "settings",
  },
  {
    title: "Sign Out",
    icon: <SignOut />,
    address: "",
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleDots />,
    address: "app", // route to /app
  },
  {
    index: 1,
    icon: <Users />,
    address: "group", // route to /group
  },
  {
    index: 2,
    icon: <Phone />,
    address: "call", // route to /call
  },
];

const Nav_Setting = [
  {
    index: 3,
    icon: <GearSix />,
  },
];

const MembersList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true,
  },
];

const CallLogs = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: false,
    incoming: true,
    time: "9:36",
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: true,
    incoming: false,
    time: "08:42",
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: true,
    incoming: true,
    time: "04:00",
    online: false,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: false,
    incoming: false,
    time: "10:35",
    online: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: false,
    incoming: true,
    time: "12:02",
    online: false,
  },
];

const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:36",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "12:02",
    unread: 2,
    pinned: true,
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "10:35",
    unread: 3,
    pinned: false,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "04:00",
    unread: 0,
    pinned: false,
    online: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
];

const Chat_History = [
  {
    type: "msg",
    message: "Hi 👋🏻, How are ya ?",
    incoming: true,
    outgoing: false,
  },
  {
    type: "divider",
    text: "Today",
  },
  {
    type: "msg",
    message: "Hi 👋 Panda, not bad, u ?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Can you send me an abstarct image?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Ya sure, sending you a pic",
    incoming: true,
    outgoing: false,
  },

  {
    type: "msg",
    subtype: "img",
    message: "Here You Go",
    img: faker.image.abstract(),
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "Can you please send this in file format?",
    incoming: false,
    outgoing: true,
  },

  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "This is a reply",
    message: "Yep, I can also do that",
    incoming: false,
    outgoing: true,
  },
];

const Message_options = [
  {
    title: "Reply",
    icon: <ArrowBendUpLeft />,
  },
  {
    title: "React to message",
    icon: <SmileyXEyes />,
  },
  {
    title: "Forward message",
    icon: <ArrowBendUpRight />,
  },
  {
    title: "Star message",
    icon: <Star />,
  },
  {
    title: "Report",
    icon: <WarningCircle />,
  },
  {
    title: "Delete Message",
    icon: <Trash />,
  },
];

const SHARED_LINKS = [
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Here's the link",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Ok gotcha!",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Visit this link",
    incoming: true,
    outgoing: false,
  },
];

const SHARED_DOCS = [
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Go through this",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Is this the one?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Here you go.",
    incoming: true,
    outgoing: false,
  },
];

export {
  Profile_Menu,
  Nav_Setting,
  Nav_Buttons,
  MembersList,
  CallLogs,
  ChatList,
  Chat_History,
  Message_options,
  SHARED_DOCS,
  SHARED_LINKS,
};
