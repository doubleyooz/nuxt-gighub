import * as yup from "yup";

export const useFormRules = () => {
  const emailRegex =
    /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/gi;
  const emailRules = {
    email: yup
      .string()
      .required("email is required")
      .trim()
      .matches(emailRegex, "email is invalid"),
  };

  const passwordRules = {
    password: yup.string().required("password required"),
    /*
        .matches(/^(?=.*[a-z])/, i18n.t('rules.password.lowercase'))
        .matches(/^(?=.*[A-Z])/, i18n.t('rules.password.upperCase'))
        .matches(/^(?=.*\d)/, i18n.t('rules.password.number'))
        .matches(
            /(?=.*[^a-zA-Z0-9])/,
            i18n.t('rules.password.character'),
          )
        .min(8, i18n.t('rules.password.min'))
        */
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "password must match")
      .required("confirm password is required"),
  };

  return {
    emailRules,
    passwordRules,
  };
};
