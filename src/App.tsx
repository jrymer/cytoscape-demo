import React from "react";
import cytoscape from "cytoscape";

function App() {
  React.useEffect(() => {
    const cy = cytoscape({
      container: document.getElementById("cy"),
      elements: [
        // list of graph elements to start with
        {
          // node a
          data: { id: "a" },
        },
        {
          // node b
          data: { id: "b" },
        },
        {
          // edge ab
          data: { id: "ab", source: "a", target: "b", lineStyle: "dashed" },
        },
      ],
      style: [
        // the stylesheet for the graph
        {
          selector: "node",
          style: {
            "background-color": "#666",
            label: "data(id)",
          },
        },

        {
          selector: "edge",
          style: {
            width: 3,
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "target-arrow-shape": "triangle",
            "curve-style": "bezier",
            "line-style": "data(lineStyle)" as cytoscape.Css.LineStyle, // If we don't type cast here, we get: Type '"data(lineStyle)"' is not assignable to type 'PropertyValueEdge<LineStyle> | undefined'
          },
        },
      ],

      layout: {
        name: "grid",
        rows: 1,
      },
    });

    /** 
     * I am trying to achieve function syntax in the stylesheet to hopefully skirt around the above type casting I am forced to do.
     * Using the example code found here: https://js.cytoscape.org/#style the following should be possible (and would hopefully be fully typed)
        style: cytoscape.stylesheet()
          .selector('node')
            .style({
              'background-color': function( ele ){ return ele.data('bg') }
          })
     * cy.style().selector and cytoscape().style().selector returns a string
     * import {stylesheet} from 'cytoscape' yields '"cytoscape"' has no exported member named 'stylesheet'. Did you mean 'Stylesheet'? Which is the interface
     * cy.stylesheet() does not exist
     * 
     * https://js.cytoscape.org/#cy.style suggests cy.style().selector() should be a function that accepts a string
     * cytoscape/index.d.ts CoreStyle says selector is a string
    */
  }, []);

  return <div id="cy" style={{ height: "100vh", width: "100%" }} />;
}

export default App;
