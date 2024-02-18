export const getOAuthCode = (url) => {
  const oauthAuthUrl = url;

  return new Promise((resolve, reject) => {
    const popup = window.open(oauthAuthUrl, "_blank", "width=600,height=600");

    const checkPopupClosed = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(checkPopupClosed);

        reject(new Error("Popup closed before authorization"));
      } else {
        try {
          const urlParams = new URLSearchParams(popup.location.search);
          const code = urlParams.get("code");
          if (code) {
            console.log(urlParams);
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
