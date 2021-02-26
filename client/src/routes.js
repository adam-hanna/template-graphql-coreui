import React from 'react';
const Login = React.lazy(() => import('./views/pages/login/Login'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'login', component: Login },
];

export default routes;
