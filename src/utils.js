import { css } from 'styled-components';
import { useEffect, useState } from 'react';

export async function login({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'harry' && password === 'password') {
        resolve();
      } else {
        reject();
      }
    }, 1000);
  });
}

const UpdatePageTitle = title => {
    useEffect(() => {
        document.title = title;
    }, [title]);
}

const SaveToLocalStorage = (key, defaultValue) => {
    const [storage, setStorage] = useState(() => {
        let value; 
        try {
            value = JSON.parse(
                window.localStorage.getItem(key) || String(defaultValue)
            )
        } catch (e) {
            value = defaultValue;
        }
    
        return value;
    });

    useEffect(() => {
        window.localStorage.setItem(key, storage);
    }, [key, storage])

    return [storage, setStorage];
}

const capitalize = (input) => {
  if (typeof input !== 'string') return ''
  return input.charAt(0).toUpperCase() + input.slice(1)
}

const ellipsis = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const flex = (justify, align, direction = 'row') => `
    display:flex;
    flex-direction:${direction};
    justify-content:${justify};
    align-items:${align};`;

const noSelect = css`
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
`;

const copyCat = state => JSON.parse(JSON.stringify(state));

export { flex, noSelect, copyCat, capitalize, ellipsis, UpdatePageTitle, SaveToLocalStorage }