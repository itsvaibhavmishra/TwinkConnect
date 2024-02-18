import { Divider, IconButton, Stack } from "@mui/material";
import { GithubLogo, GoogleLogo, TwitterLogo } from "phosphor-react";
import { useGoogleLogin } from "@react-oauth/google";

import { useDispatch } from "react-redux";
import { GoogleLogin } from "../../redux/slices/actions/authActions";

const AuthSocial = () => {
  const dispatch = useDispatch();
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      dispatch(GoogleLogin(tokenResponse));
    },
  });

  return (
    <>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
        }}
      >
        OR
      </Divider>
      <Stack direction={"row"} spacing={2} justifyContent={"center"}>
        <IconButton onClick={() => googleLogin()}>
          <GoogleLogo color="#DF3E30" />
        </IconButton>
        <IconButton color="inherit">
          <GithubLogo />
        </IconButton>
        <IconButton>
          <TwitterLogo color="#1C9CEA" />
        </IconButton>
      </Stack>
    </>
  );
};

export default AuthSocial;
