import React from 'react'
import { TextField, TextFieldProps } from "@mui/material";
import clsx from "clsx";
import { FunctionComponent } from "react";
import classes from '../assets/scss/modules/CustomTextField.module.scss';

const CustomTextField: FunctionComponent<TextFieldProps> = (props) => {
    return (
        <div className={clsx(classes.wrap)}>
            <TextField className={clsx(classes.input)} size="small" {...props} />
        </div>
    );
}

export default CustomTextField;
