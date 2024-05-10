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
        
    confirmPassword: yup
      .string()
      .required("confirm password is required")
      .oneOf([yup.ref("password")], "passwords must match"),
        */
  };

  const nameRules = { name: yup.string().min(3).max(25).trim() };
  const descriptionRules = { description: yup.string().min(6).max(500).trim() };
  const budgetRules = { budget: yup.number().min(10) };

  const gigSchema = {
    title: yup.string().min(3).max(25).trim(),
    ...descriptionRules,
  };

  const propositionSchema = {
    ...descriptionRules,
    ...budgetRules,
    deadline: yup.number().min(1),
  };

  return {
    emailRules,
    passwordRules,
    budgetRules,
    nameRules,
    gigSchema,
    descriptionRules,
    propositionSchema,
  };
};
