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

export { flex }