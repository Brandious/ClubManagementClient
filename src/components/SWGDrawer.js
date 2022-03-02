import * as d3 from "d3";

/**
 * Draw the nodes.
 * Each time this is called we only draw the added nodes since we are using "enter" only
 */


class SVGDrawer {
  static draw(nodes) {
    d3.select("#svg")
      .selectAll(".node")
      .data(nodes, (d) => d.id)
      .join((enter) => {
        // Draw a group node that will contain the squre and the text
        const node = enter
          .append("g")
          .attr("class", "node")
          .attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
          .on('click', () => {
            
            console.log(nodes[0]);
            nodes[0].setOpen();  
          })


        // Append the squre
        node
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 25)
          .attr("height", 25)
          .attr("rx", 50)
          .attr("fill", 'green')
          
        // Append the text
        node
          .append("text")
          .style("font-size", "10px")
          .attr("x", 13)
          .attr("y", 13)
          .attr("width", 15)
          .attr("dominant-baseline", "middle")
          .attr("text-anchor", "middle")
          .text((d) => d.name);
      });
  }
}

export default SVGDrawer;
