import React from "react";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

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

const Signin: React.FC = () => {
	const classes = useStyles();
	const { error, loading } = useTypedSelector((state) => state.auth);
	const { signIn } = useActions();

	const submitHandler = (values: { email: string; password: string }) => {
		signIn(values.email, values.password);
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>

				<Formik
					initialValues={{
						email: "",
						password: "",
					}}
					validationSchema={Yup.object({
						email: Yup.string().required("Required"),
						password: Yup.string().required("Required"),
					})}
					onSubmit={submitHandler}
				>
					<Form>
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
							{loading ? "Signing In..." : "Sign In"}
						</Button>

						<Grid container>
							<Grid item>
								<Typography>
									<Link to="/signup">
										{"Don't have an account? Sign Up"}
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

export default Signin;
