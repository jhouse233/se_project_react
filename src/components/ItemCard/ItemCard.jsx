import './ItemCard.css';

export default function ItemCard(props) {

    const {name, imageUrl, weather} = props.item;

    function handleCardClick() {
        props.onCardClick(props.item);
    }

    function handleEditButtonClick(e) {
        e.stopPropagation();
        props.onEditClick(props.item);
    }

    return(
        <li className="card" onClick={handleCardClick}>
            <img src={imageUrl} alt="image" className="card__image" />
            <div className="card__content">
                <p className="card__name">{name}</p>
                <p className="card__weather">{weather}</p>
            </div>
        </li>
    )
}