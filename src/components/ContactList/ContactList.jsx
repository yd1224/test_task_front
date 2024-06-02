import { ColorRing } from "react-loader-spinner";
import css from "./ContactList.module.css";
import { v4 as uuidv4 } from "uuid";

import { Contact } from "../Contact/Contact";

export const ContactList = ({ contacts, isLoading }) => {
    
  return isLoading ? (
    <div className={css.colorRingWrapperBox}>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#de0c1c", "#fe2d2d", "#fb7830", "	#fecf02", "#ffdd47"]}
      />
    </div>
  ) : (
    <ul>
      {contacts.map((contact) => {
        return (
          <li className={css.list} key={uuidv4()}>
            <Contact user={contact} />
          </li>
        );
      })}
    </ul>
  );
};
