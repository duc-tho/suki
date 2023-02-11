import { Avatar, Link, Typography } from "@mui/material"
import classes from '../assets/scss/modules/TiktokVideoInfo.module.scss';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useState } from "react";

export type TiktokVideoInfoProps = {
    url: string
    description: string
    author: string
    avatar: string
    music: string
    cover: string
    nwm: string
    wm: string
}

export default function TiktokVideoInfo(props: TiktokVideoInfoProps) {
    const [playPreview, setPlayPreview] = useState(false);

    return (
        <div className={classes.wrap}>
            <div className={classes.content}>
                <div className={classes.author}>
                    <Avatar
                        sx={{ width: 24, height: 24 }}
                        alt={props.author}
                        src={props.avatar}
                    />
                    <Typography className={classes.wrapText} fontWeight={'bold'}>{props.author}</Typography>
                </div>
                <div className={classes.video}>
                    <div className={classes.cover}>
                        {(
                            playPreview
                                ? <video controls autoPlay loop src={props.nwm}></video>
                                : <>
                                    <img src={props.cover} alt={`${props.author} - ${props.description}`}/>
                                    <span onClick={() => { setPlayPreview(true) }}>
                                        <PlayCircleOutlineIcon className={classes.actionIcon} fontSize="small" />
                                    </span>
                                </>
                        )}
                    </div>
                    <div className={classes.info}>
                        <Typography className={classes.description}>
                            <b>Mô tả:</b>
                            &nbsp;
                            {props.description}
                        </Typography>
                        <Typography className={classes.wrapText}>
                            <b>Liên Kết:</b>
                            &nbsp;
                            <Link target="_blank" href={props.url}>{props.url}</Link>
                        </Typography>
                        <Typography className={classes.wrapText}>
                            <b>Nhạc:</b>
                            &nbsp;
                            {props.music}
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    )
}
