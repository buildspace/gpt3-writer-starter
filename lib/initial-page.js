import { signIn } from 'next-auth/react';
import styled from 'styled-components';

function InitialPage() {
  return (
    <BackgroundContainer>
      <Container>
        <h4 style={{ fontSize: '1.1em' }}>hello, hello, hello :)</h4>
        <h1>welcome to reinforce!</h1>
        <h3>to talk to jen, sign up here.</h3>
        <Button type="button" onClick={signIn}>sign up!</Button>
      </Container>
    </BackgroundContainer>
  );
}

const BackgroundContainer = styled.div`
    background-color: #FBE7C6;
    padding: 10px;
    max-width: 600px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    border: 1px solid #FBE7C6;
`;

const Container = styled.div`
    background-color: #B4F8C8;
    min-height: 400px;
    text-align: center;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    padding: 3vw;
`;

const Button = styled.button`
    background-color: #FBE7C6;
    border-radius: 5px;
    border: 3px solid black;
    padding: 20px;
    margin: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin-top: 20px;
    &:hover {
        background-color: #FFAEBC;
    }
`;

export default InitialPage;
