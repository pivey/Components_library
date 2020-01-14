import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/base.css';
import LoginUseReducer from './components/LoginUseReducer';
import LoginUseReducerImmer from './components/LoginUseReducerImmer';
import FocusEffectInput from './components/FocusEffectInput';
import DynamicForm from './components/DynamicForm';
import ParallaxTitles from './components/ParallaxTitles';
import AsyncHooks from './components/AsyncHooks';

const useLocationHash  = () => {
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

const useSimpleHashRouter = (routes) => {
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
    FocusEffectInput: FocusEffectInput,
    DynamicForm: DynamicForm,
    ParallaxTitles: ParallaxTitles,
    AsyncHooks: AsyncHooks,
  });

  const controller = {
        focusColor: '#6610F2',
        initLabelSize: '1.6rem',
        focusedLabelSize: '1.3rem',
        inputFontSize: '1.5rem',
        initFontColor: '#454745',
        // onChange: dispatch,
        states: [{ stateName: 'name', labelName: 'Name *' }, { stateName: 'email', labelName: 'Email *' }, { stateName: 'age', labelName: 'Age *' }, { stateName: 'address', labelName: 'Address *' }],
        bannerText: 'Information',
        actionBtn_1: { text: 'Cancel', bgc: '#eb0505' },
        actionBtn_2: { text: 'Submit', bgc: '#0cc212' }
    }

  return (
    <>
      {!CurrentRoute && (
        <>
        <div className="App App-Column">
          <a href="#useReducer">useReducer</a>
          <br />
          <br />
          <a href="#useReducerImmer">useReducerImmer</a>
          <br />
          <br />
          <a href="#FocusEffectInput">FocusEffectInput</a>
          <br />
          <br />
          <a href="#DynamicForm">DynamicForm</a>
          <br />
          <br />
          <a href="#ParallaxTitles">ParallaxTitles</a>
          <br />
          <br />
          <a href="#AsyncHooks">AsyncHooks</a>
        </div>
        </>
      )}
      
      {CurrentRoute === FocusEffectInput 
      ? <CurrentRoute labelName="Name" />
      : CurrentRoute === FocusEffectInput
      ? <CurrentRoute {...controller} />
      : CurrentRoute && <CurrentRoute />
      }
    </>
  );
}

export default App;
