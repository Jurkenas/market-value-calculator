import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ReduxProvider from './commons/redux/ReduxProvider';
import Loader from './components/shared/Loader/Loader';
import Layout from './components/shared/Layout/Layout';
import { MenuItem } from './components/shared/Menu/Menu';
import store from './commons/redux/store';
import HomePage from './components/Pages/HomePage/HomePage';
import NotFoundPage from './components/Pages/NotFoundPage/NotFoundPage';

export const HOME_PAGE_PATH = '/';
export const CLIENT_DISCOUNT_PAGE_PATH = '/client';
export const CALCULATED_VALUE_PAGE_PATH = '/paskaiciuotaverte';
export const CALCULATED_VALUE_PAGE__DETAILS_TABLE_PATH = '/detaliInfo';

const ClientDiscountPage = React.lazy(
  () => import('./components/Pages/ClientDiscountPage/ClientDiscountPage')
);
const CalculatedValuePage = React.lazy(
  () => import('./components/Pages/CalculatedValuePage/CalculatedValuePage')
);
const CalculatedValuePageDetailsTable = React.lazy(
  () => import('./components/Pages/CalculatedValuePageDetailsTable/CalculatedValuePageDetailsTable')
);

export const routes = (
  <Routes>
    <Route path={HOME_PAGE_PATH} element={<HomePage />} />
    <Route path={CLIENT_DISCOUNT_PAGE_PATH} element={<ClientDiscountPage />} />
    <Route path={CALCULATED_VALUE_PAGE_PATH} element={<CalculatedValuePage />} />
    <Route
      path={CALCULATED_VALUE_PAGE__DETAILS_TABLE_PATH}
      element={<CalculatedValuePageDetailsTable />}
    />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export const menuItems: MenuItem[] = [
  { label: 'Client discount', path: CLIENT_DISCOUNT_PAGE_PATH },
];

const history = createBrowserHistory();

const routing = (
  <BrowserRouter>
    <ReduxProvider store={store}>
      <Layout menuItems={menuItems} history={history}>
        <React.Suspense fallback={<Loader isLoading />}>{routes}</React.Suspense>
      </Layout>
    </ReduxProvider>
  </BrowserRouter>
);

export default routing;
