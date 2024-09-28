import { USERNAME_FORMAT_REGEX } from "@utils/helpers/form.helpers";
import * as yup from "yup";

export const schema = yup.object({
  username: yup.string().matches(USERNAME_FORMAT_REGEX, "Invalid username format").required("Username is required")
});
