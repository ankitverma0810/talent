import React from "react";
import { Link, Redirect } from "react-router-dom";
import * as H from "history";

import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import TextInput from "../../components/Form/Text/Text";
import SelectInput from "../../components/Form/Select/Select";
import { Employee } from "../../store/actions/employee";

export interface Match<P> {
	params: P;
	isExact: boolean;
	path: string;
	url: string;
}

export interface RouteComponentProps<P> {
	match: Match<P>;
	location: H.Location;
	history: H.History;
	staticContext?: any;
}

interface EmployeeUpdateProps extends RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
	})
);

const EmployeeUpdate: React.FC<EmployeeUpdateProps> = ({ history, match }) => {
	const classes = useStyles();
	const [employee, setEmployee] = React.useState<Employee | undefined>();
	const { updateEmployee } = useActions();
	const { data, submitted, loading } = useTypedSelector(
		(state) => state.employees
	);

	React.useEffect(() => {
		let employee = data.find((record) => record.id === match.params.id);
		if (employee) {
			setEmployee(employee);
		} else {
			history.push("/employees");
		}
	}, [history, match]);

	React.useEffect(() => {
		if (submitted) {
			history.push("/employees");
		}
	}, [submitted]);

	const submitHandler = (values: any) => {
		updateEmployee(values);
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

	const render = (
		<Container maxWidth="xl" className="py-2">
			<Typography variant="h4" className="pb-2">
				Update Employee
			</Typography>

			<Formik
				enableReinitialize
				initialValues={{
					id: employee && employee.id ? employee.id : null,
					firstname:
						employee && employee.firstname
							? employee.firstname
							: "",
					lastname:
						employee && employee.lastname ? employee.lastname : "",
					designation:
						employee && employee.designation
							? employee.designation
							: "",
					email: employee && employee.email ? employee.email : "",
					role: employee && employee.role ? employee.role : "",
				}}
				validationSchema={Yup.object({
					firstname: Yup.string().required("Required"),
					lastname: Yup.string().required("Required"),
					email: Yup.string().required("Required"),
					role: Yup.string().required("Required"),
				})}
				onSubmit={submitHandler}
			>
				<Form className={classes.root}>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<TextInput label="First Name*" name="firstname" />
						</Grid>
						<Grid item xs={6}>
							<TextInput label="Last Name*" name="lastname" />
						</Grid>
						<Grid item xs={6}>
							<TextInput label="Designation" name="designation" />
						</Grid>
						<Grid item xs={6}>
							<TextInput
								type="email"
								label="Email Address*"
								name="email"
							/>
						</Grid>
						<Grid item xs={6}>
							<SelectInput
								label="Role*"
								name="role"
								options={roles}
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
								{loading ? "Updating..." : "Update"}
							</Button>
						</Grid>
					</Grid>
				</Form>
			</Formik>
		</Container>
	);

	return employee ? render : null;
};

export default EmployeeUpdate;
