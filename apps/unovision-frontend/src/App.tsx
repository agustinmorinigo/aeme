import { useState } from 'react';
import viteLogo from '/vite.svg';
import reactLogo from './assets/react.svg';
import './App.css';
import { Card } from '@repo/ui/card';
import TestFake from '@repo/ui/test-fake';

function App() {
  const [count, setCount] = useState<number>(1233322);

  return (
    <>
      <div>
        <a href='https://vite.dev' target='_blank' rel='noopener'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank' rel='noopener'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card text-nuevo-8 bg-nuevo-3'>
        <button type='button' onClick={() => setCount((count) => count + 1)}>
          count is {count} TESTING COMMIT
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <TestFake />
      <Card title='Card Title' href='feqji'>
        This is a card component from the UI library.
      </Card>
      <p className='read-the-docs text-nuevo-8 bg-nuevo-3'>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
