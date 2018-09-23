/* eslint-disable */
import React from "react";
import * as SRD from "storm-react-diagrams";
import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeModel,
  LinkModel,
  DiagramWidget,
  NodeModel 
} from "storm-react-diagrams";

import model from './../model/schema';

require("storm-react-diagrams/dist/style.min.css");


export default class Schema extends React.Component {
  node = {
      
  }
  convertModel() {
    const { list } = model;
    const table = list.map(item => item.table1);
    const table2 = list.map(item => item.table2);
    // 去重.
    console.log(table, table2);
    const sets = new Set(table.concat(table2));
    console.log(sets);

    const links = list.map(item => {
        return {
            source: item.column1,
            target: item.column2,
            table1: item.table1,
            table2: item.table2,
        }
    })
    return {
        nodes: Array.from(sets),
        links: links
    }
  }

  init() {
    const tableModel = this.convertModel();

    //1) setup the diagram engine
    var engine = new DiagramEngine();
    engine.installDefaultFactories();

    //2) setup the diagram model
    var model = new DiagramModel();

    //3-A) create a default node
    
    tableModel.nodes.forEach((item, index) => {
        console.log('item', item);
        const node = new DefaultNodeModel(item, "rgb(0,192,255)");
        const cnode = new DefaultNodeModel('cnode', "rgb(0,192,255)");
        // cnode.setParent(node);
        // node.addNode(cnode);
        // node.addPort();
        const x = 100 * (index + 1);
        const y = 100 * (index + 1)
        node.setPosition(x, y);
        // cnode.setParent(node);
        this.node[item] = node;
        model.addNode(node);
    })
    tableModel.links.forEach((item, index) => {
        const sourcePort = item.source;
        const sourceNode = item.table1;

        const targetPort = item.target;
        const targetNode = item.table2;
        let source = null;
        console.log('this.node[sourceNode][sourcePort]', this.node[sourceNode][sourcePort])
        if (!this.node[sourceNode][sourcePort]){
            source = this.node[sourceNode].addOutPort(`${sourcePort}`);
            this.node[sourceNode][sourcePort] = source;
        } else {
            source = this.node[sourceNode][sourcePort];
        }
        var target = this.node[targetNode].addInPort('' +targetPort);
        

        var link1 = source.link(target);
        model.addLink(link1);
    })
    /**
    var node1 = new DefaultNodeModel("[表]: welab_user", "rgb(0,192,255)");
    var port1 = node1.addOutPort("user_id");
    node1.setPosition(100, 100);

    //3-a1) 
    var node4 = new NodeModel()
    //3-B) create another default node
    var node2 = new DefaultNodeModel("[表]: welab_events", "rgb(0,192,255)");
    var port2 = node2.addInPort("event_id");
    var port3 = node2.addOutPort(' ');
    node2.setPosition(400, 100);

    //3-C) link the 2 nodes together
    var link1 = port1.link(port2);

    //3-D) create an orphaned node
    var node3 = new DefaultNodeModel("[表]: welab_sms", "rgb(0,192,255)");
    node3.addOutPort("sms_id");
    node3.setPosition(100, 200);

    //4) add the models to the root graph
    model.addAll(node1, node2, node3, link1);
 */
    //5) load model into engine
    engine.setDiagramModel(model);
    this.engine = engine;
    this.model = model;
  }

  componentWillMount() {
    this.init();
  }

  render() {
    return (
      <DiagramWidget
        className="srd-demo-canvas"
        diagramEngine={this.engine}
        allowLooseLinks={false}
      />
    );
  }
}
