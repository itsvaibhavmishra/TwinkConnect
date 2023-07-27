import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import FormProvider from '../../components/hook-form/FormProvider';
import { RHFTextField } from '../../components/hook-form';
import { XCircle } from 'phosphor-react';
import RHFAutoComplete from '../../components/hook-form/RHFAutoComplete';

const CreateGroupForm = () => {
  const NewGroupSchema = Yup.object().shape({
    groupName: Yup.string().required('Group Name is Required'),
    members: Yup.array().min(2, 'Minimum 2 members is required'),
  });

  const defaultValues = {
    groupName: '',
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
      console.log('Data', data);
    } catch (error) {
      console.error(error);
      reset();
      setError('afterSubmit', {
        ...error,
        message: error.message,
      });
    }
  };

  // Dummy list of options for members
  const MEMBERS = ['Name 1', 'Name 2', 'Name 3'];

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="groupName" label="Group Name" />
        <RHFAutoComplete
          name="members"
          label="Add Members"
          multiple
          freeSolo
          options={MEMBERS.map((option) => option)}
          ChipProps={{ size: 'medium' }}
        />
        <Stack
          spacing={2}
          direction={'row'}
          alignItems={'center'}
          justifyContent={'end'}
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
      maxWidth={'xs'}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      keepMounted
      sx={{ p: 4 }}
    >
      <DialogTitle sx={{ mb: 3 }} id="responsive-dialog-title">
        {/* Heading for dialog */}
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
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
