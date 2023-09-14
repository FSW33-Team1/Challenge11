"use client";

import LoginView from './view';
import { Provider } from 'react-redux';
import store from '../../store';

export default function Login() {
  return (
    <Provider store={store}>
      <main>
        <LoginView />
      </main>
    </Provider>
  );
};

