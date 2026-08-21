import{BrowserRouter,Routes,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Users from "./components/Users"
import Jobs from "./components/Jobs"

function App() {
    return(
        <BrowserRouter>

          <Navbar/>

          <Routes>
            <Route path="/"element={<Home/>}/>
            <Route path="/users"element={<Users/>}/>
            <Route path="/jobs" element={<Jobs/>}/>
          </Routes>

        <Footer/>

        </BrowserRouter>
    )
}

export default App 