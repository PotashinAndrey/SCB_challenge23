import React from "react";

import "./Dashboard.css";
import Board from "src/components/Board/Board";


const columns = [{
    name: "solo",
    totalItemsNumber: 13,
    displayedItemsNumber: 2,
    items: [{
      title: "first item",
      step: "yellow tag",
      id: "someID1"
    }, {
      title: "second item",
      step: "yellow tag",
      id: "someID2"
    }, {
      title: "third item",
      step: "yellow tag",
      id: "someID3"
    }]
  }, {
    name: "waagh",
    totalItemsNumber: 4,
    displayedItemsNumber: 3,
    items: [{
      title: "first item",
      step: "yellow tag",
      id: "someID4"
    }, {
      title: "second item",
      step: "yellow tag",
      id: "someID5"
    }, {
      title: "third item",
      step: "yellow tag",
      id: "someID6"
    }, {
      title: "fourth item",
      step: "yellow tag",
      id: "someID7"
    }]
  }] as any
  

const Dashboard: React.FC = () => {

    return (
        <div className="dashboard-component">
            <Board columns={columns}/>
        </div>
    );
}

export default Dashboard;
