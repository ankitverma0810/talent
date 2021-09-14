import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import TextInput from "../../components/Form/Text/Text";
import PasswordInput from "../../components/Form/Password/Password";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Signup: React.FC = () => {
	const classes = useStyles();
	const { error, loading } = useTypedSelector((state) => state.auth);
	const { signUp } = useActions();

	const submitHandler = (values: {
		firstname: string;
		lastname: string;
		email: string;
		password: string;
	}) => {
		signUp(values.firstname, values.lastname, values.email, values.password);
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>

				<Formik
					initialValues={{
						firstname: "",
						lastname: "",
						email: "",
						password: "",
					}}
					validationSchema={Yup.object({
						firstname: Yup.string().required("Required"),
						lastname: Yup.string().required("Required"),
						email: Yup.string().required("Required"),
						password: Yup.string().required("Required"),
					})}
					onSubmit={submitHandler}
				>
					<Form data-test="login-form">
						<TextInput label="Firstname*" name="firstname" />
						<TextInput label="Lastname*" name="lastname" />
						<TextInput label="Email*" name="email" />
						<PasswordInput label="Password*" name="password" />

						{error
							? error.map((err) => (
									<Typography
										key={err.message}
										color="error"
										variant="body1"
									>
										{err.message}
									</Typography>
							  ))
							: null}

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							disabled={loading}
							className={classes.submit}
						>
							{loading ? "Signing Up..." : "Sign Up"}
						</Button>

						<Grid container>
							<Grid item>
								<Typography>
									<Link to="/signin">
										{"Already have an account? Sign in"}
									</Link>
								</Typography>
							</Grid>
						</Grid>
					</Form>
				</Formik>
			</div>
		</Container>
	);
};

export default Signup;
