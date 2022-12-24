import React from 'react'
import { Button, ButtonProps, FormControl } from "@mui/material";
import clsx from "clsx";
import { FunctionComponent } from "react";
import classes from '../assets/scss/modules/CustomButton.module.scss';

const CustomButton: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
    return (
        <FormControl className={clsx(classes.wrap)} fullWidth={props.fullWidth}>
            <Button className={clsx(classes.button)} {...props}>{props.children}</Button>
        </FormControl>
    );
}

export default CustomButton;
