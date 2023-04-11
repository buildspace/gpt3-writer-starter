import { useSession, signOut } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import Button from '../lib/button';
import Header from '../lib/header';
import { authOptions } from './api/auth/[...nextauth]';

function Dashboard() {
  const { data: session } = useSession();
  return (
    <>
      <Header>{`${session.user.name.toLowerCase()}'s dashboard`}</Header>
      {/* <Category> */}
      <Link href="/prompt">click here to go to a text convo w jen</Link>
      {/* <Description></Description> */}
      {/* </Category> */}
      <Link href="/bookmarks">click here to see ur fav convos w jen :))</Link>
      <Link href="/notes">click here to go to ur notes</Link>
      <Link href="/video-call">click here to go to a video call w jen</Link>
      <Link href="/voice-call">click here to go to an voice call w jen</Link>
      <button onClick={() => signOut()}>sign out</button>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return { redirect: { destination: '/' } };
  }
  return { props: { session } };
}

export default Dashboard;
