import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import FormModal from './Modal';
import SVGDrawer from './SWGDrawer.js';
import Layout from './SVGComponent';

import {useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRaspored } from '../actions/raspored';
const nodes = [];


/**
 * Convert DOM coordinates to SVG coordinates based on SVG offset and zoom level
 */
const convertCoordinatesDOMtoSVG = (svg, x, y) => {
  const pt = svg.node().createSVGPoint();

  pt.x = x;
  pt.y = y;


  return pt.matrixTransform(svg.node().getScreenCTM().inverse());
};

const SVGArea = ({ draggedData }) => {

    const { state } = useLocation();
    const [stolovi, setStolovi] = useState();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    useEffect( () => {
        const getData = async() => {
             
                try{
                    
                  let res = await dispatch(getRaspored(1));
                  res = await res.data;
        
                  console.log(res);
                  setStolovi(res.sto.map(el => {
                      console.log(el);
                      return({id: el.id,name: el.naziv, x: parseFloat(el.x), y: parseFloat(el.y), setOpen: handleOpen});
                  }));

                //   setStolovi(res);
                  setLoading(false);
                  }
                  catch(error)
                  {
                      const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                 
                  setStolovi(_content);
                  }
  
       }
  
       return getData();
      }, [])

 useEffect(() => {
     if(!loading)
        SVGDrawer.draw(stolovi);

 }, [loading]);
 
  const onDragOver = (e) => {
    e.preventDefault();
    d3.select("#svg").classed("drag-over", true);
  };

  const onDragLeave = () => {
    d3.select("#svg").classed("drag-over", false);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const onDrop = (e) => {
    e.stopPropagation();
    d3.select("#svg").classed("drag-over", false);

    // Get the correct coordinates for this node
    const { x, y } = convertCoordinatesDOMtoSVG(
      d3.select("#svg"),
      e.clientX - draggedData.offset[0],
      e.clientY - draggedData.offset[1]
    );

    // Add the node to the list of nodes.
 
    nodes.push({
      id: nodes.length + 1,
      name: draggedData.dragObject.NazivStola,
      color: draggedData.dragObject.CijenaEUR,
      setOpen: handleOpen,
      x,
      y
    });

    // Redraw the nodes
    SVGDrawer.draw(nodes);

    return false;
  };


  if(loading) return <p> Loading </p>;
  
  return (
    <div
      className="svgContainer"
      onDrop={(e) => onDrop(e)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => onDragOver(e)}
      style={{marginTop: '15vh', marginLeft: '10vw'}}
    >
      <FormModal open={open} setOpen={setOpen} />
      <Layout />
    </div>
  );
};

export default SVGArea;
