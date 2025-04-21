import { useState, useEffect } from 'react';
import { getWeatherData } from '../../utils/weatherApi.js';
import { Route, Routes } from 'react-router-dom';
import { deleteItem, addItem } from '../../utils/api.js';

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


// Images
// import t_shirt from '../../assets/t-shirt.svg'
// import shorts from '../../assets/shorts.svg'
// import sneakers from '../../assets/sneakers.svg'
// import cap from '../../assets/cap.svg'

import addGarment from '../../assets/add_garment_disabled.svg'

const isValidUrl = (url) => {
  try {
      new URL(url);
      return true;
  } catch (error) {
      return false;
  }
}

function AddItemForm({ nameLabel, imageUrlLabel, weatherTypeLabel, itemName, setItemName, imageUrl, setImageUrl, weatherType, setWeatherType }) {


  const weatherOptions = [
      { id: "hot", value: "hot", label: "Hot" },
      { id: "warm", value: "warm", label: "Warm" },
      { id: "cold", value: "cold", label: "Cold" }
  ];

  return (
      // <form className="modal__form" onSubmit={handleSubmit}>
        <>
          <label className="modal__label">
            {nameLabel}
              <input 
                  type="text"
                  className="modal__input" 
                  placeholder="Name"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
              />
          </label>

          <label className="modal__label">
            {imageUrlLabel}
              <input
                  type="url"
                  className="modal__input" 
                  placeholder="Image URL"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
              />
          </label>

          <label className="modal__label">
            {weatherTypeLabel}
              <div className="modal__radio-container">
                  {weatherOptions.map((option) => (
                      <div key={option.id} className="modal__radio-option">
                          <input
                              type="radio" 
                              className="modal__radio" 
                              id={option.id}
                              name="weatherType"
                              value={option.value}
                              checked={weatherType === option.value}
                              onChange={(e) => setWeatherType(e.target.value)}
                          />
                          <label htmlFor={option.id}>{option.label}</label>
                      </div>
                  ))}
              </div>

          </label>
        </>
  );
}


function App() {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState([]);

  // const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [weatherData, setWeatherData] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const [itemName, setItemName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("hot");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/items');
        const data = await response.json();
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
    // console.log('About to call fetchWeatherData');
    fetchWeatherData();
    // console.log('Called fetchWeatherData');
  
  }, []);

  useEffect(() => {
  }, [weatherData]);


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    // console.log('Before state update - isModalOpen', isModalOpen);
    setIsModalOpen(true);
    // console.log('After state update - attempting to set is ModalOpen true');
  }



  const handleAddGarment = async () => {
    // console.log('Attempting to add garment:', {
    //     name: itemName,
    //     weatherType: weatherType,
    //     imageUrl: imageUrl
    // });
    
    try {
        // const savedGarment = await addItem({
        //     _id: Date.now(),
        //     name: itemName,
        //     weather: weatherType,
        //     imageUrl: imageUrl


        // });
        const savedGarment = await addItem(itemName, imageUrl, weatherType)
        
        // console.log('Received saved garment:', savedGarment);


        // const flattenedGarment = {
        //     ...savedGarment.name,
        //     _id: savedGarment._id
        // };
        
        setCards([...cards, savedGarment]);
        
        // Reset form fields
        setItemName('');
        setWeatherType('');
        setImageUrl('');
        
        setIsModalOpen(false);
    } catch (error) {
        console.error('Error adding garment:', error);
    }
  };


  function handleCardClick(card) {
    setSelectedCard(card);
    setIsItemModalOpen(true);
  }

  // function handleDeleteItem(idToDelete) {
  //   setCards(cards.filter(card => card._id !== idToDelete))
  // }
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
            <Route path="/profile" element={<Profile />} />
          </Routes>

          <ModalWithForm
            title="New Garment"
            onSubmit={handleAddGarment}
            name="add-garment"
            onClose={handleCloseModal}
            buttonText="Add garment"
            isOpen={isModalOpen}
          >
            <AddItemForm
              nameLabel="Name"
              imageUrlLabel="Image URL"
              weatherTypeLabel="Select the Weather Type:"
              itemName={itemName}
              setItemName={setItemName}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              weatherType={weatherType}
              setWeatherType={setWeatherType}
            />
          </ModalWithForm>

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
