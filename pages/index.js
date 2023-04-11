import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Layout from '../lib/layout';
import Button from '../lib/button';

function Home() {
  return (
    <>
      <Head>
        <title>reinforce!</title>
      </Head>
      <Layout>
        <h4 style={{ fontSize: '1.4em' }}>hello, hello, hello :)</h4>
        <h1>welcome to reinforce!</h1>
        <h3>to talk to jen, sign up here.</h3>
        <Button onClickAction={() => signIn()}>sign up!</Button>
      </Layout>
    </>
  );
}

export default Home;
