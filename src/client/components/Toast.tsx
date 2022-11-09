import { Alert, Snackbar } from "@mui/material";
import { FunctionComponent } from "react";
import { useSelector } from "../store/hooks";
import { selectToast } from "../store/slices/ToastSlice";

const Toast: FunctionComponent = () => {
    const { open, message, type } = useSelector(selectToast);

    return (
        <Snackbar open={open}>
            <Alert severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default Toast;
