import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";


const Products = () => {
  const navigate = useNavigate();

  return (
    <>
      <AdminHeaders>
        <h2>All Books</h2>
        <PrimaryButton onClick={() => navigate("/admin/products/create-product")}>
          Create New Book
        </PrimaryButton>
      </AdminHeaders>
      <Outlet />
    </>
  );
};


//Styled Components
const AdminHeaders = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PrimaryButton = styled.button`
  padding: 15px 15px;
  border-radius: 5px;
  font-weight: 900;
  letter-spacing: 1.15px;
  background-color: #228B22;
  color: #f9f9f9;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0.5rem 0;
`;


export default Products;