import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components';
import { productsCreate } from '../../slices/productsSlice';


const CreateProduct = () => {
  const dispatch = useDispatch();
  const {createStatus} = useSelector((state) => state.products);
  const [productImg, setProductImg] = useState("");      //Hook για την διαχείριση του state εντός ενός functional component
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDesc] = useState("");
  
  const handleProductImageUpload = (e) => {      //Δυνατότητα για upload μιας εικόνας
    const file = e.target.files[0];
    TransformFileData(file);
  };

  const TransformFileData = (file) => {      //Μετατροπή της εικόνας, σε κατάλληλη μορφή (base64), προκειμένου να εμφάνίζεται στην σελίδα
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    }else {
      setProductImg("");
    }
  };
  
  const handleSubmit = async (e) =>{        //Δημιουργία ενός νέου βιβλίου και ενημέρωση του store
    e.preventDefault();             //Ακυρώνει την default συμπεριφορά της φόρμας (π.χ πιθανή ανανέωση μετά το sumbit)
    dispatch(productsCreate({
      name,
      price,
      description,
      image: productImg,
    }));
  }

  return(
    <StyledCreateProduct>
        <StyledForm onSubmit={handleSubmit}>
            <h3>Create a new book</h3> 
            <input
              type="text"
              required
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}       //Η τιμή που εισάγει ο χρήστης αποθηκεύεται ως το όνομα του βιβλίου
            />
            <input
              type="text"
              required
              placeholder="Short description"
              onChange={(e) => setDesc(e.target.value)}
            />
            <input
              type="number"
              required
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              id="imgUpload" 
              type="file"
              accept="image/*"
              onChange={handleProductImageUpload}
              required
            />
            <PrimaryButton type="submit">
              {createStatus === "pending" ? "Submitting" : "Submit"}
            </PrimaryButton>
        </StyledForm>
        <ImagePreview>
            {productImg ? (<>                         {/* Αν η εικόνα έχει ανέβει επιτυχώς, θα εμφανίζεται. Διαφορετικά θα βλέπουμε 'Image preview' */}
              <img src={productImg} alt="book-image"/>
            </>) : (<p>Image preview</p>)}
        </ImagePreview>
    </StyledCreateProduct>
  );
};


//Styled Components
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid #000;
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;
const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;
const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid #000;
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


export default CreateProduct;