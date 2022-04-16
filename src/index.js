import React from 'react';
import ReactDom from 'react-dom/client';
/* import App from './App'; */
import './index.css';

function App(props) {
  return (
    <h1>{props.saludo}, from {props.name}</h1>
  )
}

function withSaludoHoc(WrappedComponent) {
  return function WrappedComponentWithSaludo (saludo) {
    return function ComponenteDeVerdad(props) {
      return (
        <>
          <WrappedComponent {...props} saludo={saludo}/>
          <h2>Dentro del HOC abajo del WrappedComponent = App</h2>
        </>
      )
    }
  }
}

const AppWithSaludoHoc = withSaludoHoc(App)("El prop Saludo");

const rootElement = document.getElementById('root');
const root = ReactDom.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppWithSaludoHoc name="Props"/>
    {/* <App saludo="Hola" name="Props" /> */}
  </React.StrictMode>
);


