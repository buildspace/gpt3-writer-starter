import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>GPT-3</h1>
            <h1>Writer</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write your first song in the style of your favorite artist.</h2>
          </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
