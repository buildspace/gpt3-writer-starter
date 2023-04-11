import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import Button from '../lib/button/button';
import Header from '../lib/header/header';
import Category from '../lib/category/category';
import CategoryGrid from '../lib/category-grid/category-grid';
import Footer from '../lib/footer/footer';

function Dashboard() {
  const { data: session } = useSession();
  return (
    <>
      <div style={{ maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Header username={`${session.user.name.toLowerCase()}`} page="dashboard" />
        <CategoryGrid>
          <Category>
            <h3>prompt</h3>
            <p>go to a text convo w jen</p>
            <Button><Link href="/prompt">let&apos;s go!</Link></Button>
          </Category>
          <Category>
            <h3>video call</h3>
            <p>go on a video call w jen and her friends!</p>
            <Button><Link href="/video-call">let&apos;s go!</Link></Button>
          </Category>
          <Category>
            <h3>scoreboard</h3>
            <p>see how well jen&apos;s advice works out for ya</p>
            <Button><Link href="/scoreboard">let&apos;s go!</Link></Button>
          </Category>
          <Category>
            <h3>bookmarks</h3>
            <p>see ur fav convos w jen :)</p>
            <Button><Link href="/bookmarks">let&apos;s go!</Link></Button>
          </Category>
          <Category>
            <h3>notes</h3>
            <p>see ur highlights & notes</p>
            <Button><Link href="/notes">let&apos;s go!</Link></Button>
          </Category>
        </CategoryGrid>
      </div>
      <br />
      <br />
      <br />
      <Footer />
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
