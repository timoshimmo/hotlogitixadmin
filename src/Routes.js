import React, { useLayoutEffect } from 'react';
import { Switch, Redirect, useLocation, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import {
  Main as MainLayout,
  Minimal as MinimalLayout
} from './layouts';

import {
    SignUp as SignUpPage,
    SignIn as SignInPage,
    Users as UsersPage,
    Withdrawals as WithdrawalsPage,
    Transactions as TransactionsPage,
    ReportedCases as ReportedCasesPage
} from './views';

 const Routes = () => {

   return (
     <Switch>
           <Route exact path="/">
             <Redirect to="/home" />
           </Route>
            <RouteWithLayout
               component={SignUpPage}
               exact
               layout={MinimalLayout}
               path="/signup"
             />

             <RouteWithLayout
               component={SignInPage}
               exact
               layout={MinimalLayout}
               path="/signin"
             />
             <RouteWithLayout
                component={UsersPage}
                exact
                layout={MainLayout}
                path="/users"
              />

              <RouteWithLayout
                 component={TransactionsPage}
                 exact
                 layout={MainLayout}
                 path="/transactions"
               />

              <RouteWithLayout
                 component={WithdrawalsPage}
                 exact
                 layout={MainLayout}
                 path="/withdrawals"
               />

               <RouteWithLayout
                  component={ReportedCasesPage}
                  exact
                  layout={MainLayout}
                  path="/cases"
                />
        <Redirect to="/signup" />
    </Switch>
  )


 }

export default Routes;
