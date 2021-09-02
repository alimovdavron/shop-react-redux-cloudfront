import React, {useEffect, useState} from 'react';
import 'components/App/App.css';
import PageProducts from "components/pages/PageProducts/PageProducts";
import MainLayout from "components/MainLayout/MainLayout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import PageProductForm from "components/pages/PageProductForm/PageProductForm";
import PageCart from "components/pages/PageCart/PageCart";
import PageOrders from "components/pages/PageOrders/PageOrders";
import PageOrder from "components/pages/PageOrder/PageOrder";
import PageProductImport from "components/pages/admin/PageProductImport/PageProductImport";

import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar"
import axios from 'axios';

function App() {

  useEffect(() => {
      localStorage.setItem('authorization_token', 'YWxpbW92ZGF2cm9uOlRFU1RfUEFTU1dPUkQ=');
  }, [])

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  axios.interceptors.response.use(
      response => {
        return response;
      },
      function(error) {
        if (error?.response?.status === 400) {
          alert(error.response.data?.data);
        }

        if([401, 403].includes(error?.response?.status)){
            setErrorMessage(error.response?.data?.message);
            setOpen(true);
        }

        return Promise.reject(error?.response ?? error);
      }
  );

  const handleClose = () => setOpen(false);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainLayout>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
                {errorMessage}
              </Alert>
            </Snackbar>
            <Route exact path="/">
              <PageProducts/>
            </Route>
            <Route exact path={["/admin/product-form/:id", '/admin/product-form']}>
              <PageProductForm/>
            </Route>
            <Route exact path="/cart">
              <PageCart />
            </Route>
            <Route exact path="/admin/orders">
              <PageOrders />
            </Route>
            <Route exact path="/admin/order/:id">
              <PageOrder />
            </Route>
            <Route exact path="/admin/products">
              <PageProductImport />
            </Route>
          </MainLayout>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
