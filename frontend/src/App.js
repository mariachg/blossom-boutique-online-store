
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Shop from './Pages/Shop';
import LoginSignup from './Pages/LoginSignup';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import bannerClothes from './Components/Assets/heroPinkDress.jpg'; 
import bannerFragrance from './Components/Assets/p8.jpg'; 
import bannerSwimwear from './Components/Assets/heroSwimsuit.jpg'; 
import ScrollToTop from './Pages/ScrollToTop';



function App() {
  return (
    <div >
      <BrowserRouter>
      <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/clothes' element={<ShopCategory banner={bannerClothes} category="clothes" />} />
          <Route path='/swimwear' element={<ShopCategory banner={bannerSwimwear} category="swimwear" />} />
          <Route path='/fragrances' element={<ShopCategory banner={bannerFragrance} category="fragrances" />} />
          <Route path="/product/:productId" element={<Product />}/>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />

        </Routes>


      </BrowserRouter>
    </div>
  );
}

export default App;
