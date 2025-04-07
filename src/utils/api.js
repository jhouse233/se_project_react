const BASE_URL = 'http://localhost:3001';

const getItems = async () => {
    try {
        const response = await fetch(`${BASE_URL}/items`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }

        return await response.json()
    } catch(error) {
        console.error('Error fetching items:', error)
        throw error;
    }
}

const addItem = async (name, imageUrl, weather) => {
    try {
        const response = await fetch(`${BASE_URL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                imageUrl: imageUrl,
                weather: weather
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        throw new Error(`Error adding item: ${error.message}`);
    }
}

const deleteItem = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/items/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }

        return true;


    } catch (error) {
        console.error(`Error deleting item:`, error);
        throw error;
    }
}

export { getItems, addItem, deleteItem };