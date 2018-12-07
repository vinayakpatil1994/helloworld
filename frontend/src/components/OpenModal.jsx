import React, { Component } from "react";
import Modal from "react-responsive-modal";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
var apiBaseUrl = "http://localhost:8080/";
import axios from "axios";
//import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

class OpenModal extends Component {
  state = {
    open: false,
    taskId: null,
    taskName: "",
    status: ""
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleClick2(event) {
    var tasks = [];
    debugger;
    var payload = {
      taskId: this.state.taskId,
      taskName: this.state.taskName,
      status: this.state.status
    };

    if (payload.taskId === null) {
      alert("Enter task id");
      return;
    }

    tasks = JSON.parse(sessionStorage.getItem("tasks"));
    console.log("session storage ...........", tasks);
    tasks.push(payload);
    console.log("Session updated", tasks);
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(tasks);
    var token = sessionStorage.getItem("token");
    console.log(token);
    if (token !== undefined || token !== null) {
      axios({
        url: "http://localhost:8080/addTask",
        method: "post",
        data: payload,
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(function(res) {
          console.log(res);
          if (res.data.code == 200) {
            console.log("task Added successfully");
          }
        })
        .catch(err1 => {
          // console.log(items);
          debugger;
          console.log(err1);
          if (err1.response.status === 401) {
            localStorage.clear();
            alert("Token expired!");
            location.href = "/";
          }
        });
    }

    this.onCloseModal();
    console.log("model should close now ");
  }

  render() {
    const { open } = this.state;
    return (
      <div>
        <button onClick={this.onOpenModal} className="btn btn-primary">
          Add Task
        </button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <div>
            <MuiThemeProvider>
              <div>
                <TextField
                  hintText="Enter your TaskId "
                  floatingLabelText=" Task Id"
                  onChange={(event, newValue) =>
                    this.setState({ taskId: newValue })
                  }
                />
                <br />
                <TextField
                  type="taskName"
                  hintText="Enter your taskName"
                  floatingLabelText="Task Name"
                  onChange={(event, newValue) =>
                    this.setState({ taskName: newValue })
                  }
                />
                <TextField
                  type="status"
                  hintText="Enter task status"
                  floatingLabelText="Status"
                  onChange={(event, newValue) =>
                    this.setState({ status: newValue })
                  }
                />
                <br />
                <br />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={event => this.handleClick2(event)}
                >
                  Add Task
                </button>
              </div>
            </MuiThemeProvider>
          </div>
        </Modal>
      </div>
    );
  }
}

const style = {
  margin: 15
};

export default OpenModal;
