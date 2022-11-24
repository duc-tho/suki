import ToolItem from "../components/ToolItem";
import { ROUTES_INFO } from "../routes/RoutesInfo";
const tikdownThumbnail = require('../assets/images/icons/tikdown-icon.png');

type TikdownType = {
    label: string,
    description: string,
    thumbnail: string,
    href: string
}

type ToolList = {
    tikdown: TikdownType
}

export default function Tool() {
    const toolList: ToolList = {
        tikdown: {
            label: 'Tikdown',
            description: 'Tiktok downloader by ntho',
            thumbnail: tikdownThumbnail,
            href: `/${ROUTES_INFO.TOOL.path}/${ROUTES_INFO.TIKTOK_DOWNLOADER.path}`
        }
    }

    return (
        <>
            <ToolItem data={toolList.tikdown} />
        </>
    )
}
