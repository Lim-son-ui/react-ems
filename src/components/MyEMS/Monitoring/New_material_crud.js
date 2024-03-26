import React, { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import {
    Row,
    Col,
} from 'reactstrap'
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


import axios from 'axios';

const Example = () => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
    //   {
    //     accessorKey: 'id',
    //     header: 'Id',
    //     enableEditing: false,
    //     size: 80,
    //   },
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
        editVariant: 'select',
        editSelectOptions: option_time,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.starttime,
          helperText: validationErrors?.starttime,
        },
      },
      {
        accessorKey: 'startminute',
        header: 'startminute',
        editVariant: 'select',
        editSelectOptions: option_minute,
        muiEditTextFieldProps: {
          select: true,
          error: !!validationErrors?.startminute,
          helperText: validationErrors?.startminute,
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
      },
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

   //新增的部分~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-
   //主要用於 確定要完整新增資料  0326新增
   const confirmm = () => {
        if(window.confirm('請問，確定要執行送出?')){
        confirm_submit();
        }
    }

    const delet = () => {
        axios.delete("http://localhost:3088/del_getData");
    }
    const confirm_queryClient = useQueryClient();
    const confirm_submit = async () => {
        
        // confirm_queryClient.getQueryData(['users'], (allschedule) => {
           
        // })
        //console.log(confirm_data);
        delet();
        const confirm_data = confirm_queryClient.getQueryData(['users']);
        //axios.delete("http://localhost:3088/del_getData");
        console.log("this is confirm data")
        console.log(confirm_data)

        if(confirm_data){
            try{

                //axios.delete("http://localhost:3088/del_getData");

                // confirm_data.map((val) => {
                confirm_data.map((val, key) => {
                    // fetchedUsers.forEach((val) => {
                    // 解析選定的開始時間字符串，假設它的格式是 "12時30分"    
                    //if( val.starttime && val.startminute && val.endtime && val.endminute) {
                                        
                        const  hourStr = val.starttime.split('時')
                        console.log("this is hourstr")
                        console.log(hourStr)
                        const  startTimeHour = parseInt(hourStr, 10);
                        const  minuteStr = val.startminute.split('分')
                        const  startTimeMinute = parseInt(minuteStr, 10);
        
                        const end_hourStr = val.endtime.split('時')
                        const endTimeHour = parseInt(end_hourStr, 10);
                        const end_minuteStr = val.endminute.split('分')
                        const endTimeMinute = parseInt(end_minuteStr, 10);
        
                        axios.post("http://localhost:3088/write_addData", {
                            startTimeHour,
                            startTimeMinute,
                            endTimeHour,
                            endTimeMinute
                        }).then(() => {
                            // 請求成功處理
                        }).catch((error) => {
                            // 請求失敗處理
                            console.error("Error:", error);
                        });
                    //}
                });
            }
            catch(error){
                console.error("error:", error);
            }
        }
        
    };

   //新增的部分~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-

  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    createDisplayMode: 'row',
    editDisplayMode: 'row',
    enableEditing: true,
    getRowId: (row) => row.id,
    positionActionsColumn: 'last',

    //新增的部分~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-

    muiTableHeadCellProps: {
        sx:(theme) => ({
            // color: theme.palette.text.secondary,
            color: 'snow',
            // backgroundColor: 'darkcyan'
            backgroundColor: 'darkslategray'
        }),
    },

    muiTableBodyCellProps: ({ column }) => ({
        sx: {
            color: 'darkblue',
            // backgroundColor: 'cadetblue'
            backgroundColor: 'honeydew'
        }
    }),

    //新增的部分~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-

    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
        // backgroundColor: 'black'
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
      <div>
        <Row>
            {/* <Col xs={6} sm={3}> */}
                <Button
                    variant="contained"
                    onClick={() => {
                    table.setCreatingRow(true);
                    }}
                >
                    新增排程
                </Button>
            {/* </Col>
            <Col xs={6} sm={3}> */}
                <Button
                    color="success"
                    variant="contained"
                    onClick={confirmm}
                >
                    送出
                </Button>
            {/* </Col> */}
        </Row>
      </div>
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
