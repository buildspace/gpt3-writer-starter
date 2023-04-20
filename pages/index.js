import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Layout from '../lib/layout/layout';
import Button from '../lib/button/button';
import Link from 'next/link';

function Home() {
  return (
    <>
      {/* <Head>
        <title>reinforce!</title>
      </Head>
      <Layout>
        <h4 style={{ fontSize: '1.4em' }}>hello, hello, hello :)</h4>
        <h1>welcome to reinforce!</h1>
        <h3>to talk to jen, sign in here.</h3>
        <Button onClickAction={() => signIn()}>sign in!</Button>
      </Layout> */}
      <Link href="/audio-call">go to audio-call</Link>
    </>
  );
}

export default Home;
