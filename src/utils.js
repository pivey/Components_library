import styled, { css } from 'styled-components'

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

export { flex, noSelect, copyCat }