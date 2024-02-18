import { Divider, IconButton, Stack } from "@mui/material";
import { GithubLogo, GoogleLogo, TwitterLogo } from "phosphor-react";
import { useGoogleLogin } from "@react-oauth/google";

import { useDispatch } from "react-redux";
import {
  GithubLogin,
  GoogleLogin,
} from "../../redux/slices/actions/authActions";

import { getGithubCode } from "../../utils/socialLoginHelpers";

const AuthSocial = () => {
  const dispatch = useDispatch();

  // ---------- inner functions ----------
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(GoogleLogin(tokenResponse));
    },
  });

  const githubLogin = async () => {
    try {
      const code = await getGithubCode();

      dispatch(GithubLogin(code));
    } catch (error) {
      console.log("Github Error:", error.message);
    }
  };

  // -------------------------------------

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
        <IconButton color="inherit" onClick={() => githubLogin()}>
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
