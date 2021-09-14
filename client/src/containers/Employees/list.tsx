import React from "react";
import { History } from "history";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { RoleType } from "../../config";
import { Employee } from "../../store/actions/employee";

interface EmployeeListProps {
	history: History;
}

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 700,
	},
}));

const options = [
	{
		label: "View",
		url: "/employees",
	},
	{
		label: "Provide Feedback",
		url: "/performance",
	},
];

const ITEM_HEIGHT = 48;

const EmployeeList: React.FC<EmployeeListProps> = ({ history }) => {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const { data } = useTypedSelector((state) => state.employees);
	const { user } = useTypedSelector((state) => state.auth);
	const { fetchEmployees } = useActions();

	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	React.useEffect(() => {
		fetchEmployees();
	}, []);

	return (
		<Container className="py-2">
			<div className="d-flex justify-content-between">
				<Typography variant="h4">List of Employees</Typography>
				{user.role === RoleType.Admin ? (
					<Button
						component={Link}
						to="/employees/create"
						variant="contained"
						color="secondary"
						style={{ marginBottom: "20px" }}
					>
						Add Employee
					</Button>
				) : null}
			</div>

			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Designation</TableCell>
							<TableCell>Role</TableCell>
							<TableCell>Manager</TableCell>
							<TableCell>Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((employee) => (
							<TableRow key={employee.id}>
								<TableCell component="th" scope="row">
									{employee.firstname} {employee.lastname}
								</TableCell>
								<TableCell>{employee.email}</TableCell>
								<TableCell>{employee.designation}</TableCell>
								<TableCell>{employee.role}</TableCell>
								<TableCell>
									{employee &&
										employee.reportsTo &&
										employee.reportsTo.firstname +
											" " +
											employee.reportsTo.lastname}
								</TableCell>
								<TableCell>
									<IconButton
										key={employee.id}
										id={employee.id}
										aria-label="more"
										aria-controls="long-menu"
										aria-haspopup="true"
										onClick={handleClick}
									>
										<MoreVertIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: "20ch",
					},
				}}
			>
				{options.map((option) => (
					<MenuItem
						key={option.label}
						onClick={() => {
							let url = `${option.url}/${anchorEl?.id!}`;
							history.push(url);
						}}
					>
						{option.label}
					</MenuItem>
				))}
			</Menu>
		</Container>
	);
};

export default EmployeeList;
