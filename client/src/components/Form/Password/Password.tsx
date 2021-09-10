import { useState } from "react";

import { FieldHookConfig, useField } from "formik";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

interface PasswordInputProps {
	label: string;
	name: string;
}

const PasswordInput: React.FC<PasswordInputProps & FieldHookConfig<string>> = (
	props
) => {
	const [showPassword, setShowPassword] = useState(false);
	const [field, meta] = useField({ ...props });

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<FormControl
			fullWidth
			error={
				(meta.touched && meta.error && meta.error.length > 0) as boolean
			}
		>
			{props.label && (
				<InputLabel htmlFor={props.name}>{props.label}</InputLabel>
			)}
			<Input
				{...field}
				name={props.name}
				type={showPassword ? "text" : "password"}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
						>
							{showPassword ? (
								<VisibilityIcon />
							) : (
								<VisibilityOffIcon />
							)}
						</IconButton>
					</InputAdornment>
				}
			/>
			<FormHelperText>
				{meta.touched && meta.error ? meta.error : " "}
			</FormHelperText>
		</FormControl>
	);
};

export default PasswordInput;
