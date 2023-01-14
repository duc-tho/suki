import clsx from 'clsx';
import classes from '../assets/scss/modules/TiktokDownloader.module.scss';
import CustomButton from './CustomButton';
import CustomTextField from './CustomTextField';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress } from '@mui/material';

export default function TiktokDownloader() {
    return (
        <div className={clsx(classes.wrap)}>
            <CustomTextField fullWidth placeholder="Paste Tiktok URL here" label="Tiktok Link" />
            <div className={clsx(classes.action)}>
                <CustomButton>
                    <HistoryIcon style={{ width: '1rem' }} />
                </CustomButton>
                <div className={clsx(classes.mainButton)}>
                    <CustomButton fullWidth>
                        <SearchIcon style={{ width: '1rem' }} />
                        &nbsp;
                        Search
                    </CustomButton>
                </div>
                <CustomButton>
                    <ContentPasteIcon style={{ width: '1rem' }} />
                </CustomButton>
            </div>
            <div className={clsx(classes.content)}>
                <CircularProgress size={'1rem'} color="success" />
            </div>
            <span>
                <small className={clsx(classes.author)}>Made by <span>ntho</span> with love.</small>
            </span>
        </div>
    )
}
