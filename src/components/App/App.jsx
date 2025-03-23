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


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        console.log('Fetching weather data...')
        const data = await getWeatherData('New York');
        console.log('Weather data received in App', data)
        setWeatherData(data)
        console.log('Weather Data after setState:', weatherData)
      } catch(error) {
          console.error('Error:', error)
      }
    };
    fetchWeatherData();
  }, []);

  useEffect(() => {
    console.log('weatherData updated', weatherData);
  }, [weatherData]);


  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  }
  // const handleCardClick = (card) => {
  //   console.log('Card Clicked:', card)
  // }
  console.log('Weather Data:', weatherData);

  const handleAddGarment = (garmentData) => {
    const newCard = {
      _id: cards.length + 1,
      name: garmentData.itemName,
      weatherType: garmentData.weatherType,
      imageUrl: garmentData.imageUrl
    };
    setCards([...cards, newCard]);
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
          <Header onOpenModal={handleOpenModal} />

            <ModalWithForm 
              title="New Garment"
              name="add-garment"
              onClose={handleCloseModal}
              onSubmit={handleAddGarment}
              isOpen={isModalOpen}
            />

          <Main weatherData={weatherData}
                cards={cards}
                onCardClick={handleCardClick}  
          />
          {isItemModalOpen && (
            <ItemModal 
                name={selectedCard?.name}
                imageUrl={selectedCard?.imageUrl}
                weatherType={selectedCard?.weatherType}
                temperature={weatherData?.temperature}
                onClose={() => setIsItemModalOpen(false)}
            />
          )}
          <Footer />
        </div>
      </div>
  )
}

export default App;
