import View from './view'
import { Provider } from 'react-redux';
import store from '../../../store';

export default function Navbar() {
    return (
      <Provider store={store}>
        <main>
          <View />
        </main>
      </Provider>
    );
  };
  