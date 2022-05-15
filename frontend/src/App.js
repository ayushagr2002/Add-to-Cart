import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Login from "./components/common/Login"
import VendorDashboard from "./components/common/VendorDashboard";
import BuyerDashboard from "./components/common/BuyerDashboard";
import Logout from "./components/common/Logout";
import VendorStatistics from "./components/common/VendorStatistics";
import VendorNavBar from "./components/templates/VendorNavBar";
import VendorOrder from "./components/common/VendorOrder";
import VendorProfile from "./components/common/VendorProfile";
import BuyerFavorites from "./components/common/BuyerFavorites";
import BuyerOrder from "./components/common/BuyerOrder";
import BuyerProfile from "./components/common/BuyerProfile";
import BuyerNavBar from "./components/templates/BuyerNavBar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const VendorLayout = () => {
  return (
    <div>
      <VendorNavBar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const BuyerLayout = () => {
  return (
    <div>
      <BuyerNavBar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />

        <Route path="/VendorDashboard" element={<VendorLayout />}>
          <Route path="/VendorDashboard" element={<VendorDashboard />} />
        </Route>

        <Route path="vendorProfile" element={<VendorLayout />}>
        <Route path="/vendorProfile" element={<VendorProfile />} />
        </Route>
       

        <Route path="/VendorOrder" element={<VendorLayout />}>
          <Route path="/VendorOrder" element={<VendorOrder />} />
        </Route>
       
        <Route path="/vendorStatistics" element={<VendorLayout />}>
          <Route path="/vendorStatistics" element={<VendorStatistics />}></Route>
        </Route>

        <Route path="/BuyerDashboard" element={<BuyerLayout />}>
          <Route path="/BuyerDashboard" element={<BuyerDashboard />}></Route>
        </Route>
        <Route path="/logout" element={<Logout />}></Route>

        <Route path="/BuyerFavorites" element={<BuyerLayout />}>
        <Route path="/BuyerFavorites" element={<BuyerFavorites />}>
        </Route>

  
        </Route>
        <Route path="/BuyerOrder" element={<BuyerLayout />}>
        <Route path="/BuyerOrder" element={<BuyerOrder />} />
        </Route>
        
        <Route path="/BuyerProfile" element={<BuyerLayout />}> 
        <Route path="/BuyerProfile" element={<BuyerProfile />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
