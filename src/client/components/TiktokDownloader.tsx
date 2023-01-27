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
    const [tiktokUrl, setTiktokUrl] = useState('');
    const [tiktokVideoInfo, setTiktokVideoInfo] = useState<TiktokVideoInfoProps>();
    const [isOnLoading, setisOnLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handletiktokUrlChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setTiktokUrl(event.target.value);
    }

    const downloadHandle = async () => {
        setisOnLoading(true);

        Axios({
            url: tiktokUrl,
            method: "GET",
            responseType: "blob",
            headers: {
                "Content-type": "application/octet-stream"
            }
        }).then(response => {
            let link = document.createElement("a");

            link.target = "_blank";
            link.download = `${new Date().getTime()}.mp4`;
            link.href = URL.createObjectURL(
                new Blob([response.data], { type: "video/mp4" })
            );
            link.download = "";
            link.click();
            link.remove();

            setTimeout(() => {
                enqueueSnackbar("Tải video thành công", { variant: 'success' });
                setisOnLoading(false);
            }, 4000);
        });
    }

    const searchHandle = async () => {
        setisOnLoading(true);
        setTiktokVideoInfo(undefined);
        const results: ApiResponse<TiktokVideoInfoProps> = await Axios.get('/tiktok', {
            params: {
                url: tiktokUrl
            }
        });

        if (!results) {
            enqueueSnackbar('Faild to get video info.', { variant: 'error' });
            setisOnLoading(false);
            return;
        }

        if (results.code && results.code >= 400) {
            enqueueSnackbar(results.message, { variant: 'error' });
            setisOnLoading(false);
            return;
        }

        setTiktokVideoInfo(results.data);
        setisOnLoading(false);
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
                    <CustomButton fullWidth disabled={isOnLoading} onClick={searchHandle}>
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
                {isOnLoading ? <CircularProgress size={'1rem'} color="success" /> : tiktokVideoInfo ? (
                    <TiktokVideoInfo {...tiktokVideoInfo} />
                ) : (
                    <Typography variant='subtitle1' color={'GrayText'}>
                        Nhập link tiktok và ấn "Search"
                    </Typography>
                )}
            </div>
            <CustomButton onClick={downloadHandle} disabled={!tiktokVideoInfo} fullWidth>
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
