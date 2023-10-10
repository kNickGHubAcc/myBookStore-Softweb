import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { userDelete, usersFetch } from "../../../slices/usersSlice";


export default function UsersList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {list} = useSelector((state) => state.users);

  useEffect(() => {           //Ανάκτηση των users
    dispatch(usersFetch());
  }, [dispatch]);


  const rows = list && list.map((user) => {
    return {
      id: user._id,
      uName: user.name,
      uEmail: user.email,
      isAdmin: user.isAdmin,
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "isAdmin",
      headerName: "Role",
      width: 100,
      renderCell: (params) => {         //Εμφανίζει το Role ενός χρήστη (Admin/Customer)
        return (
          <div>
            {params.row.isAdmin ? (
              <Admin>Admin</Admin>
            ) : (
              <Customer>Customer</Customer>
            )}
          </div>
        );
      },
    },
    { field: "uName", headerName: "Name", width: 150 },
    { field: "uEmail", headerName: "Email", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
            <View onClick={() => navigate(`/user/${params.row.id}`)}>View<span style={{color: 'black'}}>/</span>Update</View>
          </Actions>
        );
      },
    },
  ];

  const handleDelete = (id) => {          //Ενημερώνει το store, έπειτα από την διαγραφή ενός χρήστη
    dispatch(userDelete(id));
  };

  return (
    <div style={{ height: 400, width: "100%", marginTop: "2rem", border:'solid', backgroundColor:'#A9A9A9'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </div>
  );
}


//Styled Components
const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;
const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;
const View = styled.button`
  background-color: rgb(114, 225, 40);
`;
const Admin = styled.div`
  color: yellow;
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 900;
`;
const Customer = styled.div`
  color: blue;
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 900;
`;