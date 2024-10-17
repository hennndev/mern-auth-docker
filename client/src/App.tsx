import { Routes, Route, Outlet } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import MainNavbar from './components/MainNavbar'

const App = () => {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Route>
            <Route element={<AdminLayout/>}>
``
            </Route>
        </Routes>
    )
}

const MainLayout = () => {
    return (
        <main className='p-10 container'>
            <MainNavbar/>
            <Outlet/>
        </main>
    )
}

const AdminLayout = () => {
    return(
        <>
            <Outlet>

            </Outlet>
        </>
    )
}

export default App