import { getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import Layout from '../lib/layout';
import Button from '../lib/button';

function SignIn({ providers }) {
  return (
    <Layout>
      { Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button
            type="button"
            onClickAction={() => signIn(provider.id)}
            style={{ width: '95%' }}
          >
            sign in with
            {' '}
            {provider.name}
          </Button>
        </div>
      ))}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return { redirect: { destination: '/dashboard' } };
  }
  const providers = await getProviders();
  return {
    props: {
      providers: providers || [],
    },
  };
}
export default SignIn;
