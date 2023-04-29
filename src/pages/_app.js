import store from '@/redux/store';
import '@/styles/globals.css'
import { Provider} from 'react-redux';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {

  return (
  <Provider store={store}>
  <Component {...pageProps} />
  <ToastContainer
    position="top-center"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
  </Provider>
  )
}
