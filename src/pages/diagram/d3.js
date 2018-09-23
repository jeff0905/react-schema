/* eslint-disable */
import React from 'react';
// import CSSModules from 'react-css-modules';

import * as d3 from "d3";
import styles from './d3.less';


export default class D3Page extends React.Component {

    componentDidMount() {
        this.init2();
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
            d3.select('#content')
              .append('div')
              .html('<span>' + title + '</span>: ' + data.map(function(d) {return d.data.name;}).join(', '))
          }
          
          function showLinkArrayElements(data, title) {
            d3.select('#content')
              .append('div')
              .html('<span>' + title + '</span>: ' + data.map(function(d) {return d.source.data.name + ' -> ' + d.target.data.name;}).join(', '))
          }
          
          var root = d3.hierarchy(data)
          
          var ancestors = root.children[0].children[1].ancestors()
          var descendants = root.descendants()
          var leaves = root.leaves()
          var path = root.path(root.children[0].children[1])
          var links = root.links()
          
          showArrayElements(ancestors, "root.children[0].children[1].ancestors()")
          showArrayElements(descendants, "root.descendants()")
          showArrayElements(leaves, "root.leaves()")
          showArrayElements(path, "root.path(root.children[0].children[1])")
          showLinkArrayElements(links, "root.links()")
          
          
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
    
    render() {
        return (
            <div styleName="d3page">
                D3.....
                <div id='canvas'></div>
            </div>
        )
    }
}