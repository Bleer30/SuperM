import { useState, useEffect } from 'react';
import { NavLink, useParams, useMatch } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useFetch from './useFetch';
import ProductDetailInfo from './ProductDetailInfo';
import ProductDetailNutrition from './ProductDetailNutrition';
import ProductDetailStorage from './ProductDetailStorage';

const ProductDetails = props => {
  const [product, setProduct] = useState({});
  const { get } = useFetch('https://react-tutorial-demo.firebaseio.com/');
  const params = useParams();
  const match = useMatch();

  useEffect(() => {
    get(`productinfo/id${params.id}.json`)
      .then(data => {
        setProduct(data);
      })
      .catch(error => console.log('Could not load product details', error));
  }, []);

  return (
    <div className="product-details-layout">
      <div>
        <h2>{product.name}</h2>
        <img
          src={product.image}
          width="125"
          height="125"
          className="product-details-image"
          alt={product.name}
        />
      </div>
      <div>
        <div className="tabs">
          <ul>
            <li>
              <NavLink exact activeClassName="tab-active" to={match.url}>
                Details
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="tab-active"
                to={match.url + '/nutrition'}
              >
                Nutrition
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                activeClassName="tab-active"
                to={match.url + '/storage'}
              >
                Storage
              </NavLink>
            </li>
          </ul>
        </div>
        <Router>
          <Routes>
            <Route
              to={match.path}
              element={
                <ProductDetailInfo
                  product={product}
                  onProductAdd={props.onProductAdd}
                />
              }
            />
            <Route
              to={match.path + '/nutrition'}
              element={<ProductDetailNutrition nutrition={product.nutrition} />}
            />
            <Route
              to={match.path + '/storage'}
              element={<ProductDetailStorage storage={product.storage} />}
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default ProductDetails;
