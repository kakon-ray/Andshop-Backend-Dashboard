/* import logo from './logo.svg'; */
import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './page/AddProduct/AddProduct';
import Dashboard from './page/Dashboard';
import DashboardHome from './page/DashboardHome/DashboardHome';
import ManageProduct from './page/ManageProduct/ManageProduct';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
        <Route index element={<DashboardHome />} />
          <Route path='/manage-product' element={< ManageProduct />} />
          <Route path='/add-product' element={< AddProduct />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
