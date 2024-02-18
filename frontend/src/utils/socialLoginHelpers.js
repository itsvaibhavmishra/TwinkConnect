export const getGithubCode = () => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_AUTH_CLIENT_ID}&scope=user`;

  return new Promise((resolve, reject) => {
    const popup = window.open(githubAuthUrl, "_blank", "width=600,height=600");

    const checkPopupClosed = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(checkPopupClosed);

        reject(new Error("Popup closed before authorization"));
      } else {
        try {
          const urlParams = new URLSearchParams(popup.location.search);
          const code = urlParams.get("code");
          if (code) {
            popup.close();
            clearInterval(checkPopupClosed);
            resolve(code);
          }
        } catch (error) {
          //
        }
      }
    }, 1000);
  });
};
