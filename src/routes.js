import Login from './form/authentification/Login';
import Register from './form/authentification/Register';
import ContactForm from './form/contact/contactForm';
import ProductDetails from './views/product/ProductDetails';
const { default: HomePage } = require('./views/HomePage');

const Routes = [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/contact',
    component: ContactForm
  },
  {
    path: '/productDetails/:id',
    component: ProductDetails
  },
  {
    protected: true,
    path: '/product/add',
    component: Login
  }
];

export default Routes;
