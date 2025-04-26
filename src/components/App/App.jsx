import { useState, useEffect } from 'react';
import { getWeatherData } from '../../utils/weatherApi.js';
import { Route, Routes } from 'react-router-dom';
import { deleteItem, addItem, getItems } from '../../utils/api.js';

import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext.jsx';


import './App.css';

import Header from '../Header/Header.jsx';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import Main from '../Main/Main.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import Footer from '../Footer/Footer.jsx';
import Profile from '../Profile/Profile.jsx';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import DeleteConfirmModal from '../DeleteConfirmModal/DeleteConfirmModal.jsx';
import ClothesSection from '../ClothesSection/ClothesSection.jsx';

import addGarment from '../../assets/add_garment_disabled.svg'
import AddItemModal from '../AddItemModal/AddItemModal.jsx';

const isValidUrl = (url) => {
  try {
      new URL(url);
      return true;
  } catch (error) {
      return false;
  }
}

function App() {

  const [isAddNewItemOpen, setIsAddNewItemOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState([]);


  const [weatherData, setWeatherData] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);


  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        
        const data = await getItems();
        console.log('Fetch data:', data)
        setCards(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {

        const data = await getWeatherData('New York');


        const celsiusTemp = Math.round(data.main.temp);
        const fahrenheitTemp = Math.round((celsiusTemp * 9/5) + 32)


        const weatherDataObj = {
          ...data,
          temperature: {
            F: fahrenheitTemp,
            C: celsiusTemp
          }
        };

        setWeatherData(weatherDataObj);
 

      } catch(error) {
        console.error('Error in fetch', error);
      }
    };
    fetchWeatherData();  
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsAddNewItemOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleAddGarment = async (formData) => {
    try {
        const savedGarment = await addItem(
          formData.name,
          formData.imageUrl,
          formData.weather
        );
        setCards([savedGarment, ...cards]);
        handleCloseModal();

    } catch (error) {
        console.error('Error adding garment:', error);
    }
  };


  function handleCardClick(card) {
    setSelectedCard(card);
    setIsItemModalOpen(true);
  }


  async function handleDeleteItem(idToDelete) {
    try {
      await deleteItem(idToDelete);
      setCards(cards.filter(card => card._id !== idToDelete));
    } catch (error) {
     console.error('Error deleting item:', error);
    }
  }

  function handleDeleteClick() {
    setIsDeleteModalOpen(true);
    setIsItemModalOpen(false);
  }

  const handleAddNewItemClick = () => {
    setIsAddNewItemOpen(true);
  }

  return (
    <CurrentTemperatureUnitContext>
      <div className="page">
        <div className="page__content">
          <Header
            onOpenModal={handleOpenModal}
            location=", New York"
          />
          <Routes>
            <Route
              path="/"
              element={
                weatherData ? (
                  <>

                    <Main
                      weatherData={weatherData}
                      cards={cards}
                      onCardClick={handleCardClick}
                      onDeleteItem={handleDeleteClick}
                    />
                  </>
                ) : (
                  <div>Loading weather data...</div>
                )
              }
            />
            <Route path="/profile" element={<Profile 
              cards={cards}
              onCardClick={handleCardClick}
              onDeleteItem={handleDeleteClick}
              handleAddNewItemClick={handleAddNewItemClick}
            />
            } />
          </Routes>

          <AddItemModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleAddGarment}
          />

          <ItemModal
            name={selectedCard?.name}
            imageUrl={selectedCard?.imageUrl}
            weatherType={selectedCard?.weather}
            temperature={weatherData?.temperature}
            onClose={() => setIsItemModalOpen(false)}
            isOpen={isItemModalOpen}
            onDelete={handleDeleteClick}
          />
          <DeleteConfirmModal 
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={() => {
              handleDeleteItem(selectedCard?._id);
              setIsDeleteModalOpen(false)
            }}
          />

          <Footer />
        </div>
      </div>
    </CurrentTemperatureUnitContext>
  );
}

export default App;
