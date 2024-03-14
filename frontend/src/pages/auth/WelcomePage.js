import { Stack, Typography, Box, Button, Divider } from "@mui/material";
import { Link } from "react-router-dom";

import CatLogo from "../../assets/icons/logo/TwinkChat.png";

const WelcomePage = () => {
  return (
    <Box widht={"100%"} sx={{ py: 4 }}>
      <Stack
        justifyContent={"center"}
        sx={{
          flexDirection: {
            xs: "column-reverse",
            md: "row",
          },
          gap: 2,
          alignItems: "center",
          backgroundColor: (theme) => theme.palette.background.paper,
          borderRadius: { xs: "20px 20px 0px 0px", md: "20px" },
          minHeight: { xs: 480, md: 430 },
        }}
        px={4}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{ fontSize: { xs: 35, md: 45 }, textAlign: "center" }}
          >
            Welcome to TwinkChat 😺
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary"
            sx={{ textAlign: "center", mb: { xs: 2, md: 0 } }}
          >
            A robust web-based Real-Time Chat App developed by Vaibhaw Mishra.
          </Typography>

          <Button
            fullWidth
            component={Link}
            to={"/auth/register"}
            size="large"
            variant="contained"
            sx={{
              mt: 4,
              display: { xs: "none", md: "flex" },
              bgcolor: "text.primary",
              color: (theme) =>
                theme.palette.mode === "light" ? "common.white" : "grey.800",
              "&:hover": {
                bgcolor: "text.primary",
                color: (theme) =>
                  theme.palette.mode === "light" ? "common.white" : "grey.800",
              },
            }}
          >
            Join Now To Start Chatting With Your Friends!
          </Button>
        </Box>

        {/* Image and enclosed Box */}
        <Box
          component="img"
          src={CatLogo}
          alt={"TwinkChat Logo"}
          sx={{ width: { xs: 300, md: 400 }, height: "100%" }}
        />
      </Stack>
      <Stack alignItems={"center"}>
        <Button
          component={Link}
          to={"/auth/login"}
          size="large"
          variant="contained"
          sx={{
            borderRadius: "0px 0px 20px 20px",
            width: { xs: "100%", md: "50%" },
          }}
        >
          Lets Get You Logged In!
        </Button>
      </Stack>

      <Box mt={10}>
        <Stack spacing={2}>
          <Divider>
            <Typography variant="h2" sx={{ fontSize: { xs: 25, md: 35 } }}>
              What is TwinkChat?
            </Typography>
          </Divider>
          <Typography variant="body1">
            TwinkChat is a real-time web-based chat application developed by
            Vaibhaw Mishra. Boasting not only a visually appealing UI but also
            packed with an array of enticing features, TwinkChat is designed to
            provide with the best user experience. Powered by the dynamic MERN
            stack and enriched with the sleek design elements of Material-UI
            (MUI), this application delivers a seamless chatting experience.
            From connecting with friends to instant messaging system, TwinkChat
            ensures not just connectivity but a symphony of interactivity and
            speed for its users.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default WelcomePage;
