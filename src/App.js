import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import CustomRoutes from './components/CustomRoutes';
import { CartProvider } from "./context/CardContext";
import { LoadingProvider } from './context/LoadingContexts';
import { PedidoProvider } from "./context/PedidoContext";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <LoadingProvider>
      <UserProvider>
        <PedidoProvider>
          <CartProvider>
            <Router>
              <div className='App'>
                <CustomRoutes />
              </div>
            </Router>
          </CartProvider>
        </PedidoProvider>
      </UserProvider>
    </LoadingProvider>
  );
}

export default App;
