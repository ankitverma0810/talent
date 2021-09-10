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

import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { RoleType } from "../../config";

interface EmployeeListProps {
	history: History;
}

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 700,
	},
}));

const EmployeeList: React.FC<EmployeeListProps> = ({ history }) => {
	const classes = useStyles();
	const { data, error, loading } = useTypedSelector(
		(state) => state.employees
	);
	const { user } = useTypedSelector((state) => state.auth);
	const { fetchEmployees } = useActions();

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
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((employee) => (
							<TableRow
								key={employee.id}
								onClick={() =>
									history.push(`/employees/${employee.id}`)
								}
							>
								<TableCell component="th" scope="row">
									{employee.firstname} {employee.lastname}
								</TableCell>
								<TableCell>{employee.email}</TableCell>
								<TableCell>{employee.designation}</TableCell>
								<TableCell>{employee.role}</TableCell>
								<TableCell>{employee.reportsTo}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
};

export default EmployeeList;
