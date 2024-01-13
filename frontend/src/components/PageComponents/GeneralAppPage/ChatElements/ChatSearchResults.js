import Stack from "@mui/material/Stack";

import NoData from "../../../NoData";
import { MembersList } from "../../../../data";
import AllChatElement from "./AllChatElement";

import Lottie from "react-lottie";
import * as SearchNotFound from "../../../../assets/Illustration/SearchNotFound.json";

const ChatSearchResults = ({ isLoading, searchResults }) => {
  return (
    <Stack
      direction={"column"}
      sx={{
        flexGrow: 1,
        overflow: "scroll",
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
      spacing={2}
      className="scrollbar"
    >
      <Stack spacing={2.4}>
        {isLoading ? (
          MembersList.map((e) => {
            return <AllChatElement key={e._id} {...e} isLoading={isLoading} />;
          })
        ) : searchResults !== null ? (
          searchResults.map((e) => {
            return <AllChatElement key={e._id} {...e} isLoading={isLoading} />;
          })
        ) : (
          <NoData label={"No Users Found!"}>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: SearchNotFound,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              isClickToPauseDisabled={true}
            />
          </NoData>
        )}
      </Stack>
    </Stack>
  );
};
export default ChatSearchResults;
