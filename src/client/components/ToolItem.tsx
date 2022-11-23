import { Link as MuiLink } from "@mui/material";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import classes from '../assets/scss/modules/ToolItem.module.scss';

type ToolItemProps = {
    data: {
        label: string,
        description: string,
        thumbnail: string,
        href: string
    }
}

const ToolItem: FunctionComponent<ToolItemProps> = ({ data }) => {

    return (
        <MuiLink sx={{ textDecoration: 'none' }} to={data.href} component={Link}>
            <div className={classes.wrap}>
                <div className={classes.thumbnail}>
                    <img src={data.thumbnail} alt={data.label} />
                </div>
                <div className={classes.content}>
                    <div className={classes.label}>{data.label}</div>
                    <div className={classes.description}>{data.description}</div>
                </div>
            </div>
        </MuiLink>
    );
}

export default ToolItem;
