import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BackButton = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fill="#FFFFFF"
      d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
    />
    <Path
      fill="#FFFFFF"
      d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
    />
  </Svg>
);
export default BackButton;
