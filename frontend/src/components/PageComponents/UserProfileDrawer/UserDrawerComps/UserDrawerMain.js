import {
  useTheme,
  Box,
  Stack,
  Divider,
  Typography,
  Skeleton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Lottie from "react-lottie";

import { getSimpleData } from "../../../../utils/timeFormatter";
import { useEffect, useState } from "react";

const getRandomAnimation = () => {
  const randomIndex = Math.floor(Math.random() * 5) + 1;
  return import(
    `../../../../assets/Illustration/Animations/CatAnimation${randomIndex}.json`
  );
};

const UserDrawerMain = ({ userData, isLoading }) => {
  const theme = useTheme();

  const [catAnimation, setCatAnimation] = useState(null);

  useEffect(() => {
    getRandomAnimation().then((animation) => {
      setCatAnimation(animation);
    });
  }, []);

  return (
    <Box
      width={"100%"}
      mt={9}
      sx={{
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Stack spacing={3}>
        <Divider>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={5}
          >
            {/* Action Buttons */}
            <LoadingButton
              loading={isLoading}
              size="large"
              variant="outlined"
              color={"error"}
            >
              Remove Friend
            </LoadingButton>
            <LoadingButton loading={isLoading} size="large" variant="outlined">
              Send Message
            </LoadingButton>
          </Stack>
        </Divider>

        <Stack alignItems={"center"} spacing={2}>
          <Typography variant="subtitle1">
            {isLoading ? (
              <Skeleton animation="wave" height={20} width="10em" />
            ) : (
              userData.email
            )}
          </Typography>
          <Typography variant="subtitle1">
            {isLoading ? (
              <Skeleton animation="wave" height={20} width="15em" />
            ) : (
              `User Joined On: ${getSimpleData(userData.createdAt)}`
            )}
          </Typography>
          <Box width={"12em"}>
            {catAnimation && (
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: catAnimation.default,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                isClickToPauseDisabled={true}
              />
            )}
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
export default UserDrawerMain;
