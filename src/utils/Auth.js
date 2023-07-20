export const BASE_URL = 'https://auth.nomoreparties.co';

// export const register = (data) => {
export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify({ password: data.password, email: data.email })
    body: JSON.stringify(password, email)
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
    
  })
    .then((response => response.json()))
    .then((res) => {
      return res;
    })
    // .then((data) => {
      // if (data.jwt) {
        // if (data.user) {
      //   localStorage.setItem('jwt', data.jwt);
      //   return data;
      // } else {
      //   return;
      // }
    // })
    .catch(err => console.log(err))
};

export const tokenCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  })

    .then(res => {
      if (res.ok) return res.json()
    })

    .then(data => data)
    // .then((response) => {
    //   return response.json();
    // })
    // .then((res) => {
    //   return res;
    // })
    .catch(err => console.log(`Ошибка token ${err}`))
}


//   .then(response => {
//       if (response.status === 200)
//         return response.json();
//       })


// export const getContent = (token) => {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     }
//   })
//   .then(res => res.json())
//   .then(data => data)
// } 