import LottieView from 'lottie-react-native';
import React from 'react';
import { Platform } from 'react-native';
const Spin = () => {
  if (Platform.OS === 'web') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
          margin: 'auto',
          background: 'none',
          display: 'block',
          shapeRendering: 'auto'
        }}
        height="30px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle cx="84" cy="50" r="10" fill="#222222">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="0.5555555555555556s"
            calcMode="spline"
            keyTimes="0;1"
            values="10;0"
            keySplines="0 0.5 0.5 1"
            begin="0s"
          />
          <animate
            attributeName="fill"
            repeatCount="indefinite"
            dur="2.2222222222222223s"
            calcMode="discrete"
            keyTimes="0;0.25;0.5;0.75;1"
            values="#222222;#222222;#222222;#222222;#222222"
            begin="0s"
          />
        </circle>
        <circle cx="16" cy="50" r="10" fill="#222222">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.2222222222222223s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"
          />
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="2.2222222222222223s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="0s"
          />
        </circle>
        <circle cx="50" cy="50" r="10" fill="#222222">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.2222222222222223s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.5555555555555556s"
          />
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="2.2222222222222223s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-0.5555555555555556s"
          />
        </circle>
        <circle cx="84" cy="50" r="10" fill="#222222">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.2222222222222223s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.1111111111111112s"
          />
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="2.2222222222222223s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.1111111111111112s"
          />
        </circle>
        <circle cx="16" cy="50" r="10" fill="#222222">
          <animate
            attributeName="r"
            repeatCount="indefinite"
            dur="2.2222222222222223s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="0;0;10;10;10"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.6666666666666665s"
          />
          <animate
            attributeName="cx"
            repeatCount="indefinite"
            dur="2.2222222222222223s"
            calcMode="spline"
            keyTimes="0;0.25;0.5;0.75;1"
            values="16;16;16;50;84"
            keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
            begin="-1.6666666666666665s"
          />
        </circle>
      </svg>
    );
  }

  return (
    <LottieView
      style={{
        width: 50,
        height: 30
      }}
      resizeMode="cover"
      autoPlay
      loop
      source={require('../../../assets/lottie/spin.lottie')}
    />
  );
};

export default Spin;
