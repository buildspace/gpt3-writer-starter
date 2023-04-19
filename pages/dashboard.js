import Link from 'next/link';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { authOptions } from './api/auth/[...nextauth]';
import Button from '../lib/button/button';
import Header from '../lib/header/header';
import Category from '../lib/category/category';
import CategoryGrid from '../lib/category-grid/category-grid';
import Footer from '../lib/footer/footer';
// import Title from '../lib/title/title';
// import Root from '../lib/root/root';

function Dashboard() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>dashboard :)</title>
      </Head>
      <div style={{ maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
        {/* <Title title="ur dashboard" subtitle="" /> */}
        <Header username={`${session.user.name.toLowerCase()}`} page="dashboard" />
        <CategoryGrid>
          <Category>
            <h3>prompt</h3>
            <p>go to a text convo w jen throughout the day</p>
            <Link href="/prompt"><Button onClickAction={() => {}}>let&apos;s go</Button></Link>
          </Category>
          <Category>
            <h3>video call</h3>
            <p>go on a video call w jen and her friends!</p>
            <Link href="/video-call"><Button onClickAction={() => {}}>let&apos;s go</Button></Link>
          </Category>
          <Category>
            <h3>scoreboard</h3>
            <p>see how well jen&apos;s advice works out for ya</p>
            <Link href="/scoreboard"><Button onClickAction={() => {}}>let&apos;s go</Button></Link>
          </Category>
          <Category>
            <h3>bookmarks</h3>
            <p>see ur fav convos w jen :)</p>
            <Link href="/bookmarks"><Button onClickAction={() => {}}>let&apos;s go</Button></Link>
          </Category>
          <Category>
            <h3>notes</h3>
            <p>see ur highlights & notes</p>
            <Link href="/notes"><Button onClickAction={() => {}}>let&apos;s go</Button></Link>
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
