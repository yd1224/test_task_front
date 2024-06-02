import { FaUserLarge } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

import css from "./Contact.module.css";

export const Contact = ({ user: { email, number } }) => {
  return (
    <div className={css.profile}>
      <div className={css.box}>
        <div className={css.wrapper}>
          <FaUserLarge size={20} color="#e76406" />
          <p>{email}</p>
        </div>
        <div className={css.wrapper}>
          <FaPhoneAlt size={20} color="#e76406" />
          <p>{number}</p>
        </div>
      </div>
    </div>
  );
};
