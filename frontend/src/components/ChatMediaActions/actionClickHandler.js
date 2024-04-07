import { ShowSnackbar } from "../../redux/slices/userSlice";

const actionHandler = (type, dispatch) => {
  switch (type) {
    case "gaming":
      return console.log("gaming click");

    // handling photo click
    case "photo":
      const acceptedFileTypes = [
        "image/png",
        "image/jpeg",
        "image/gif",
        "image/webp",
      ];

      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = acceptedFileTypes.join(",");
      fileInput.multiple = true;
      fileInput.click();

      // handling selected file
      fileInput.addEventListener("change", (e) => {
        const selectedFiles = Array.from(e.target.files);

        selectedFiles.forEach((img) => {
          console.log("image types: ", img.type);
          if (!acceptedFileTypes.includes(img.type)) {
            dispatch(
              ShowSnackbar({
                severity: "info",
                message: "Selected file types are not allowed",
              })
            );
          }
        });

        // console.log(selectedFiles);
      });
      break;

    case "document":
      return console.log("doc click");

    case "contact":
      return console.log("contact click");

    default:
      break;
  }

  return null;
};

export default actionHandler;
