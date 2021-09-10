import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import PeopleIcon from "@material-ui/icons/People";

interface SidebarProps {
	open: boolean;
	onClose: Function
}

const useStyles = makeStyles({
	list: {
		width: 250,
	},
});

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
	const classes = useStyles();

	const redirectTo = (menu: string) => {
		//history.push(menu);
		onClose();
	};

	return (
		<Drawer open={open} onClose={(event) => onClose(event)}>
			<List className={classes.list}>
				<ListItem button onClick={() => redirectTo("employees")}>
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Employees" />
				</ListItem>
				<Divider />
				<ListItem button onClick={() => redirectTo("admin")}>
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Admin" />
				</ListItem>
			</List>
		</Drawer>
	);
};

export default Sidebar;
