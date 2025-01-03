import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { PageLoader } from "./pages/PageLoader";
import { ScrollReset } from "./components/ScrollReset.js";
import { Cart } from "./pages/Cart.js";
import { ProtectedRoute } from "./components/ProtectedRoute.js";
import Topbar from "./components/Admin/Topbar.js";
import Sidebar from "./components/Admin/Sidebar.js";
import { AdminLayout } from "./components/Admin/AdminLayout.js";
import { AdminProductDashboard } from "./pages/Admin/AdminProductDashboard.js";
import { AdminAddProductForm } from "./pages/Admin/AdminAddProductForm.js";
import { ReviewDashboard } from "./pages/Admin/ReviewDashboard.js";
import { UserDashboard } from "./pages/Admin/UserDashboard.js";
import { OrderDashboard } from "./pages/Admin/OrderDashboard.js";

const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About.js"));
const Contact = lazy(() => import("./pages/Contact.js"));
const Dashboard = lazy(() => import("./pages/Dashboard.js"));
const ViewProduct = lazy(() => import("./pages/ViewProduct.js"));
const Profile = lazy(() => import("./pages/Profile.js"));
const Order = lazy(() => import("./pages/Order.js"));
const AllOrders = lazy(() => import("./pages/AllOrders.js"));
const WishList = lazy(() => import("./pages/WishList.js"));
const AdminDashboard = lazy(() => import("./pages/Admin/Dashboard.js"));

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<ScrollReset />}>
            <Route path="/register" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/explore-products" element={<Dashboard />} />
              <Route path="/view-product/:id" element={<ViewProduct />} />
              <Route path="/payment" element={<Order />} />
              <Route path="/all-orders" element={<AllOrders />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="/admin/" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProductDashboard />} />
              <Route path="add-product" element={<AdminAddProductForm/>}/>
              <Route path="orders" element={<OrderDashboard/>}/>
              <Route path="users" element={<UserDashboard/>}/>
              <Route path="reviews" element={<ReviewDashboard/>}/>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
