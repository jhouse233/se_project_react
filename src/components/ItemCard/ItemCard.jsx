import './ItemCard.css';

export default function ItemCard(props) {

    const {name, imageUrl} = props.item;

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
            {/* <button className="card__edit-button" onClick={handleEditButtonClick}></button> */}

        </li>
    )
}