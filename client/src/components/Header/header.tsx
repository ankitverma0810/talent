import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

interface HeaderProps {
	isAuthenticated: boolean;
}

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
	const classes = useStyles();

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						Talent Central
					</Typography>
					<Button component={Link} to="/signout" color="inherit">
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default Header;
