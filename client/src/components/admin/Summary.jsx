import React from 'react';
import styled from 'styled-components';
import logo from './../../images/softWallpaper.png'


const Summary = () => {
    return(
        <Container>
            <div> <Image src={logo} alt="adminIcon" /> </div>
        </Container>
    )
}


//Styled Components
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85vh;
`;
const Image = styled.img`
    width: 55rem;
    height: 30rem;
`;


export default Summary;