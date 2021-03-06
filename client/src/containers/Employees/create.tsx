import React from "react";
import { Link } from "react-router-dom";
import { History } from "history";

import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import axios from "../../api/axios";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import TextInput from "../../components/Form/Text/Text";
import PasswordInput from "../../components/Form/Password/Password";
import SelectInput from "../../components/Form/Select/Select";
import { Employee } from "../../store/actions/employee";

interface EmployeeCreateProps {
	history: History;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
	})
);

const EmployeeCreate: React.FC<EmployeeCreateProps> = ({ history }) => {
	const classes = useStyles();
	const { submitted, loading } = useTypedSelector((state) => state.employees);
	const [managers, setManagers] = React.useState<Employee[]>([]);
	const { createEmployee } = useActions();

	React.useEffect(() => {
		if (submitted) {
			history.push("/employees");
		}
	}, [submitted]);

	const submitHandler = (values: any) => {
		createEmployee(values);
	};

	const onManagerChange = async (event: object, value: any) => {
		if (value.length) {
			try {
				const { data } = await axios.get(`/employees/search/${value}`);
				setManagers(data);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const roles = [
		{
			label: "Manager",
			value: "manager",
		},
		{
			label: "Employee",
			value: "employee",
		},
		{
			label: "Admin",
			value: "admin",
		},
	];

	return (
		<Container maxWidth="xl" className="py-2">
			<Typography variant="h4" className="pb-2">
				Create Employee
			</Typography>

			<Formik
				initialValues={{
					firstname: "",
					lastname: "",
					designation: "",
					email: "",
					password: "",
					role: "",
					reportsTo: "",
				}}
				validationSchema={Yup.object({
					firstname: Yup.string().required("Required"),
					lastname: Yup.string().required("Required"),
					designation: Yup.string().required("Required"),
					email: Yup.string().required("Required"),
					password: Yup.string().required("Required"),
					role: Yup.string().required("Required"),
				})}
				onSubmit={submitHandler}
			>
				{(props) => {
					return (
						<Form className={classes.root}>
							<Grid container spacing={3}>
								<Grid item xs={6}>
									<TextInput
										label="First Name*"
										name="firstname"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextInput
										label="Last Name*"
										name="lastname"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextInput
										label="Designation*"
										name="designation"
									/>
								</Grid>
								<Grid item xs={6}>
									<TextInput
										type="email"
										label="Email Address*"
										name="email"
									/>
								</Grid>
								<Grid item xs={6}>
									<PasswordInput
										label="Password*"
										name="password"
									/>
								</Grid>
								<Grid item xs={6}>
									<SelectInput
										label="Role*"
										name="role"
										options={roles}
									/>
								</Grid>
								<Grid item xs={6}>
									<Autocomplete
										id="reportsTo"
										options={managers}
										onChange={(event: any, value: any) => {
											props.setFieldValue(
												"reportsTo",
												value ? value.id : ""
											);
										}}
										onInputChange={onManagerChange}
										getOptionLabel={(option) =>
											option.firstname
										}
										getOptionSelected={(option, value) =>
											option.id === value.id
										}
										renderInput={(params) => (
											<TextField
												{...params}
												name="reportsTo"
												label="Manager"
											/>
										)}
									/>
								</Grid>
								<Grid
									container
									direction="row"
									justifyContent="flex-end"
									style={{ padding: "12px" }}
								>
									<Button component={Link} to="/employees">
										Cancel
									</Button>
									<Button
										type="submit"
										variant="contained"
										color="secondary"
										disabled={loading}
									>
										{loading ? "Submiting..." : "Submit"}
									</Button>
								</Grid>
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</Container>
	);
};

export default EmployeeCreate;
