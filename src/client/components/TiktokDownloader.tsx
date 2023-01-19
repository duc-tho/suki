import clsx from 'clsx';
import classes from '../assets/scss/modules/TiktokDownloader.module.scss';
import CustomButton from './CustomButton';
import CustomTextField from './CustomTextField';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import HistoryIcon from '@mui/icons-material/History';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress, Typography } from '@mui/material';
import { ApiResponse, Axios } from '../services/api/Axios';
import { ChangeEvent, useState } from 'react';
import { useSnackbar } from 'notistack';
import DownloadingIcon from '@mui/icons-material/Downloading';
import TiktokVideoInfo, { TiktokVideoInfoProps } from './TiktokVideoInfo';

export default function TiktokDownloader() {
    const [ tiktokUrl, setTiktokUrl ] = useState('');
    const [ tiktokVideoInfo, setTiktokVideoInfo ] = useState<TiktokVideoInfoProps>();
    const [ isOnSearch, setIsOnSearch ] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handletiktokUrlChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTiktokUrl(event.target.value);
    }

    const searchHandle = async () => {
        setIsOnSearch(true);
        const results: ApiResponse<TiktokVideoInfoProps> = await Axios.get('/tiktok', { params: {
            url: tiktokUrl
        }});

        if (!results) {
            enqueueSnackbar('Faild to get video info.', { variant: 'error' });
            setIsOnSearch(false);
            return;
        }

        if (results.code && results.code >= 400) {
            enqueueSnackbar(results.message, { variant: 'error' });
            setIsOnSearch(false);
            return;
        }

        setTiktokVideoInfo(results.data);
        setIsOnSearch(false);
    }

    return (
        <div className={clsx(classes.wrap)}>
            <CustomTextField
                fullWidth
                placeholder="Paste Tiktok URL here"
                label="Tiktok Link"
                value={tiktokUrl}
                onChange={handletiktokUrlChange}
            />
            <div className={clsx(classes.action)}>
                <CustomButton>
                    <HistoryIcon style={{ width: '1rem' }} />
                </CustomButton>
                <div className={clsx(classes.mainButton)}>
                    <CustomButton fullWidth onClick={searchHandle}>
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
                {isOnSearch ?  <CircularProgress size={'1rem'} color="success" /> : tiktokVideoInfo ? (
                    <TiktokVideoInfo {...tiktokVideoInfo} />
                ) : (
                    <Typography variant='subtitle1' color={'GrayText'}>
                        Nhập link tiktok và ấn "Search"
                    </Typography>
                )}
            </div>
            <CustomButton fullWidth>
                <DownloadingIcon style={{ width: '1rem' }} />
                &nbsp;
                Download
            </CustomButton>
            <span>
                <small className={clsx(classes.author)}>Made by <span>ntho</span> with love.</small>
            </span>
        </div>
    )
}
