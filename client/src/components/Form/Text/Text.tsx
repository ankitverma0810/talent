import { FieldHookConfig, useField } from "formik";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

interface TextInputProps {
	label: string;
	name: string;
	type?: string;
}

const TextInput: React.FC<TextInputProps & FieldHookConfig<string>> = (
	props
) => {
	const [field, meta] = useField({ ...props });

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
				type={props.type ? props.type : "text"}
			/>
			<FormHelperText>
				{meta.touched && meta.error ? meta.error : " "}
			</FormHelperText>
		</FormControl>
	);
};

export default TextInput;
