import { useState, useEffect } from 'react';
import { getWeatherData } from '../../utils/weatherApi.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { deleteItem, addItem, getItems, addCardLike, removeCardLike } from '../../utils/api.js';

import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext.jsx';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.jsx';

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

import RegisterModal from '../RegisterModal/RegisterModal.jsx';
import { signup, signin, checkToken, editProfile } from '../../utils/auth.js';
import LoginModal from '../LoginModal/LoginModal.jsx';
import EditProfileModal from '../EditProfileModal/EditProfileModal.jsx';
// import { deleteTestItems } from '../../utils/api.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';

const isValidUrl = (url) => {
  try {
      new URL(url);
      return true;
  } catch (error) {
      return false;
  }
}

function App() {
  // useStates
  const [activeModal, setActiveModal] = useState(null);
  const [cards, setCards] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading ] = useState(false);

  // Check to see if user is logged in
  const isLoggedIn = currentUser !== null;

  // Navigation setup
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setCards(data);
        console.log(data);
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

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const validateUser = async () => {
      // if (!jwt) return;
      try {
        if (jwt) {
          const response = await checkToken(jwt);
          setCurrentUser(response);
        }
      } catch (error) {
        console.error('Error fetching item:', error)
        handleLogOut();
      }
    }
    validateUser();
  }, [])

  useEffect(() => {
    if (!activeModal) return; 
  
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
  
    document.addEventListener("keydown", handleEscClose);
  
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleAddGarment = async (formData) => {
    try {
        const savedGarment = await addItem(
          formData.name,
          formData.imageUrl,
          formData.weather
        );
        setCards([savedGarment, ...cards]);
        setActiveModal(null);

    } catch (error) {
        console.error('Error adding garment:', error);
    }
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal('preview');
  }

  async function handleDeleteItem(idToDelete) {
    try {
      await deleteItem(idToDelete);
      setCards(cards.filter(card => card._id !== idToDelete));
    } catch (error) {
     console.error('Error deleting item:', error);
    }
  }

  const handleLogin = async (values) => {
    await handleSubmit(async () => {
      const userData = await signin(values);
      const token = userData.token || userData.jwt;
      localStorage.setItem('jwt', token);
  
      const userProfile = await checkToken(token);
      setCurrentUser(userProfile);
      navigate('/');
    });
  };

  const handleRegister = async (values) => {
    await handleSubmit(async () => {
      const userData = await signup(values);
      setCurrentUser(userData);
    });
  };

  const handleLogOut = () => {
    localStorage.removeItem('jwt')
    navigate('/');
    setActiveModal(null);
    setCurrentUser(null);
  }

  
  // Navigate Handlers
  const navigateToLogin = () => {
    setActiveModal(null);
    setActiveModal('login');
  };

  const navigateToRegister = () => {
    setActiveModal(null);
    setActiveModal('register');
  }

  // makeRequest and handleSubmit
  const handleSubmit = async (makeRequest) => {
    setIsLoading(true);
    makeRequest()
      .then(() => setActiveModal(null)) 
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  // User 
  const handleEditUser = async (values) => {
    await handleSubmit(async () => {
      const token = localStorage.getItem('jwt');
  
      if (!token) {
        console.error('No token found!');
        return navigateToLogin();
      }
  
      const { name, avatar } = values;
      const userData = await editProfile({ name, avatar, token });
  
      setCurrentUser(userData);
      // console.log('Updated user:', userData);
    });
  };

  // UI Interactions
  const handleEditUserClick = () => {
    setActiveModal('edit-profile');
  }

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem('jwt');
  
    if (!token) {
      console.error('JWT token is missing, unable to like card');
      return;
    }
  
    const updateCard = (updatedCard) => {
      setCards((cards) =>
        cards.map((item) => (item._id === id ? updatedCard : item))
      );
    };
  
    const onError = (err) => console.log(err);
  
    if (!isLiked) {
      addCardLike(id, token).then(updateCard).catch(onError);
    } else {
      removeCardLike(id, token).then(updateCard).catch(onError);
    }
  };

  return (
    <CurrentTemperatureUnitContext>
      <CurrentUserContext
        currentUser={currentUser}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleLoginClick={() => setActiveModal('login')}
              handleRegisterClick={() => setActiveModal('register')}
              handleAddClick={() => setActiveModal('add-garment')}
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
                        onDeleteItem={() => setActiveModal('delete')}
                        onCardLike={handleCardLike}
                        isLoggedIn={isLoggedIn}
                      />
                    </>
                  ) : (
                    <div>Loading weather data...</div>
                  )
                }
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile 
                      cards={cards}
                      onCardClick={handleCardClick}
                      onDeleteItem={() => setActiveModal('delete')}
                      handleAddNewItemClick={() => setActiveModal('add-garment')}
                      handleEditUserClick={handleEditUserClick}
                      handleLogOut={handleLogOut}
                      onCardLike={handleCardLike}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }/>
            </Routes>

            <AddItemModal
              isOpen={activeModal === 'add-garment'}
              onClose={() => setActiveModal(null)}
              onSubmit={handleAddGarment}
              // isLoadingText={isLoading? 'Saving...' : 'Add Garment'}
            />

            <ItemModal
              name={selectedCard?.name}
              imageUrl={selectedCard?.imageUrl}
              weatherType={selectedCard?.weather}
              temperature={weatherData?.temperature}
              onClose={() => setActiveModal(null)}
              isOpen={activeModal === 'preview'}
              onDelete={()=> setActiveModal('delete')}
              owner={selectedCard?.owner}
              isLoggedIn={isLoggedIn}
            />
            <DeleteConfirmModal 
              isOpen={activeModal === 'delete'}
              onClose={() => setActiveModal(null)}
              onConfirm={() => {
                handleDeleteItem(selectedCard?._id);
                setActiveModal(null);
              }}
            />
            <RegisterModal 
              isOpen={activeModal === 'register'}
              onClose={() => setActiveModal(null)}
              onSubmit={handleRegister}
              navigateToLogin={navigateToLogin}
              isLoadingText={isLoading? 'Signing up...' : 'Next'}
            />
            <LoginModal 
            isOpen={activeModal === 'login'}
            onClose={() => setActiveModal(null)}
            onSubmit={handleLogin}
            navigateToRegister={navigateToRegister}
            isLoadingText={isLoading? 'Logging in...' : 'Log in'}
            />
            <EditProfileModal 
              isOpen={activeModal === 'edit-profile'}
              onClose={() => setActiveModal(null)}
              handleEditUser={handleEditUser}
            />
              
          

            <Footer />
          </div>
        </div>
      </CurrentUserContext>
    </CurrentTemperatureUnitContext>
  );
}

export default App;
