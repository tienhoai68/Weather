import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import { LoadingProvider } from './components/Loading/Loading';



function App() {
  return (
    <LoadingProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
