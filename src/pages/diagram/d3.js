/* eslint-disable */
import React from 'react';
// import CSSModules from 'react-css-modules';

import * as d3 from "d3";
import { drag } from "d3-drag";
import "d3-scale";
import styles from './d3.less';


export default class D3Page extends React.Component {

    componentDidMount() {
        this.drag();
    }
    init2() {
        var data = {
            "name": "A1",
            "children": [
              {
                "name": "B1",
                "children": [
                  {
                    "name": "C1",
                    "value": 100
                  },
                  {
                    "name": "C2",
                    "value": 300
                  },
                  {
                    "name": "C3",
                    "value": 200
                  }
                ]
              },
              {
                "name": "B2",
                "value": 200
              }
            ]
          };
          function showArrayElements(data, title) {
            d3.select('#canvas')
              .append('div')
              .html('<span>' + title + '</span>: ' + data.map(function(d) {return d.data.name;}).join(', '))
          }
          
          function showLinkArrayElements(data, title) {
            d3.select('#canvas')
              .append('div')
              .html('<span>' + title + '</span>: ' + data.map(function(d) {return d.source.data.name + ' -> ' + d.target.data.name;}).join(', '))
          }
          
          var root = d3.hierarchy(data)
          
          var ancestors = root.children[0].children[1].ancestors()
          var descendants = root.descendants()
          var leaves = root.leaves()
          var path = root.path(root.children[0].children[1])
          var links = root.links()
          
          //showArrayElements(ancestors, "root.children[0].children[1].ancestors()")
          //showArrayElements(descendants, "root.descendants()")
          //showArrayElements(leaves, "root.leaves()")
          //showArrayElements(path, "root.path(root.children[0].children[1])")
          //showLinkArrayElements(links, "root.links()")
          
          function showTable(data,title) {
              const tableEle = document.querySelectorAll('table');
              console.log(tableEle);
            //   const table = d3.selectAll('.table');
            //   console.log(table.html());
            //   const tablename = d3.select('.table-name');
            //   const name_icon1 = d3.select('.table-name .icon1')
            //   const name_icon2 = d3.select('.table-name .icon2')
            //   const name_span = d3.select('.')
            //   console.log(noDom);

          }
    }
    drag() {
      
		var drag = d3.drag()
						.on("drag", dragmove); 
						
		function dragmove(d) {	
			d3.select(this)
			  .attr("cx", d.cx = d3.event.x )
			  .attr("cy", d.cy = d3.event.y );
		}
        var circles = [ { cx: 150, cy:200, r:30 },
            { cx: 250, cy:200, r:30 },];

        var svg = d3.select("#canvas");

        svg.selectAll(".table")
        .data(circles)
        .enter()
        .append("div")
        .attr('class', 'table')
        .attr("cx",function(d){ return d.cx; })
        .attr("cy",function(d){ return d.cy; })
        .attr("r",function(d){ return d.r; })
        .attr("fill","black")
        .call(drag);  //这里是刚才定义的drag行为
    }
    init3() {
        var canvas = d3.select("canvas"),
    context = canvas.node().getContext("2d"),
    width = canvas.property("width"),
    height = canvas.property("height"),
    radius = 32;

var circles = d3.range(20).map(function(i) {
  return {
    index: i,
    x: Math.round(Math.random() * (width - radius * 2) + radius),
    y: Math.round(Math.random() * (height - radius * 2) + radius)
  };
});

// var color = d3.scaleOrdinal()
//     .range(d3.schemeCategory20);

render();

canvas.call(d3.drag()
    .subject(dragsubject)
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
    .on("start.render drag.render end.render", render));

function render() {
  context.clearRect(0, 0, width, height);
  for (var i = 0, n = circles.length, circle; i < n; ++i) {
    circle = circles[i];
    context.beginPath();
    context.moveTo(circle.x + radius, circle.y);
    context.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
    // context.fillStyle = color(circle.index);

    context.fill();
    if (circle.active) {
      context.lineWidth = 2;
      context.stroke();
    }
  }
}

function dragsubject() {
  for (var i = circles.length - 1, circle, x, y; i >= 0; --i) {
    circle = circles[i];
    x = circle.x - d3.event.x;
    y = circle.y - d3.event.y;
    if (x * x + y * y < radius * radius) return circle;
  }
}

function dragstarted() {
  circles.splice(circles.indexOf(d3.event.subject), 1);
  circles.push(d3.event.subject);
  d3.event.subject.active = true;
}

function dragged() {
  d3.event.subject.x = d3.event.x;
  d3.event.subject.y = d3.event.y;
}

function dragended() {
  d3.event.subject.active = false;
}

    }
    // 1 by 1
    insert1(tablename, columsn) {
        
        const table = d3.select('#canvas').append('div').attr('class', 'table')

        // const tableName = table
        //   .append('div')
        //   .attr('class', 'table-name');
        // tableName.append('i').attr('class', 'icon1');
        // tableName.append('span').text('tableName');
        // tableName.append('i').attr('class', 'icon2');

        // const tableColumns = table.append('div').attr('class', 'table-columns');
        // const tableColumn = tableColumns.append('div').attr('class', 'table-column');
        // tableColumn.append('i').attr('class', 'icon1');
        // tableColumn.append('span').text('columnName');
        // tableColumn.append('i').attr('class', 'icon2');
        
    }
    init() {
        // function zoomFn() { const { translate, scale } = d3.event; container.attr('transform', 'translate(' + translate + ')scale(' + scale * initScale + ')'); } function dragstartFn(d) { draging = true; d3.event.sourceEvent.stopPropagation(); force.start(); } function dragFn(d) { draging = true; d3.select(this) .attr('cx', d.x = d3.event.x) .attr('cy', d.y = d3.event.y); } function dragendFn(d) { draging = false; force.stop(); }
       
        // const force = d3.layout.force()
        //     .size(['100%', '100%'])
        //     .linkDistance(400)
        //     .charge(-2000);
        
        // // zoom
        // const zomm = d3.behavior.zoom()
        //             .scaleExtent([0.25, 2])
        //             .on('zoom', zoomFn);
        
        // const drag = force.drag()
        //     .origin(d => d)
        //     .on('dragstart', dragstartFn)
        //     .on('drag', dragFn)
        //     .on('dragend', dragendFn)
        const width = 800,
              height = 600,
              initScale = 0.6;
        const svg = d3.select('#canvas')
            .append('svg')
            .attr('width', '100%')
            .attr('height', '100%')
            .append('g')
            // .call(zoom)
            .on('dblclick.zoom', null);
        // 缩放层（位置必须在 container 之前）
        const zoomOverlay = svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'none')
        .style('pointer-events', 'all');
        const container = svg.append('g')
            .attr('transform', 'scale(' + initScale + ')')
            .attr('class', 'container');
            
