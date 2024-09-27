import { USERNAME_FORMAT_REGEX } from "@utils/helpers/form.helpers";
import * as yup from "yup";

export const schema = yup
  .object({
    username: yup.string().required("This field is required").matches(USERNAME_FORMAT_REGEX, "Invalid username format")
  })
  .required();
