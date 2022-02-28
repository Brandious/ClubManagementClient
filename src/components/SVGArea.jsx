import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import FormModal from './Modal';
import SVGDrawer from './SWGDrawer.js';
import Layout from './SVGComponent';

import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import {createRaspored} from '../actions/raspored';
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

const SVGArea = ({ draggedData, event }) => {


  const dispatch = useDispatch();



  useEffect(() => {
    SVGDrawer.draw(nodes);
  }, []);

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
      NazivStola: draggedData.dragObject.NazivStola,
      CijenaEur: draggedData.dragObject.CijenaEUR,
      CijenaKuna: draggedData.dragObject.CijenaKuna,
      KategorijaStola:  draggedData.dragObject.KategorijaStola,
      PotrosnjaStola: draggedData.dragObject.PotrosnjaStola,
      eventId: event,
      setOpen: handleOpen,
      x,
      y
    });

    // Redraw the nodes
    SVGDrawer.draw(nodes);

    return false;
  };

  console.log(draggedData);

  const handleSaveRaspored = async(e) => {
   
    e.preventDefault();
    console.log(nodes);
    // console.log(stolovi);
    await dispatch(createRaspored(1, nodes));
    alert("Raspored Kreiran");
  }
  
  return (
    <div
      className="svgContainer"
      onDrop={(e) => onDrop(e)}
      onDragLeave={(e) => onDragLeave(e)}
      onDragOver={(e) => onDragOver(e)}
    >
      <FormModal open={open} setOpen={setOpen} />
      <Layout />
      
      <Button variant="contained" onClick={handleSaveRaspored} >
            Spremi Raspored
         </Button>
    </div>
  );
};

export default SVGArea;
