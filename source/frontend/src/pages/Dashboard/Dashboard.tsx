import React from "react";

import "./Dashboard.css";
import Board from "src/components/Board/Board";


const columns = [{
    name: "solo",
    totalItemsNumber: 13,
    displayedItemsNumber: 2,
    items: [{
      title: "first item",
      step: "yellow tag"
    }, {
      title: "second item",
      step: "yellow tag"
    }, {
      title: "third item",
      step: "yellow tag"
    }]
  }, {
    name: "waagh",
    totalItemsNumber: 4,
    displayedItemsNumber: 3,
    items: [{
      title: "first item",
      step: "yellow tag"
    }, {
      title: "second item",
      step: "yellow tag"
    }, {
      title: "third item",
      step: "yellow tag"
    }, {
      title: "fourth item",
      step: "yellow tag"
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
