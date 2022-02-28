import React, {useRef, useState, useEffect} from 'react';
import { ReactComponent as DiamondLayout } from '../static/Asset 1.svg'
import LayoutComponent from './SVGComponent';

export default function Layout() {

//   const layoutRef = useRef(null);


//   const translateCoords = (x, y) => 
//   {
//     const svgX = (clientX - svgElementLeft) * viewBoxWidth / svgElementWidth
//     const svgY = (clientY - svgElementTop) * viewBoxHeight / svgElementHeight;

//     return [svgX, svgY];
//   } 

//   useEffect(() => {
//     const $layoutRef = layoutRef.current

   
//     if ( !$layoutRef ) return;
    
//     const handleMouseMove = (e) => {
// 		  const { clientX, clientY } = e;
// 			  /* Translate coordinate from window to svg, omitted for brevity */
// 	    //   const [x, y] = translateCoords(clientX, clientY)
// 	      $layoutRef.setAttribute('cx', clientX);
// 	      $layoutRef.setAttribute('cy', clientY);

        

//           console.log(clientX, clientY);
// 	    }

// 	    window.addEventListener("mousemove", handleMouseMove)
// 	    return () => {
// 		    window.removeEventListener("mousemove", handleMouseMove)
// 	    }
//   })

  return (
    <div>
       
         <LayoutComponent  />
       
       </div>);
}
