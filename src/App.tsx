import './assets/styles/App.css';
import { Outlet } from 'react-router-dom';
import PageHeader from './components/header/PageHeader';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App mx-auto flex flex-col">
      <ToastContainer></ToastContainer>
      <header className="z-10 bg-white drop-shadow outline-2 h-16 fixed top-0 w-full mx-auto">
        <PageHeader></PageHeader>
      </header>

      <div className="mt-24 w-[1000px] mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
