import {NavLink, Outlet} from 'react-router-dom';
import styled from 'styled-components';
import {useSelector} from 'react-redux';


const Dashboard = () => {
  const user = useSelector((state) => state.auth);
  if(!user.isAdmin){            //Αν ένας Customer προσπαθήσει να συνδεθεί ως Admin
    return <p style={{
        textAlign: 'center',
        marginTop: '40vh',
        transform: 'translateY(-50%)',
        fontSize: '40px'}}>
        Access denied
      </p>
    }

  return(
    <StyledDashboard>
      <SideNav>
        <h3><p></p><p></p></h3>
        <NavLink to="/admin/summary"
          className={({isActive}) => 
            isActive ? "link-active" : "link-inactive"        //Εμφάνιση κατάλληλης CSS με βάση την επιλογή μας (Home, Books, Orders και Users)
          } 
        ><i class="fa-solid fa-house fa-sm"> Home</i>         {/* Fontawesome Icon */}
        </NavLink>
        <NavLink 
          to="/admin/products"
          className={({isActive}) => 
            isActive ? "link-active" : "link-inactive"
          }
        ><i class="fa-solid fa-book fa-sm"> Books</i>
        </NavLink>
        <NavLink to="/admin/orders"
          className={({isActive}) => 
            isActive ? "link-active" : "link-inactive"
          }
        ><i class="fa-solid fa-truck fa-sm"> Orders</i>
        </NavLink>
        <NavLink to="/admin/users"
          className={({isActive}) => 
            isActive ? "link-active" : "link-inactive"
          }
        ><i class="fa-solid fa-users fa-sm"> Users</i>
        </NavLink>
      </SideNav>
      <Content>
          <Outlet/>
      </Content>
    </StyledDashboard>
  )
}


//Styled Components
const StyledDashboard = styled.div`
  display: flex;
  height: 90vh;
`;
const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 200px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  h3 {
    margin: 5rem 0 3rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 18px;
  }
  a {
    text-decoration: none;
    margin-bottom: 5rem;
    font-size: 20px;
    display: flex;
    align-items: center;
    font-weight: 700;
    svg {
      margin-right: 0.5rem;
      font-size: 18px;
    }
  }
`;
const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;


export default Dashboard;