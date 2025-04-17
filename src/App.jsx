import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import Stores from './Pages/Stores/Stores.jsx'
import About from './Pages/About/About.jsx'
import Contact from './Pages/Contact/Contact.jsx'
import MyProfile from './Pages/MyProfile/MyProfile.jsx'
import MyRepairs from './Pages/MyRepairs/MyRepairs.jsx'
import Service from './Pages/Service/Service.jsx'
import Footer from './components/Footer/Footer.jsx'
import Appoinment from './Pages/Appoinment/Appoinment.jsx'
import ReportIssue from './Pages/reportIssue/reportIssue.jsx'
import Carts from './Pages/Cart/Carts.jsx'
import { ToastContainer, toast } from 'react-toastify';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <ToastContainer></ToastContainer>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/stores' element={<Stores></Stores>}></Route>
          <Route path='/about' element={<About></About>}></Route>
          <Route path='/contact' element={<Contact></Contact>}></Route>
          <Route path='/my-profile' element={<MyProfile></MyProfile>}></Route>
          <Route path='/my-repairs' element={<MyRepairs></MyRepairs>}></Route>
          <Route path='/service' element={<Service></Service>}></Route>
          <Route path='/stores/:speciality' element={<Stores></Stores>}></Route>
          <Route path='/appointment/:shopid' element={<Appoinment></Appoinment>}></Route>
          <Route path='/issue'  element={<ReportIssue> </ReportIssue>} />
          <Route path='/cartItems'  element={<Carts> </Carts>} />

        </Routes>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
