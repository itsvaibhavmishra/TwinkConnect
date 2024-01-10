import { Box, Stack, Typography, useTheme, Skeleton } from "@mui/material";
import StyledBadge from "../../../StyledBadge";
import getAvatar from "../../../../utils/createAvatar";

const OnlineChatElement = ({ id, firstName, lastName, avatar, isLoading }) => {
  // using theme
  const theme = useTheme();

  return (
    <Box
      sx={{
        minWidth: 70,
        maxWidth: 75,
        mt: 2,
        height: 50,
        borderRadius: 1,
        backgroundColor: theme.palette.background.paper,
        cursor: "pointer",
        position: "relative",
      }}
    >
      <Stack
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={0.8}
        sx={{
          position: "absolute",
          top: -15,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {isLoading ? (
          <Skeleton
            animation="wave"
            variant="circular"
            width={35}
            height={35}
          />
        ) : (
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
          >
            {getAvatar(avatar, firstName, theme, 35)}
          </StyledBadge>
        )}
        <Typography variant="caption" sx={{ userSelect: "none" }}>
          {isLoading ? (
            <Skeleton animation="wave" height={20} width="4em" />
          ) : (
            firstName
          )}
        </Typography>
      </Stack>
    </Box>
  );
};

export default OnlineChatElement;
