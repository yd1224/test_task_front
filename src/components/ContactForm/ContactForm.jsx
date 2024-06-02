import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import * as yup from "yup";

import css from "./ContactForm.module.css";
import { searchContact } from "../../api/api";
import MaskedTextField from "../MaskedTextField/MaskedTextField";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .max(320, "Email is too long")
    .required("Email is required"),
  phone: yup
    .string()
    .transform((value) => (value === "" ? null : value))
    .matches(/^\d{2}-\d{2}-\d{2}$/, {
      message: "Number must be in the format 11-22-33",
    })
    .nullable(),
});

export const ContactForm = ({ setFoundContacts, setIsLoading }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: JSON.parse(localStorage.getItem("contactFormData"))?.email || "",
      phone: JSON.parse(localStorage.getItem("contactFormData"))?.phone || "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    const formValues = {
      ...watch(),
      [name]: value,
    };

    localStorage.setItem("contactFormData", JSON.stringify(formValues));
  };

  const onSubmit = async (data) => {
    data.phone = data.phone?.replace(/\D/g, "");

    setIsLoading(true);

    setIsDisabled(true);

    const contacts = await searchContact(data);

    setIsLoading(false);

    setIsDisabled(false);

    setFoundContacts(contacts);

    localStorage.removeItem("contactFormData");

    reset({
      email: "",
      phone: "",
    });
  };

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.box}>
          <label htmlFor="email">Email</label>
          <input
            className={css.input}
            type="email"
            id="email"
            {...register("email")}
            onChange={handleChange}
          />
          {errors.email && <p className={css.err}>{errors.email.message}</p>}
        </div>

        <div className={css.box}>
          <label htmlFor="phone">Number</label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <MaskedTextField
                id="phone"
                mask="00-00-00"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
              />
            )}
          />
          {errors.phone && <p className={css.err}>{errors.phone.message}</p>}
        </div>

        <button
          disabled={isDisabled}
          className={isDisabled ? css.disabledBtn : css.btn}
          type="submit"
        >
          Search contact
        </button>
      </form>
    </div>
  );
};
