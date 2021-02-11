/**
 * This file has been taken 1-to-1 from https://github.com/ory/kratos-selfservice-ui-node/blob/master/src/translations.ts
 *
 * Slightly altered to provide a more consistent interface.
 */

// Provides mappings between the `FormFields` returned in a Kratos `**/flow` request and their implications to the UX/UI.
// The functions are self-explantatory, `const translations` should be updated to reflect your `identity.schema.json`'s configuration.

import { FormField } from "@ory/kratos-client";

const translations = {
  password: {
    title: "Password",
    position: 2,
    placeholder: "Secure Password",
  },
  identifier: {
    title: "E-Mail Address",
    position: 1,
    placeholder: "john.doe@example.com",
  },
  "traits.email": {
    title: "E-Mail Address",
    position: 1,
    placeholder: "john.doe@example.com",
  },
  "traits.name.first": {
    title: "First Name",
    position: 3,
    placeholder: "John",
  },
  "traits.name.last": {
    title: "Last Name",
    position: 4,
    placeholder: "Doe",
  },
};
type Translations = typeof translations;

export const getFormFieldTitle = (field: FormField): string =>
  field.name && field.name in translations
    ? translations[field.name as keyof Translations].title
    : field.name;

export const getFormFieldPosition = (field: FormField): number =>
  field.name && field.name in translations
    ? translations[field.name as keyof Translations].position
    : Infinity;

export const getFormPlaceholder = (field: FormField): string =>
  field.name && field.name in translations
    ? translations[field.name as keyof Translations].placeholder
    : "";

// This helper function translates the html input type to the corresponding partial name.
export const toFormInputPartialName = (type: string) => {
  switch (type) {
    case "hidden":
      return "form_input_hidden";
    case "password":
      return "form_input_password";
    case "submit":
      return "form_field_button";
    default:
      return "form_input_default";
  }
};
