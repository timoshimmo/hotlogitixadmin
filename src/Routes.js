import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import {
  Main as MainLayout,
  Minimal as MinimalLayout
} from './layouts';

import {
    SignUp as SignUpPage,
    SignIn as SignInPage,
    Users as UsersPage,
    Riders as RidersPage,
    Withdrawals as WithdrawalsPage,
    Orders as OrdersPage,
    Trips as TripsPage,
    History as HistoryPage,
    ReportedCases as ReportedCasesPage,
    Admins as AdminsPage,
    Dashboard as DashboardPage,
    Assign as AssignPage,
    TripDetails as TripDetailsPage,
    HistoryDetails as HistoryDetailsPage
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
                 component={RidersPage}
                 exact
                 layout={MainLayout}
                 path="/riders"
               />

              <RouteWithLayout
                 component={OrdersPage}
                 exact
                 layout={MainLayout}
                 path="/orders"
               />

             <RouteWithLayout
                component={TripsPage}
                exact
                layout={MainLayout}
                path="/trips"
              />

              <RouteWithLayout
                 component={HistoryPage}
                 exact
                 layout={MainLayout}
                 path="/history"
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

            <RouteWithLayout
               component={AdminsPage}
               exact
               layout={MainLayout}
               path="/admins"
             />
           <RouteWithLayout
              component={DashboardPage}
              exact
              layout={MainLayout}
              path="/dashboard"
            />

          <RouteWithLayout
             component={AssignPage}
             exact
             layout={MainLayout}
             path="/assign"
           />

         <RouteWithLayout
            component={TripDetailsPage}
            exact
            layout={MainLayout}
            path="/trip/details"
          />

         <RouteWithLayout
            component={HistoryDetailsPage}
            exact
            layout={MainLayout}
            path="/history/details"
          />

        <Redirect to="/signin" />
    </Switch>
  )


 }

export default Routes;
