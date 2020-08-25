import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import { NavLink } from 'react-router-dom';

// Lazily load routes and code split with webpack
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
);

const CounterPage = (props: Record<string, string>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

// Lazily load routes and code split with webpack
const LazyDataSyncPage = React.lazy(() =>
  import(/* webpackChunkName: "DataSyncPage" */ './containers/SyncDataPage')
);

const DataSyncPage = (props: Record<string, string>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyDataSyncPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <div id="wrapper">
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid">
            <NavLink exact to={routes.HOME} className="navbar-brand">
              Peloton to Garmin
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <NavLink
                  exact
                  to={routes.HOME}
                  className="nav-link"
                  activeClassName="active"
                >
                  Home
                </NavLink>
                <NavLink
                  to={routes.COUNTER}
                  className="nav-link"
                  activeClassName="active"
                >
                  Manage Credentials
                </NavLink>
                <NavLink
                  to={routes.SYNC}
                  className="nav-link"
                  activeClassName="active"
                >
                  Sync Data
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
        {/*Side bar (for large screens*/}
        {/*<div className="bg-dark border-right" id="sidebar-wrapper">*/}
        {/*  <h3 className="sidebar-heading text-white">Peloton to Garmin</h3>*/}
        {/*  <div className="list-group list-group-flush">*/}
        {/*    <NavLink*/}
        {/*      exact*/}
        {/*      to={routes.HOME}*/}
        {/*      className="list-group-item list-group-item-action bg-dark nav-link"*/}
        {/*      activeClassName="active"*/}
        {/*    >*/}
        {/*      Home*/}
        {/*    </NavLink>*/}
        {/*    <NavLink*/}
        {/*      to={routes.COUNTER}*/}
        {/*      className="list-group-item list-group-item-action bg-dark nav-link"*/}
        {/*      activeClassName="active"*/}
        {/*    >*/}
        {/*      Manage Credentials*/}
        {/*    </NavLink>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <div id="page-content-wrapper">
          <Switch>
            <Route path={routes.COUNTER} component={CounterPage} />
            <Route path={routes.SYNC} component={DataSyncPage} />
            <Route exact path={routes.HOME} component={HomePage} />
          </Switch>
        </div>
      </div>
    </App>
  );
}
