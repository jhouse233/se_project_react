import './ItemCard.css';
import { useContext } from 'react';
import { CurrentUserContext, UserContext } from '../../contexts/CurrentUserContext';

export default function ItemCard({ item, onCardLike, onCardClick, isLoggedIn }) {
    const { currentUser } = useContext(UserContext);

    const isLiked = item.likes.some((id) => id === currentUser?._id);

    const itemLikeButtonClassName = `card__like-button ${
        isLiked
          ? "card__like-button_active"
          : "card__like-button_inactive"
      }`;


    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();
        onCardLike({ id: item._id, isLiked: isLiked })
    }

    const handleCardClick = () => {
        onCardClick(item);
      };

    console.log("Is User Logged In?", isLoggedIn);
    console.log("Likes array: ", item.likes);
    console.log("Current user ID: ", currentUser._id);
    console.log("Current user in context: ", currentUser);



    return(
        <li className="card" onClick={handleCardClick}>
            <img 
                onClick={handleCardClick}
                src={item.imageUrl}
                alt={item.name}
                className="card__image" 
            />
            {isLoggedIn && (
                <button 
                    onClick={handleLike}
                    className={itemLikeButtonClassName}
                ></button>
            )}
            
            <div className="card__content">
                <p className="card__name">{item.name}</p>
                {/* <p className="card__weather">{weather}</p> */}
            </div>
        </li>
    )
}