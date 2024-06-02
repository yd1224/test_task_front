import { useState } from "react";

import { ContactList } from "./components/ContactList/ContactList";
import { ContactForm } from "./components/ContactForm/ContactForm";

export const App = () => {
  const [foundContacts, setFoundContacts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <h1>Phonebook</h1>

      <ContactForm
        setFoundContacts={setFoundContacts}
        setIsLoading={setIsLoading}
      />
      <ContactList contacts={foundContacts} isLoading={isLoading} />
    </div>
  );
};
