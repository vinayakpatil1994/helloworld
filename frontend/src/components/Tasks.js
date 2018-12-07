import React, { Component } from "react";

export default class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      taskName: "",
      type: "classification",
      datasetName: "",
      allDatasets: [],
      users: [],
      names: []
    };
  }

  triggerDelete(task) {
    if (window.confirm("Are you sure you want to delete this task?")) {
    }
  }

  render() {
    return (
      <div className="tasks-wrap">
        {this.state.taskList.map((task, index) => {
          return (
            <div
              key={index}
              className="item-card"
              onClick={() => {
                window.sessionStorage.setItem("task", JSON.stringify(task));
              }}
            >
              <div
                className="del-wrap"
                onClick={(e, index) => {
                  e.stopPropagation();
                  e.preventDefault();
                  this.triggerDelete(task, index);
                }}
              >
                <img src={require("../../images/cancel.svg")} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