        const data = require('./node.json');
        console.log('data', data);

        const { nodes, relations }  = data;
        const nodeLen = nodes.length;
        const nodeMap = this.genNodesMap(nodes);
        const node = d3.values(nodeMap);
        const linkMap = this.genLinkMap(relations);
        const links = this.genLinks(relations, linkMap, nodeMap);
        console.log('d3.layout', d3);
    }

    genNodesMap(nodes) {
        const hash = {};
        nodes.map(({id, name, type}) => {
            hash[id] = {
                id,
                name,
                type,
            }
        })
        return hash;
    }

    genLinkMap(relations) {
        const hash = {};
        relations.map(({startNode, endNode, label}) => {
            const key = `${startNode}-${endNode}`;
            if (hash[key]) {
                hash[key] += 1;
                hash[`${key}-label`] = ', ' + label;
            } else {
                hash[key] = 1;
                hash[`${key}-label`] = label;
            }
        })
        return hash;
    }

    genLinks(relations, linkMap, nodesMap) {
        const indexHash = {};
    
        return relations.map(function ({
            id,
            startNode,
            endNode,
            label,
            type
        }, i) {
            const linkKey = startNode + '-' + endNode;
            const count = linkMap[linkKey];
            if (indexHash[linkKey]) {
                indexHash[linkKey] -= 1;
            } else {
                indexHash[linkKey] = count - 1;
            }
    
            return {
                id,
                source: nodesMap[startNode],
                target: nodesMap[endNode],
                label,
                type,
                labels: linkMap[linkKey + '-label'],
                count: linkMap[linkKey],
                index: indexHash[linkKey]
            }
        })
    }
    
    handledrag = (e)  => {
        console.log('begin drag', e);
    }
    handledrop = (e) => {
        e.persist();
        console.log('drop', e);
        this.handleCreateGroup(e);
    }
    allowDrop = (e) => {
        e.persist();
        console.log('allowDrop', e);
        e.preventDefault();
    }
    handleCreateGroup = (e) => {
        console.log(
            d3.select("#canvas"))
        d3.select("#canvas")
            .selectAll('.node')
            .data([{x:0, y:0}])
            .enter()
            .append('g')
            .attr("transform",function(d,i){
                console.log(d, i, arguments);
    			// var cirX = d.x;
    			// var cirY = d.y;
    			return "translate("+e.pageX+","+e.pageY+")";
            })
            .append('circle')
            .attr('r', 20)
            .attr('cx', e.pageX)
            .attr('cy', e.pageY)
            // drag 没有data().enter()没有效果...参数d没有值.
            .call(d3.drag()
                .on('start', start)
                .on('drag', drag)
                .on('end', end)
            )
        function start(d) {
            console.log('d',d ,arguments);
            d.fx = d.x;
    		d.fy = d.y;
        }
        function drag(d) {
            console.log('d',d ,arguments);
            d.fx = d3.event.x;
    		d.fy = d3.event.y;
        }
        function end(d) {
            console.log('d',d ,arguments);
        }

    }
    render() {
        return (
            <div className="d3page">
                <div className="item">
                    <ul>
                        <li>
                            <a draggable="true" onDragStart={this.handledrag}> 组</a>
                        </li>
                    </ul>
                </div>
                <div className="container" onDrop={this.handledrop} onDragOver={this.allowDrop}>
                    <svg id='canvas'  width="960" height="500"></svg>
                </div>

            </div>
        )
    }
}