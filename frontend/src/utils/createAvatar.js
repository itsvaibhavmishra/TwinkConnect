import { Avatar } from "@mui/material";

const PRIMARY_NAME = ["A", "N", "H", "L", "Q", "9", "8"];
const INFO_NAME = ["F", "G", "T", "I", "J", "1", "2", "3"];
const SUCCESS_NAME = ["K", "D", "Y", "B", "O", "4", "5"];
const WARNING_NAME = ["P", "E", "R", "S", "C", "U", "6", "7"];
const ERROR_NAME = ["V", "W", "X", "M", "Z"];

function getFirstCharacter(name) {
  return name && name.charAt(0).toUpperCase();
}

function getAvatarColor(name) {
  if (PRIMARY_NAME.includes(getFirstCharacter(name))) return "primary";
  if (INFO_NAME.includes(getFirstCharacter(name))) return "info";
  if (SUCCESS_NAME.includes(getFirstCharacter(name))) return "success";
  if (WARNING_NAME.includes(getFirstCharacter(name))) return "warning";
  if (ERROR_NAME.includes(getFirstCharacter(name))) return "error";
  return "primary";
}

export const createAvatar = (name) => {
  return {
    name: getFirstCharacter(name),
    color: getAvatarColor(name),
  };
};

const getSize = (size) => {
  if (size <= 20) {
    return size - 5;
  } else if (size <= 40) {
    return size - 15;
  } else if (size > 40 && size <= 50) {
    return "auto";
  } else {
    return size - 40;
  }
};

export default function getAvatar(avatar, name, theme, size) {
  return avatar ? (
    <Avatar src={avatar} alt={name} sx={{ width: size, height: size }} />
  ) : (
    <Avatar
      sx={{
        backgroundColor: theme
          ? theme.palette[createAvatar(name).color].main
          : "none",
        fontWeight: 800,
        color: "#fff",
        width: size,
        height: size,
        fontSize: getSize(size), //"auto",
      }}
      alt={name}
    >
      {createAvatar(name).name}
    </Avatar>
  );
}
