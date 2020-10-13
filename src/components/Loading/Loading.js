import React from 'react';
import Lottie from 'react-lottie'
import animationData from '../../assets/lotties/shark'

const Loading = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return ( 
            <Lottie 
	        options={defaultOptions}
            height={350}
            width={350}
            />
     );
}
 
export default Loading;