import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/base.css';
import LoginUseReducer from './LoginUseReducer';
import LoginUseReducerImmer from './LoginUseReducerImmer';


function useLocationHash() {
  const [hash, setHash] = useState(window.location.hash);
  function onHashChange() {
    setHash(window.location.hash);
  }
  useEffect(() => {
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  return hash;
}

function useSimpleHashRouter(routes) {
  const hash = useLocationHash();
  // Exclude '#' when calculating hash.
  const currentRoute = routes[hash.substr(1)];
  if (currentRoute) {
    return currentRoute;
  }
  return null;
}

function App() {
  const CurrentRoute = useSimpleHashRouter({
    useReducer: LoginUseReducer,
    useReducerImmer: LoginUseReducerImmer,
  });
  return (
    <>
      {!CurrentRoute && (
        <div className="App App-Column">
          <a href="#useReducer">useReducer</a>
          <br />
          <br />
          <a href="#useReducerImmer">useReducerImmer</a>
        </div>
      )}
      {CurrentRoute && <CurrentRoute />}
    </>
  );
}

export default App;
