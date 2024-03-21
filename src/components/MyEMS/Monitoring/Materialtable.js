import React ,{ useMemo, useState } from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  // createRow,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { fakeData, usStates } from './makeData.js';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


// import Cascader from 'rc-cascader';
// import { Cascader , Input } from 'antd';
import { Cascader } from 'antd';
import {
    Col,
    Card,
    CardBody,
    Input
} from 'reactstrap'
// import {
//     Breadcrumb,
//     BreadcrumbItem,
//     ButtonGroup,
//     Card,
//     CardBody,
//     Col,
//     CustomInput,
//     Row,
//     Form,
//     FormGroup,
//     DropdownItem,
//     DropdownMenu,
//     DropdownToggle,
//     UncontrolledDropdown,
//     Label,
//     Spinner,
// } from 'reactstrap'


const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [selectedPower, setSelectedPower] = useState('');



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
        header: 'Strategy',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.strategy,
          helperText: validationErrors?.strategy,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              strategy: undefined,
            }),
        },
      },
      {
        accessorKey: 'month',
        header: 'Month',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.month,
          helperText: validationErrors?.month,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              month: undefined,
            }),
        },
      },
      {
        accessorKey: 'starttime',
        header: 'Start Time',
        muiEditTextFieldProps: {
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
        header: 'End Time',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.endtime,
          helperText: validationErrors?.endtime,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              endtime: undefined,
            }),
        },
      },
      {
        accessorKey: 'power',
        header: 'Power',
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.power,
          helperText: validationErrors?.power,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              power: undefined,
            }),
        },
      },
    ],
    [validationErrors],
  );


  //call CREATE hook
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  //call UPDATE hook
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();


  //CREATE action
  const handleCreateUser = async ({ values, table }) => {
    // const newValidationErrors = validateUser(values);
    // if (Object.values(newValidationErrors).some((error) => error)) {
    //   setValidationErrors(newValidationErrors);
    //   return;
    // }
    // setValidationErrors({});
    // await createUser(values);
    // table.setCreatingRow(null); //exit creating mode

    const newValidationErrors = validateUser({
        strategy: selectedStrategy,
        month: selectedMonth,
        starttime: selectedStartTime,
        endtime: selectedEndTime,
        power: selectedPower,
      });
      if (Object.values(newValidationErrors).some((error) => error)) {
        setValidationErrors(newValidationErrors);
        return;
      }
      setValidationErrors({});
      await createUser({
        strategy: selectedStrategy,
        month: selectedMonth,
        starttime: selectedStartTime,
        endtime: selectedEndTime,
        power: selectedPower,
      });
  };


  //UPDATE action
  const handleSaveUser = async ({ values, table }) => {
    const newValidationErrors = validateUser(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
    await updateUser(values);
    table.setEditingRow(null); //exit editing mode
  };


  //DELETE action
  const openDeleteConfirmModal = (row) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(row.original.id);
    }
  };


  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
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
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Create New User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      <>
        <DialogTitle variant="h3">Edit User</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
          <MRT_EditActionButtons variant="text" table={table} row={row} />
        </DialogActions>
      </>
    ),
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
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
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

  const options = [
    {
      value: 'strategy1',
      label: '充電',
    },
    {
      value: 'strategy2',
      label: '放電',
    },
    {
        value: 'strategy3',
        label: '待機',
    }
    // Add more strategy options as needed
  ];

  const options_month = [
    {
      value: 'January',
      label: 'January',
    },
    {
      value: 'February',
      label: 'February',
    },
    {
        value: 'March',
        label: 'March',
      },
      {
        value: 'April',
        label: 'April',
      },
      {
        value: 'May',
        label: 'May',
      },
    // Add more month options as needed
  ];

  const option_time = [
    {
      value: '00:00',
      label: '00:00',
    },
    {
      value: '01:00',
      label: '01:00',
    },
    {
      value: '02:00',
      label: '02:00',
    },
    {
      value: '03:00',
      label: '03:00',
    },
    // Add more time options as needed
  ];


  return (

    <div>

        <Card className="bg-light mb-3">
            <CardBody className="p-3">
                {/* <Col xs={3} sm={2}> */}
                    <Cascader
                    options={options}
                    onChange={(value) => setSelectedStrategy(value)}
                    placeholder="Select Strategy"
                    value={selectedStrategy}
                    />
                {/* </Col> */}
                {/* <Col xs={3} sm={2}> */}
                    <Cascader
                    options={options_month}
                    onChange={(value) => setSelectedMonth(value)}
                    placeholder="Select Month"
                    value={selectedMonth}
                    />
                {/* </Col> */}
                {/* <Col xs={3} sm={2}> */}
                    <Cascader
                    options={option_time}
                    onChange={(value) => setSelectedStartTime(value)}
                    placeholder="Select Start Time"
                    value={selectedStartTime}
                    />
                {/* </Col> */}
                {/* <Col xs={3} sm={2}> */}
                    <Cascader
                    options={option_time}
                    onChange={(value) => setSelectedEndTime(value)}
                    placeholder="Select End Time"
                    value={selectedEndTime}
                    />
                {/* </Col> */}
                {/* <Col xs={3} sm={2}> */}
                    <Input
                    value={selectedPower}
                    onChange={(e) => setSelectedPower(e.target.value)}
                    placeholder="Enter Power"
                    />
                {/* </Col> */}
            </CardBody>
        </Card>
        <Box sx={{ marginBottom: '1rem' }}>
            <Button onClick={handleCreateUser} variant="contained" color="primary">
                Create New User
            </Button>
        </Box>

        <MaterialReactTable table={table} />
    </div>
  );
};


//CREATE hook (post new user to api)
function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) => [
        ...prevUsers,
        {
          ...newUserInfo,
          id: (Math.random() + 1).toString(36).substring(7),
        },
      ]);
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}


//READ hook (get users from api)
function useGetUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      //send api request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve(fakeData);
    },
    refetchOnWindowFocus: false,
  });
}


//UPDATE hook (put user in api)
function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (newUserInfo) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
        ),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}


//DELETE hook (delete user in api)
function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userId) => {
      //send api update request here
      await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
      return Promise.resolve();
    },
    //client side optimistic update
    onMutate: (userId) => {
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.filter((user) => user.id !== userId),
      );
    },
    // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  });
}


const queryClient = new QueryClient();


const Materialtable = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}>
    <Example />
  </QueryClientProvider>
);


export default Materialtable;
// const ExampleWithProviders = () => (
//   //Put this with your other react-query providers near root of your app
//   <QueryClientProvider client={queryClient}>
//     <Example />
//   </QueryClientProvider>
// );


// export default ExampleWithProviders;


const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );


function validateUser(user) {
  return {
    strategy: !validateRequired(user.strategy)
      ? 'First Name is Required'
      : '',
    month: !validateRequired(user.month) ? 'Last Name is Required' : '',
    // star: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
  };
}
