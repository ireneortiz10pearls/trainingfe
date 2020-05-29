import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/user/forms/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Sidebar from './components/layout/sidebar/Sidebar';
import Courses from './components/course/table/Courses';
import CourseAdd from './components/course/forms/CourseAdd';
import CourseEdit from './components/course/forms/CourseEdit';
import Categories from './components/category/table/Categories';
import CategoryAdd from './components/category/forms/CategoryAdd';
import CategoryEdit from './components/category/forms/CategoryEdit';
import Users from './components/user/table/Users';
import UserEdit from './components/user/forms/UserEdit';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className='wrapper'>
            <Sidebar />
            <div className='main-panel'>
              <Route exact path='/' component={Landing} />
              <section className='container'>
                <Alert />
                <Switch>
                  <PrivateRoute exact path='/register' component={Register} />
                  <PrivateRoute exact path='/users' component={Users} />
                  <Route exact path='/login' component={Login} />
                  <PrivateRoute exact path='/dashboard' component={Dashboard} />
                  <PrivateRoute exact path='/courses' component={Courses} />
                  <PrivateRoute
                    exact
                    path='/categories'
                    component={Categories}
                  />
                  <PrivateRoute
                    exact
                    path='/categoryadd'
                    component={CategoryAdd}
                  />
                  <PrivateRoute
                    exact
                    path='/categoryedit/:id'
                    component={CategoryEdit}
                  />
                  <PrivateRoute exact path='/courses' component={Courses} />
                  <PrivateRoute exact path='/courseadd' component={CourseAdd} />
                  <PrivateRoute
                    exact
                    path='/courseedit/:id'
                    component={CourseEdit}
                  />
                  <PrivateRoute
                    exact
                    path='/useredit/:id'
                    component={UserEdit}
                  />
                </Switch>
              </section>
            </div>
          </div>
        </Fragment>
      </Router>{' '}
    </Provider>
  );
};

export default App;
