import React from 'react'
import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";
import { FunctionComponent } from "react";
import classes from '../assets/scss/modules/CustomButton.module.scss';

const CustomButton: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
    return (
        <div className={clsx(classes.wrap)}>
            <Button className={clsx(classes.button)} {...props}>{props.children}</Button>
        </div>
    );
}

export default CustomButton;
