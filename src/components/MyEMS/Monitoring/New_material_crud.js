import React, { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { fakeData, usStates, options_strategy, options_month, option_time, option_minute } from './makeData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Id',
        enableEditing: false,
        size: 80,
      },
      {
        accessorKey: 'strategy',
        header: 'strategy',
        editSelectOptions: options_strategy,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.strategy,
          helperText: validationErrors?.strategy,
        },
      },
      {
        accessorKey: 'month',
        header: 'month',
        editSelectOptions: options_month,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.month,
          helperText: validationErrors?.month,
        },
      },
      {
        accessorKey: 'starttime',
        header: 'starttime',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.starttime,
          helperText: validationErrors?.starttime,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              starttime: undefined,
            }),
        },
      },
      
      {
        accessorKey: 'endtime',
        header: 'endtime',
        editVariant: 'select',
        editSelectOptions: option_time,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.endtime,
          helperText: validationErrors?.endtime,
        },
        nestedColumns: [
          {
            accessorKey: 'endminute',
            header: 'endminute',
            editVariant: 'select',
            editSelectOptions: option_minute,
            muiEditTextFieldProps: {
              select: true,
              error: !!validationErrors?.endminute,
              helperText: validationErrors?.endminute,
            },
          }
        ]
      },
      {
        accessorKey: 'power',
        header: 'power',
        muiEditTextFieldProps: {
          type: 'email',
          required: true,
          error: !!validationErrors?.power,
          helperText: validationErrors?.power,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              power: undefined,
            }),
        },
      }
    ],
    [validationErrors]
  );

  const { mutateAsync: createUser, isPending: isCreatingUser } = useCreateUser();
  const { data: fetchedUsers = [], isError: isLoadingUsersError, isFetching: isFetchingUsers, isLoading: isLoadingUsers } = useGetUsers();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
  const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

  const handleCreateUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await createUser(values);
    table.setCreatingRow(null);
  };

  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null);
  };

  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.id);
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveUser,
    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true);
        }}
      >
        Create New User
      </Button>
    ),
    state: {
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};

function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return Promise.resolve();
    },
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'],
      (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]
    );
  },
});
}

function useGetUsers() {
return useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Promise.resolve(fakeData);
  },
  refetchOnWindowFocus: false,
});
}

function useUpdateUser() {
const queryClient = useQueryClient();
return useMutation({
  mutationFn: async (user) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Promise.resolve();
  },
  onMutate: (newUserInfo) => {
    queryClient.setQueryData(['users'], (prevUsers) =>
      prevUsers?.map((prevUser) =>
        prevUser.id === newUserInfo.id ? newUserInfo : prevUser
      )
    );
  },
});
}

function useDeleteUser() {
const queryClient = useQueryClient();
return useMutation({
  mutationFn: async (userId) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Promise.resolve();
  },
  onMutate: (userId) => {
    queryClient.setQueryData(['users'], (prevUsers) =>
      prevUsers?.filter((user) => user.id !== userId)
    );
  },
});
}

const queryClient = new QueryClient();

const New_material_crud = () => (
<QueryClientProvider client={queryClient}>
  <Example />
</QueryClientProvider>
);

export default New_material_crud;

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
!!email.length &&
email
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

function validateUser(user) {
return {
  // firstName: !validateRequired(user.firstName)
  //   ? 'First Name is Required'
  //   : '',
  // lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
  // email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
};
}
