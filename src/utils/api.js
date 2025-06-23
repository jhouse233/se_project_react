const BASE_URL = 'http://localhost:3001';

const baseHeaders = (token) => {
  return {
    'Content-Type': 'Application/json',
    Authorization: `Bearer ${token}`
  };
}



export async function _request(url, options) {
    return _checkResponse(await fetch(url, options));
  } 
  
  export function _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`error ${res.status}`);
  }
  
  export function getItems() {
    return _request(`${BASE_URL}/items`);
  }
  
  export function addItem(name, imageUrl, weather) {
    const token = localStorage.getItem('jwt')

    return _request(`${BASE_URL}/items`, {
      method: "POST",
      headers: baseHeaders(token),
      body: JSON.stringify({ name, imageUrl, weather }),
      
    });
  }
  
  export function deleteItem(id) {
    const token = localStorage.getItem('jwt')

    return _request(`${BASE_URL}/items/${id}`, {
      method: "DELETE",
      headers: baseHeaders(token),
    });
  }

  export function addCardLike(cardId, token) {
    return _request(`${BASE_URL}/items/${cardId}/likes`, {
      method: 'PUT',
      headers: baseHeaders(token),
    }); 
  }

  export function removeCardLike(cardId, token) {
    return _request(`${BASE_URL}/items/${cardId}/likes`, {
      method: 'DELETE',
      headers: baseHeaders(token),
    }); 
  }


  