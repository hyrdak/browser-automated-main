import {
    AiOutlineFile,
    AiOutlineFlag,
    AiOutlineLink,
    AiOutlineQuestionCircle,
    AiOutlineReload,
    AiOutlineStop
} from 'react-icons/ai';
import { CgScrollV } from 'react-icons/cg';
import { FaCode, FaRegKeyboard } from 'react-icons/fa';
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi';
import { LiaElementor } from 'react-icons/lia';
import { LuFileSpreadsheet, LuMove, LuVariable } from 'react-icons/lu';
import { MdLoop } from 'react-icons/md';
import { PiCursorClick, PiEyeClosedDuotone, PiLinkLight, PiPlugsConnectedThin, PiTextT } from 'react-icons/pi';
import { VscJson } from 'react-icons/vsc';
// Tạo một object chứa các icon
const icons = {
    PiCursorClick: <PiCursorClick />,
    AiOutlineStop: <AiOutlineStop />,
    AiOutlineFlag: <AiOutlineFlag />,
    AiOutlineLink: <AiOutlineLink />,
    AiOutlineReload: <AiOutlineReload />,
    AiOutlineFile: <AiOutlineFile />,
    CgScrollV: <CgScrollV />,
    GiPerspectiveDiceSixFacesRandom: <GiPerspectiveDiceSixFacesRandom />,
    LuMove: <LuMove />,
    AiOutlineQuestionCircle: <AiOutlineQuestionCircle />,
    PiEyeClosedDuotone: <PiEyeClosedDuotone />,
    PiLinkLight: <PiLinkLight />,
    MdLoop: <MdLoop />,
    LiaElementor: <LiaElementor />,
    PiTextT: <PiTextT />,
    FaRegKeyboard: <FaRegKeyboard />,
    VscJson: <VscJson />,
    LuFileSpreadsheet: <LuFileSpreadsheet />,
    FaCode: <FaCode />,
    PiPlugsConnectedThin: <PiPlugsConnectedThin />,
    LuVariable: <LuVariable />
};

type IconBaseProps = {
    name: string;
    size?: number;
    color?: string;
    style?: React.CSSProperties;
};

export const IconsBase = ({ name, style }: IconBaseProps) => {
    if (!icons[name as keyof typeof icons]) return null;

    return icons[name as keyof typeof icons];
};
