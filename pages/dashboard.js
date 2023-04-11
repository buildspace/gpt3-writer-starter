import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import Link from 'next/link';
import Button from '../lib/button';
import Header from '../lib/header';
import Category from '../lib/category';
import CategoryGrid from '../lib/category-grid';
import { authOptions } from './api/auth/[...nextauth]';
import Footer from '../lib/footer';

function Dashboard() {
  const { data: session } = useSession();
  return (
    <div>
     <Header>ur dashboard</Header>
      <CategoryGrid>
        <Category>
          <h3>prompt</h3>
          <p>go to a text convo w jen</p>
          <Button><Link href="/prompt">let&apos;s go!</Link></Button>
        </Category>
        <Category>
          <h3>bookmarks</h3>
          <p>see ur fav convos w jen :)</p>
          <Button><Link href="/bookmarks">let&apos;s go!</Link></Button>
        </Category>
        <Category>
          <h3>notes</h3>
          <p>see ur highlights & notes</p>
          <Button><Link href="/prompt">let&apos;s go!</Link></Button>
        </Category>
        <Category>
          <h3>video call</h3>
          <p>go on a video call w jen and her friends!</p>
          <Button><Link href="/prompt">let&apos;s go!</Link></Button>
        </Category>
        <Category>
          <h3>audio call</h3>
          <p>go on an audio call w jen and her friends!</p>
          <Button><Link href="/prompt">let&apos;s go!</Link></Button>
        </Category>
      </CategoryGrid>
      <br />
      <br />
      <br />
      <Footer />
    </div>
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
