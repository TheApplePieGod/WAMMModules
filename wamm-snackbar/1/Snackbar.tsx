import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarState, SnackbarStatus, closeSnackbar } from "./Redux";

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
    stateSelector: (reduxState: any) => SnackbarState;
}

const _GlobalSnackbar = (props: Props) => {
    const dispatch = useDispatch();

    const { status, message, closeDelay } = useSelector(props.stateSelector);

    const handleClose = () => {
        dispatch(closeSnackbar());
    }

    let severity: any = "info";
    switch (status) {
        case SnackbarStatus.Error:
            severity = "error";
            break;
        case SnackbarStatus.Warning:
            severity = "warning";
            break;
        case SnackbarStatus.Info:
            severity = "info";
            break;
        case SnackbarStatus.Success:
            severity = "success";
            break;
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center"
            }}
            open={status != SnackbarStatus.Closed}
            autoHideDuration={closeDelay}
            onClose={(event, reason) => { if (reason != "clickaway") handleClose(); }}
        >
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export const GlobalSnackbar = React.memo(_GlobalSnackbar);