import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { productsEdit } from "../../slices/productsSlice";


export default function EditProduct({ prodId }) {
  const [open, setOpen] = useState(false);
  const {items} = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const {editStatus} = useSelector((state) => state.products);
  const [previewImg, setPreviewImg] = useState("");
  const [currentProd, setCurrentProd] = useState({});
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");


  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    TransformFileData(file);
  };

  const TransformFileData = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
        setPreviewImg(reader.result);
      };
    }else {
      setProductImg("");
    }
  };

  const handleSubmit = async (e) => {         //Update ενός βιβλίου με τα νέα στοιχεία και ενημέρωση του store
    e.preventDefault();
    dispatch(
      productsEdit({
        productImg,
        product: {
          ...currentProd,         //Χρήση Spread Operator για την ανάκτηση των υπολοίπων properties ενός βιβλίου
          name: name,
          price: price,
          description: desc,
        },
      })
    );
  };

  const handleClickOpen = () => {           //Εμφάνιση ενός παραθύρου-φόρμας (modal) με φορτωμένα τα στοιχεία ενός βιβλίου στα αντίστοιχα πεδία (name κ.λ.π)
    setOpen(true);

    let selectedProd = items.filter((item) => item._id === prodId);
    selectedProd = selectedProd[0];

    setCurrentProd(selectedProd);
    setPreviewImg(selectedProd.image?.url);
    setProductImg("");
    setName(selectedProd.name);
    setPrice(selectedProd.price);
    setDesc(selectedProd.description);
  };

  const handleClose = () => {             //Κλείσιμο του modal
    setOpen(false);
  };

  return (
    <div>
      <Edit onClick={handleClickOpen}>Edit</Edit>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <StyledEditProduct>
            <StyledForm onSubmit={handleSubmit}>
              <h3>Edit Book's info</h3>
              <input
                id="imgUpload"
                accept="image/*"
                type="file"
                onChange={handleProductImageUpload}           //Άνοιγμα παραθύρου για upload μιας εικόνας
              />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Short Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
              <PrimaryButton type="submit">
                {editStatus === "pending" ? "Submitting" : "Submit"}
              </PrimaryButton>
            </StyledForm>
            <ImagePreview>
              {previewImg ? (<>
                <img src={previewImg} alt="error!" />
                </>
              ) : (
                <p>Image preview</p>
              )}
            </ImagePreview>
          </StyledEditProduct>
        </DialogContent>
        <DialogActions>
          <Button style={{backgroundColor: 'black', fontSize:'15px', fontWeight: '700'}} onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


//Styled Components
const Edit = styled.button`
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;
const StyledEditProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    max-width: 100%;
  }
`;
const PrimaryButton = styled.button`
  padding: 9px 12px;
  border-radius: 5px;
  font-weight: 900;
  letter-spacing: 1.15px;
  background-color: #0000FF;
  color: #f9f9f9;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0.5rem 0;
`;