import React from "react";

import { FieldHookConfig, useField } from "formik";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

interface SelectInputProps {
	label: string;
	name: string;
	options: { label: string; value: string }[];
}

const SelectInput: React.FC<SelectInputProps & FieldHookConfig<string>> = (
	props
) => {
	const [field, meta] = useField(props);

	return (
		<FormControl
			fullWidth
			error={
				(meta.touched && meta.error && meta.error.length > 0) as boolean
			}
		>
			<InputLabel>{props.label}</InputLabel>
			<Select {...field} name={props.name}>
				{props.options.map((option) => {
					return (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					);
				})}
			</Select>

            <FormHelperText>
				{meta.touched && meta.error ? meta.error : " "}
			</FormHelperText>
		</FormControl>
	);
};

export default SelectInput;
