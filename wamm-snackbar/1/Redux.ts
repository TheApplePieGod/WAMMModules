export enum SnackbarStatus {
    Closed = 0,
    Error = 1,
    Success = 2,
    Warning = 3,
    Info = 4
}

export interface SnackbarState {
    status: SnackbarStatus;
    message: string;
    closeDelay: number;
}

export interface OpenSnackbarAction {
    type: "OPEN_SNACKBAR";
    status: number;
    message: string;
    closeDelay: number;
}

export interface CloseSnackbarAction {
    type: "CLOSE_SNACKBAR";
}

export function openSnackbar(status: SnackbarStatus, message: string, closeDelay: number): OpenSnackbarAction {
    return {
        type: "OPEN_SNACKBAR",
        status: status,
        message: message,
        closeDelay: closeDelay
    }
}

export function closeSnackbar(): CloseSnackbarAction {
    return {
        type: "CLOSE_SNACKBAR",
    }
}