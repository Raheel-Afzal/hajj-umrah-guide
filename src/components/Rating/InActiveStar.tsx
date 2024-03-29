import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
}
const InActiveStar: FC<Props> = ({color = '#C5C5C5'}) => {
  return (
    <Svg width={24} height={22} viewBox="0 0 33 30" fill="none">
      <Path
        d="M16.5 0l4.849 9.826 10.843 1.575-7.846 7.648 1.852 10.8-9.698-5.1-9.698 5.1 1.852-10.8-7.846-7.648L11.65 9.826 16.5 0z"
        fill={color}
      />
    </Svg>
  );
};

export default InActiveStar;
