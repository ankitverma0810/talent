import React from "react";
import * as H from "history";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import TextInput from "../../components/Form/Text/Text";
import SelectInput from "../../components/Form/Select/Select";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
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

interface PerformanceCreateProps extends RouteComponentProps<{ id: string }> {}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
	})
);

const PerformanceCreate: React.FC<PerformanceCreateProps> = ({
	history,
	match,
}) => {
	const classes = useStyles();
	const [employee, setEmployee] = React.useState<Employee | undefined>();
	const { data } = useTypedSelector((state) => state.employees);
	const { createPerformance } = useActions();

	React.useEffect(() => {
		let employee = data.find((record) => record.id === match.params.id);
		if (employee) {
			setEmployee(employee);
		} else {
			history.push("/employees");
		}
	}, [history, match]);

	const submitHandler = (values: any) => {
		createPerformance(employee?.id!, values);
	};

	const ratings = [
		{
			label: "Below Expectation",
			value: "Below Expectation",
		},
		{
			label: "Met Expectation",
			value: "Met Expectation",
		},
		{
			label: "Exceed Expectation",
			value: "Exceed Expectation",
		},
	];

	const render = (
		<Container maxWidth="xl" className="py-2">
			<Typography variant="h4" className="pb-2">
				Performance Review - {employee?.firstname} {employee?.lastname}
			</Typography>

			<Formik
				initialValues={{
					rating: "",
					feedback: "",
				}}
				validationSchema={Yup.object({
					rating: Yup.string().required("Required"),
					feedback: Yup.string().required("Required"),
				})}
				onSubmit={submitHandler}
			>
				{(props) => {
					return (
						<Form className={classes.root}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<TextInput
										multiline
										label="Feedback*"
										name="feedback"
									/>
								</Grid>
								<Grid item xs={12}>
									<SelectInput
										label="Rating*"
										name="rating"
										options={ratings}
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
									>
										Submit
									</Button>
								</Grid>
							</Grid>
						</Form>
					);
				}}
			</Formik>
		</Container>
	);

	return employee ? render : null;
};

export default PerformanceCreate;
