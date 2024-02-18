import { Divider, IconButton, Stack } from "@mui/material";
import { GithubLogo, GoogleLogo } from "phosphor-react";
import { useGoogleLogin } from "@react-oauth/google";

import { useDispatch } from "react-redux";
import {
  GithubLogin,
  GoogleLogin,
  LinkedinLogin,
} from "../../redux/slices/actions/authActions";

import { getOAuthCode } from "../../utils/socialLoginHelpers";
import Iconify from "../../components/Iconify";
import { ShowSnackbar } from "../../redux/slices/userSlice";

const AuthSocial = () => {
  const dispatch = useDispatch();

  const baseURL = window.location.origin;

  // ---------- inner functions ----------

  const showSnackbar = (socialType) => {
    dispatch(
      ShowSnackbar({
        severity: "error",
        message: `Unable to login using ${socialType}`,
      })
    );
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(GoogleLogin(tokenResponse));
    },
    onError: (error) => {
      showSnackbar("google");
      console.log(error);
    },
  });

  const githubLogin = async () => {
    try {
      const code = await getOAuthCode(
        `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_AUTH_CLIENT_ID}&scope=user`
      );

      dispatch(GithubLogin(code));
    } catch (error) {
      showSnackbar("github");
      console.log("Github Error:", error.message);
    }
  };

  const linkedinLogin = async () => {
    try {
      const code = await getOAuthCode(
        `https://linkedin.com/oauth/v2/authorization?client_id=${process.env.REACT_APP_LINKEDIN_AUTH_CLIENT_ID}&response_type=code&scope=email profile openid&redirect_uri=${baseURL}/auth/login`
      );

      dispatch(LinkedinLogin(code));
    } catch (error) {
      showSnackbar("linkedin");
      console.log("Linkedin Error:", error.message);
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
        <IconButton onClick={() => linkedinLogin()}>
          <Iconify icon={"ri:linkedin-line"} color="#1C9CEA" />
        </IconButton>
      </Stack>
    </>
  );
};

export default AuthSocial;
