import successLogo from '../images/success.svg'
import failureLogo from '../images/failure.svg'

function InfoTooltip(props) {
    return (
      <div
        className={`popup popup_tooltip ${
          props.isOpen ? "popup_active" : ""
        }`}
      >
        <div className="popup__content">
          <button
            type="button"
            aria-label="Закрыть"
            className={"popup__quit-button popup__close-tooltip"}
            onClick={props.onClose}
          ></button>
          <img className="popup__img" src={`${props.isSuccess ? successLogo : failureLogo}`} alt="лого регистрации" />
          <h2 className="popup__title popup__title_center">{props.isSuccess ? ("Вы успешно зарегистрировались!") : ("Что-то пошло не так! Попробуйте еще раз.")}</h2>
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;