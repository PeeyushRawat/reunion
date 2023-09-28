import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/layouts/Header'
import Footer from './components/layouts/Footer'

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';

import { loadUser } from './actions/userActions';
import store from './store'

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Routes>
              <Route path = "/" Component={Home} exact />
              <Route path = "/search/:keyword" Component={Home} />
              <Route path = "/property/:id" Component={ProductDetails} exact />

              <Route path = "/login" Component={Login} />
              <Route path = "/register" Component={Register} />
              <Route path = "/me" Component={Profile} exact />

          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
