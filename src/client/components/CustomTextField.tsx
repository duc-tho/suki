import { FormControl, TextField, TextFieldProps } from "@mui/material";
import clsx from "clsx";
import { FunctionComponent } from "react";
import classes from '../assets/scss/modules/CustomTextField.module.scss';

const CustomTextField: FunctionComponent<TextFieldProps> = (props) => {
    return (
        <FormControl className={clsx(classes.wrap)} fullWidth={props.fullWidth}>
            <TextField className={clsx(classes.input)} size="small" {...props} />
        </FormControl>
    );
}

export default CustomTextField;
