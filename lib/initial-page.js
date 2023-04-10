import { signIn } from 'next-auth/react';
import styled from 'styled-components';

function InitialPage() {
  return (
    <Container>
      <h1>hello, hello!</h1>
      <h2>welcome to reinforce :)</h2>
      <p>to talk to jen, sign up here.</p>
      <button type="button" onClick={signIn}>sign up!</button>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    background-color: #FBE7C6;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    max-height: 400px;
    min-width: 100px;
    max-width: 400px;
    text-align: center;
`;

export default InitialPage;
