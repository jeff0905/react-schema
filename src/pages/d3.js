/* eslint-disable */
import React from 'react';

import * as d3 from "d3";
import * as scale from 'd3-scale';

class D3Schema extends React.Component {
    
    componentDidMount() {
        // var node = d3.select(this.node);
        var p = 40;
        var w = 960,
            h= 500,
            p= 40,//内边距
            x= scale.scaleLinear().domain([0, 1]).range([p, w - p]), //(2) 定义x和y比例尺
            y= scale.scaleLinear().domain([0, 1]).range([h - p, p]);

        var svg = d3.select(this.page)
            .append("svg")
            .attr("width", 960)
            .attr("height", 800)
        var x = scale.scaleLinear().domain([0,1]).range([p, w - p]);
        var grid = svg.selectAll(".grid")
            .data(x.ticks(10))
            .enter().append("g")
            .attr("class", "grid");

        var t = d3.select(this.page).selectAll(".node").text('abc');
    }
    render() {
        return (
            <div style={{position:'absolute', top: 64}}>
                <div  ref={(r) => this.page=r} >
                        
                <div className="node">
                        <ul>
                            <li>
                                asdf
                            </li>
                        </ul>
                </div>
                <p>1234</p>
                </div>
            </div>
        )
    }
}

export default D3Schema;