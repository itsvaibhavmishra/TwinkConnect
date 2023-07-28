import {
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import FormProvider from "../../components/hook-form/FormProvider";
import { RHFTextField } from "../../components/hook-form";
import { XCircle } from "phosphor-react";
import RHFAutoComplete from "../../components/hook-form/RHFAutoComplete";
import { faker } from "@faker-js/faker";

const CreateGroupForm = () => {
  const NewGroupSchema = Yup.object().shape({
    groupName: Yup.string().required("Group Name is Required"),
    members: Yup.array().min(2, "Minimum 2 members is required"),
  });

  const defaultValues = {
    groupName: "",
    members: [],
  };

  const methods = useForm({
    resolver: yupResolver(NewGroupSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isValid },
  } = methods;

  const onSubmit = async (data) => {
    try {
      // submit data to backend
      console.log("Data", data);
    } catch (error) {
      console.error(error);
      reset();
      setError("afterSubmit", {
        ...error,
        message: error.message,
      });
    }
  };

  // Dummy list of options for members
  const MEMBERS = [
    { name: "Name 1", image: faker.image.avatar() },
    { name: "Name 2", image: faker.image.avatar() },
    { name: "Name 3", image: faker.image.avatar() },
  ];

  // Function to handle chip deletion
  const handleChipDelete = (index) => {
    const membersArray = methods.getValues("members");
    const updatedMembers = [...membersArray];
    updatedMembers.splice(index, 1);
    methods.setValue("members", updatedMembers);
  };

  // Function to handle option selection
  const handleOptionSelect = (option) => {
    const membersArray = methods.getValues("members");
    const isMemberSelected = membersArray.some(
      (member) => member.name === option.name
    );

    if (!isMemberSelected) {
      // If member is not selected and has a non-empty name, add it
      if (option.name.trim() !== "") {
        const isOptionPresent = MEMBERS.some(
          (member) => member.name === option.name
        );
        if (isOptionPresent) {
          const selectedMember = MEMBERS.find(
            (member) => member.name === option.name
          );
          if (selectedMember) {
            const updatedMembers = [...membersArray, selectedMember];
            methods.setValue("members", updatedMembers);
          }
        } else {
          // Clear the input field if the entered text is not present in the members list
          methods.setValue("members", []);
        }
      }
    } else {
      // If member is already selected, remove it
      const updatedMembers = membersArray.filter(
        (member) => member.name !== option.name
      );
      methods.setValue("members", updatedMembers);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="groupName" label="Group Name" />
        <RHFAutoComplete
          name="members"
          label="Add Members"
          multiple
          freeSolo
          options={MEMBERS.map((option) => option)} // Pass the MEMBERS array as options
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                avatar={<Avatar alt={option.name} src={option.image} />}
                key={index}
                variant="outlined"
                label={option.name}
                {...getTagProps({ index })}
                onDelete={() => handleChipDelete(index)}
              />
            ))
          }
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
              onClick={() => handleOptionSelect(option)}
            >
              <Avatar src={option.image} />
              {option.name}
            </Box>
          )}
          ChipProps={{ size: "medium" }}
        />
        <Stack
          spacing={2}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"end"}
        >
          <Button type="submit" variant="contained">
            Create Group
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth={"xs"}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      keepMounted
      sx={{ p: 4 }}
    >
      <DialogTitle sx={{ mb: 3 }} id="responsive-dialog-title">
        {/* Heading for dialog */}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h5">Create New Group</Typography>
          <IconButton onClick={handleClose}>
            <XCircle weight="fill" />
          </IconButton>
        </Stack>
      </DialogTitle>

      {/* Form */}
      <DialogContent>
        <CreateGroupForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroup;
