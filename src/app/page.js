'use client'
import App from "../components/App";
import store from "../redux/store/store";
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Home() {
  return (
   <Provider store={store}>
   <App/>
   </Provider>
  );
}
