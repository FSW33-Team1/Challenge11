"use client";

import RegView from './view';
import { Provider } from 'react-redux';
import store from '../../store';

export default function Login() {
  return (
    <Provider store={store}>
      <main>
        <RegView />
      </main>
    </Provider>
  );
};

