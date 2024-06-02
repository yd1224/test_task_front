import { ColorRing } from "react-loader-spinner";
import { v4 as uuidv4 } from "uuid";

import css from "./ContactList.module.css";
import { Contact } from "../Contact/Contact";

export const ContactList = ({ contacts, isLoading }) => {
  if (!contacts) {
    return <p className={css.notFound}>No contacts found</p>;
  }

  if (isLoading) {
    return (
      <div className={css.colorRingWrapperBox}>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#de0c1c", "#fe2d2d", "#fb7830", "#fecf02", "#ffdd47"]}
        />
      </div>
    );
  }

  return (
    <ul>
      {contacts.map((contact) => (
        <li className={css.list} key={uuidv4()}>
          <Contact user={contact} />
        </li>
      ))}
    </ul>
  );
};
