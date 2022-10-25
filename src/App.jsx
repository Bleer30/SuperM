import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './Products';
import ProductDetails from './ProductDetails';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Cart from './Cart';

function App() {
  const [cart, setCart] = useState([]);

  function handleProductDelete(id) {
    const updatedCart = cart.filter(product => product.id !== id);
    setCart(updatedCart);
  }

  function handleProductAdd(newProduct) {
    // check if item exists
    const existingProduct = cart.find(product => product.id === newProduct.id);
    if (existingProduct) {
      // increase quantity
      const updatedCart = cart.map(product => {
        if (product.id === newProduct.id) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
      setCart(updatedCart);
    } else {
      // product is new to the cart
      setCart([
        ...cart,
        {
          ...newProduct,
          quantity: 1,
        },
      ]);
    }
  }

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navbar cart={cart} />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/products"
              element={
                <Products
                  cart={cart}
                  onProductAdd={handleProductAdd}
                  onProductDelete={handleProductDelete}
                />
              }
            />
            <Route
              path="/products/:id"
              element={<ProductDetails onProductAdd={handleProductAdd} />}
            />
            <Route path="/cart" element={<Cart cart={cart} />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
