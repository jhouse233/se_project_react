import './Header.css';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/avatar.png'


export default function Header({onOpenModal}) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        // weekday: 'long',
        // year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // console.log('Formatted date:', formattedDate);

    return (
        <header className="header">
            <div className="header-left">
                <img src={logo} alt="Logo" className="header__logo" />
                <div className="date">{formattedDate}</div>
            </div>
            <div className="header-center">
                <p>, New York</p>
            </div>
            <div className="header-right">
                <button type="button" className="header__add-clothes-button" onClick={onOpenModal}>+ Add Clothes</button>
                <p className="header__username">Terrance Tegegne</p>
                <img src={avatar} alt="Avatar" className="header__avatar" />
            </div>
        </header>
    )
}