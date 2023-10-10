import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { productDelete } from "../../../slices/productsSlice";
import EditProduct from "../EditProduct";


export default function ProductsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {items} = useSelector((state) => state.products);

  const handleDelete = (id) => {        //Ενημερώνει το stοre, έπειτα από την διαγραφή ενός βιβλίου
    dispatch(productDelete(id));
  };

  const rows = items && items.map((item) => {
      return {
        id: item._id,
        imageUrl: item.image.url,
        pName: item.name,
        pDesc: item.description,
        price: item.price.toLocaleString(),
      };
    });

  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 80,
      renderCell: (params) => {         //Εμφανίζει την εικόνα ενός βιβλίου
        return (
          <ImageContainer>
            <img src={params.row.imageUrl} alt="" />
          </ImageContainer>
        );
      },
    },
    { field: "pName", headerName: "Name", width: 150 },
    { field: "pDesc", headerName: "Description", width: 160},
    {
      field: "price",
      headerName: "Price(€)",
      width: 80,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 180,
      renderCell: (params) => {
        return (
          <Actions>
            <Delete onClick={() => handleDelete(params.row.id)}>Delete</Delete>
            <EditProduct prodId={params.row.id} />
            <View onClick={() => navigate(`/product/${params.row.id}`)}>
              View
            </View>
          </Actions>
        );
      },
    },
  ];
  
  return (
    <div style={{ height: 420, width: "100%", marginTop: "2rem", border:'solid', backgroundColor:'#A9A9A9'}}>
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


//Styled components
const ImageContainer = styled.div`
  img {
    height: 40px;
    width: 35px;
  }
`;
const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 8px 6px;
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