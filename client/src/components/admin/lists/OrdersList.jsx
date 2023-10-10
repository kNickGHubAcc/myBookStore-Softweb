import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ordersEdit, ordersFetch } from "../../../slices/ordersSlice";
import moment from "moment";


export default function OrdersList() {
  const navigate = useNavigate();        //Hook για την πλοήγηση σε routes
  const dispatch = useDispatch();        //Hook για αποστολή actions στο store, προκειμένου να ενημερώνεται το state
  const {list} = useSelector((state) => state.orders);    //Hook που επιτρέπει την χρήση δεδομένων που βρίσκονται στο store

  useEffect(() => {         //Ανάκτηση των orders
    dispatch(ordersFetch());
  }, [dispatch]);


  const rows = list && list.map((order) => {
      return {
        id: order._id,
        amount: (order.total / 100)?.toLocaleString(),    //Μετατροπή του χρηματικού ποσού σε String
        dStatus: order.delivery_status,
        date: moment(order.createdAt).fromNow(),      //Χρόνος που έχει περάσει από την δημιουργία μιας order
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "date", headerName: "Date", width: 120 },
    {
      field: "delivery_status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {           //Εμφανίζει την κατάσταση μιας order σε cell του πίνακα
        return (
          <div>
            {params.row.dStatus === "pending" ? (
              <Pending>Pending</Pending>
            ) : params.row.dStatus === "dispatched" ? (
              <Dispatched>Dispatched</Dispatched>
            ) : params.row.dStatus === "delivered" ? (
              <Delivered>Delivered</Delivered>
            ) : (
              "error"
            )}
          </div>
        );
      },
    },
    { field: "amount", headerName: "Amount(€)", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      renderCell: (params) => {
        return (
          <Actions>
            <DispatchBtn onClick={() => handleOrderDispatch(params.row.id)}>
              Dispatch
            </DispatchBtn>
            <DeliveryBtn onClick={() => handleDeliver(params.row.id)}>
              Delivered
            </DeliveryBtn>
            <View onClick={() => navigate(`/order/${params.row.id}`)}>
              View
            </View>
          </Actions>
        );
      },
    },
  ];

  const handleOrderDispatch = (id) => {         //Ενημερώνει την κατάσταση της order ως 'dispatched'
    dispatch(
      ordersEdit({
        id,
        delivery_status: "dispatched",
      })
    );
  };

  const handleDeliver = (id) => {
    dispatch(
      ordersEdit({
        id,
        delivery_status: "delivered",
      })
    );
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


//Styled Componets για επιθυμητή CSS
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
const DispatchBtn = styled.button`
  background-color: rgb(38, 198, 249);
`;
const DeliveryBtn = styled.button`
  background-color: rgb(102, 108, 255);
`;
const View = styled.button`
  background-color: rgb(114, 225, 40);
`;
const Pending = styled.div`
  color: yellow;
  background: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 700;
`;
const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 700;
`;
const Delivered = styled.div`
  color: blue;
  background-color: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 700;
`;