import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Datatable from './Pages/Contacts/dataTable/ContactDataTable';
import { GlobalRoute } from './routes/commonRoutes';

function App() {  
  return (
    <div>
      <BrowserRouter>
        <GlobalRoute />
      </BrowserRouter>
    </div>
  );
}

export default App;
