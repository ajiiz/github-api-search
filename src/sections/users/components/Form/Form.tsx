import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { FormProps } from "@sections/users/components/Form/Form.types";
import { schema } from "@sections/users/components/Form/validationSchema";
import { useDebounce } from "@utils/hooks/useDebounce/useDebounce";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const Form = ({ handleSearchChange }: FormProps) => {
  const {
    register,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });
  const username = watch("username");
  const debounceValue = useDebounce({ value: username, delay: 2000 });

  useEffect(() => {
    if (debounceValue && !errors.username) {
      handleSearchChange(debounceValue);
    }
  }, [debounceValue]);

  return (
    <form>
      <TextField
        label="Enter the username"
        variant="outlined"
        fullWidth
        sx={{ mt: 2, mb: 4 }}
        error={!!errors.username}
        helperText={errors.username?.message}
        {...register("username")}
      />
    </form>
  );
};
