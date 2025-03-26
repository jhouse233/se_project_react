import { useState, useEffect } from 'react';
import './App.css';
import { getWeatherData } from '../../utils/weatherApi.js'
import Header from '../Header/Header.jsx';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import Main from '../Main/Main.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import Footer from '../Footer/Footer.jsx';
// Images
import t_shirt from '../../assets/t-shirt.svg'
import shorts from '../../assets/shorts.svg'
import sneakers from '../../assets/sneakers.svg'
import cap from '../../assets/cap.svg'

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

  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     if (isValidUrl(imageUrl)) {
  //         const formData = {
  //             itemName: itemName,
  //             imageUrl: imageUrl,
  //             weatherType: weatherType
  //         };
  //         onSubmit(formData);
  //     } else {
  //         alert("Please enter a valid URL");
  //     }
  // }


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
        

          // <button className="modal__submit" type="submit">
              // <img src={addGarment} alt="" className="modal__submit-icon" />
          // </button>
      // </form>
  );
}


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cards, setCards] = useState([
    {
      _id: 1,
      name: "T-Shirt", 
      weatherType: "hot",
      imageUrl: t_shirt
    },
    {
      _id: 2,
      name: "shorts", 
      weatherType: "warm",
      imageUrl: shorts
    },
    {
      _id: 3,
      name: "sneakers", 
      weatherType: "cold",
      imageUrl: sneakers
    },
    {
      _id: 4,
      name: "cap", 
      weatherType: "cold",
      imageUrl: cap
    },
  ]);
  const [weatherData, setWeatherData] = useState(null);

  const [selectedCard, setSelectedCard] = useState(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const [itemName, setItemName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("hot");


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // console.log('Fetching weather data...')
        const data = await getWeatherData('New York');
        // console.log('Weather data received in App', data)
        setWeatherData(data)
        // console.log('Weather Data after setState:', weatherData)
      } catch(error) {
          // console.error('Error:', error)
      }
    };
    fetchWeatherData();
  }, []);

  useEffect(() => {
    // console.log('weatherData updated', weatherData);
  }, [weatherData]);


  const handleCloseModal = () => {
    // console.log('Close button clicked');
    setIsModalOpen(false);
    // console.log('Modal state after setting to false:', isModalOpen)
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  // const handleCardClick = (card) => {
  //   console.log('Card Clicked:', card)
  // }
  // console.log('Weather Data:', weatherData);

  // const handleAddGarment = (garmentData) => {
  //   console.log('Form submitted')
  //   const newCard = {
  //     _id: cards.length + 1,
  //     name: garmentData.itemName,
  //     weatherType: garmentData.weatherType,
  //     imageUrl: garmentData.imageUrl
  //   };
  //   setCards([...cards, newCard]);
  //   setIsModalOpen(false);
  // }
  const handleAddGarment = () => {
    // console.log('Form submitted')
    console.log('handleAddGarment called');
    const newGarment = {
      _id: Date.now(),
      name: itemName,
      weatherType: weatherType,
      imageUrl: imageUrl
    };
    console.log('New Garment:', newGarment)
    setCards([...cards, newGarment]);
    console.log('Updatedcards:', cards);
    handleCloseModal();
    setItemName("");
    setImageUrl("");
    setWeatherType("hot");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsItemModalOpen(true);
}

  // const testWeatherAPI = async () => {
  //   const weatherData = await getWeatherData('New York')
  //   console.log('Test weather data:', weatherData);
  
  return (
      <div className="page">
        <div className="page__content">
          <Header onOpenModal={handleOpenModal} location=", New York"/>

            <ModalWithForm 
              title="New Garment"
              onSubmit={handleAddGarment}
              name="add-garment"
              onClose={handleCloseModal}
              buttonText="Add garment"

              isOpen={isModalOpen}
              >
                <AddItemForm 
                  // onSubmit={handleAddGarment}
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

          <Main weatherData={weatherData}
                cards={cards}
                onCardClick={handleCardClick}  
          />
          
          <ItemModal 
              name={selectedCard?.name}
              imageUrl={selectedCard?.imageUrl}
              weatherType={selectedCard?.weatherType}
              temperature={weatherData?.temperature}
              onClose={() => setIsItemModalOpen(false)}
              isOpen={isItemModalOpen}
          />
          
          <Footer />
        </div>
      </div>
  )
}

export default App;
