import React from "react";
import {Draggable} from "./Draggable";


export  const DraggableBlocks = ({ setDragData, blocks }) => {
    const onDragStart = (dragData) => {
      setDragData(dragData);
    };
  
    const onDragEnd = () => {};
  
    return (
      <div className="dragging-blocks">
        {blocks && blocks.map((b) => (
          <Draggable
            key={b.NazivStola}
            dragObject={b}
            onDragStart={(dragData) => onDragStart(dragData)}
            onDragEnd={() => onDragEnd()}
          >
            <div className="block" style={{ backgroundColor: b.color }}>
              {b.CijenaEUR}
            </div>
          </Draggable>
        ))}
      </div>
    );
  };