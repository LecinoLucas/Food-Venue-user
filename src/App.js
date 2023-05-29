import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import CustomRoutes from './components/CustomRoutes';
import { CartProvider } from "./context/CardContext";
import { LoadingProvider } from './context/LoadingContexts';
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <LoadingProvider>
      <UserProvider>
        <CartProvider>
          <Router>
            <div className='App'>
              <CustomRoutes />
            </div>
          </Router>
        </CartProvider>
      </UserProvider>
    </LoadingProvider>
  );
}

export default App;
