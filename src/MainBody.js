import './App.css';
import logo from './logo.svg';

function MainBody() {
  return (
    <div className='flex-1 p-3 overflow-hidden App-body bg-white-300'>
      <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
    </p>
    <a
      className="App-link bg-slate-700"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
    </div>
  );
}

export default MainBody;
