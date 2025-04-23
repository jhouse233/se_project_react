const BASE_URL = 'http://localhost:3001';

const baseHeaders = { "content-type": "application/json" };



export async function _request(url, options) {
    return _checkResponse(await fetch(url, options));
  } 
  
  function _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`error ${res.status}`);
  }
  
  export function getItems() {
    return _request(`${BASE_URL}/items`);
  }
  
  export function addItem(name, imageUrl, weather) {
    return _request(`${BASE_URL}/items`, {
      method: "POST",
      headers: baseHeaders,
      body: JSON.stringify({ name, imageUrl, weather }),
    });
  }
  
  export function deleteItem(id) {
    return _request(`${BASE_URL}/items/${id}`, {
      method: "DELETE",
      headers: baseHeaders,
    });
  }













// const getItems = async () => {
//     try {
//         const response = await fetch(`${BASE_URL}/items`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch items');
//         }

//         return await response.json()
//     } catch(error) {
//         console.error('Error fetching items:', error)
//         throw error;
//     }
// }

// const addItem = async (name, imageUrl, weather) => {
//     try {
//         const response = await fetch(`${BASE_URL}/items`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: name,
//                 imageUrl: imageUrl,
//                 weather: weather
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.status}`);
//         }

//         return await response.json();

//     } catch (error) {
//         throw new Error(`Error adding item: ${error.message}`);
//     }
// }

// const deleteItem = async (id) => {
//     try {
//         const response = await fetch(`${BASE_URL}/items/${id}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });

//         if (!response.ok) {
//             throw new Error(`Error: ${response.status}`)
//         }

//         return true;


//     } catch (error) {
//         console.error(`Error deleting item:`, error);
//         throw error;
//     }
// }

// export { getItems, addItem, deleteItem };