import style from './Modal.module.css';
import { ButtonPrimary } from "components/Button/ButtonPrimary";

const Modal = ({ handleClose, isActive, children }) => {
  const showHideClassName = isActive ? style["display-block"] : style["display-none"];

  return (
    <div className={`${style.modal} ${showHideClassName}`}>
      <section className={style["modal-main"]}>
        {children}
        <ButtonPrimary type="button" onClick={handleClose}>
          Close
        </ButtonPrimary>
      </section>
    </div>
  );
};

export default Modal;
