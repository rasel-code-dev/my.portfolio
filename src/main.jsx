import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import AppWrapper from "./store/AppWrapper";
import "./styles/utilities_classes.scss"
import "src/asserts/@fontawesome-pro-5.12.0-web/css/all.css";

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper initialData={{}} >
      <App />
    </AppWrapper>
  </React.StrictMode>,
  document.getElementById('root')
)
