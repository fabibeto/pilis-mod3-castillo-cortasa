// import ReactDOM from "react-dom";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Contacto from "./components/Contacto";
import Home from "./components/Home";



function App() {
  return (

            <BrowserRouter>
               <Routes>
                  <Route path="/Home" element={<Home/>} />  
                  <Route path="/Contacto" element={<Contacto/>} />
               </Routes>
             </BrowserRouter>
        
        
          
  );
}

export default App;

