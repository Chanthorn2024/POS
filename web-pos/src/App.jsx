
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./page/home/HomePage"
import RegisterPage from "./page/auth/RegisterPage"
import LoginPage from "./page/auth/LoginPage"
// import "./App.css"
import MainLayout from "./components/Layout/MainLayout"
import MainLayoutAuth from "./components/Layout/MainLayoutAuth"
import CategoryPage from "./page/category/CategoryPage"
import EmployeePage from "./page/employee/EmployeePage"
import CustomerPage from "./page/customer/CustomerPage"

function App() {
  return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<HomePage/>} />
                    <Route path='/employee' element={<EmployeePage/>} />
                    <Route path='/customer' element={<CustomerPage/>} />
                    <Route path='/product/category' element={<CategoryPage/>} />
                    <Route path='*' element={<h1>404!! Route Not Found !!!!</h1>} />
                </Route>
                <Route element={<MainLayoutAuth />}>
                    <Route path='/' element={<HomePage/>} />
                    <Route path='/register' element={<RegisterPage/>} />
                    <Route path='/login' element={<LoginPage/>} />
                    <Route path='*' element={<h1>404!! Route Not Found !!!!</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
  );
}

export default App
