import { makeStyles } from "@material-ui/core/styles";

const useGlobalStyles = makeStyles((theme) => ({
	"@global": {
		".padding-0": {
			padding: "0",
		},
		".margin-0": {
			margin: "0",
		},
		".text-center": {
			textAlign: "center",
		},
		".w-100": {
			width: "100%",
		},
		".font-weight-bold": {
			fontWeight: "bold",
		},
		".d-flex": {
			display: "flex",
		},
		".flex-column": {
			flexDirection: "column",
		},
		".align-items-end": {
			alignItems: "flex-end",
		},
		".justify-content-between": {
			justifyContent: "space-between",
		},
		".pt-1": {
			paddingTop: "1rem"
		},
		".pb-1": {
			paddingBottom: "1rem"
		},
		".py-1": {
			paddingTop: "1rem",
			paddingBottom: "1rem"
		},
		".pt-2": {
			paddingTop: "1.5rem"
		},
		".pb-2": {
			paddingBottom: "1.5rem"
		},
		".py-2": {
			paddingTop: "1.5rem",
			paddingBottom: "1.5rem"
		},
		a: {
			textDecoration: "none",
		},
	},
}));

export default useGlobalStyles;
