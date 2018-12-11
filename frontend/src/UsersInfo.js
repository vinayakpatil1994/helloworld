import React, { Component } from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import SimpleModalWrapped from "./SimpleModal";
import OpenModal from "./components/OpenModal";

//require('../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');
var ReactBsTable = require("react-bootstrap-table");

class UsersInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataState: [],
      selectedData: "",
      tasks: [],
      open: false,
      index: null,
      updateEnabled: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.triggerDelete = this.triggerDelete.bind(this);
    this.delete = this.delete.bind(this);
    this.onAfterSaveCell = this.onAfterSaveCell.bind(this);
    this.update = this.update.bind(this);

    this.options = {
      defaultSortName: "taskId", // default sort column name
      defaultSortOrder: "asc" // default sort order
    };
  }

  triggerDelete = (task, ind) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      debugger;
      let tasks = [...this.state.tasks];

      var result = tasks.find(obj => {
        return obj.taskId === ind;
      });
      var index1 = tasks.indexOf(result);
      console.log(result);
      tasks.splice(index1, 1);

      this.delete();
      this.setState({ tasks: tasks });
    } else {
      this.setState({
        index: ind
      });
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClick(event) {
    let items = [];
    var token = sessionStorage.getItem("token");
    console.log(token);
    if (token !== undefined || token !== null) {
      axios({
        url: "http://localhost:8080/users",
        method: "get",
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(response => {
          debugger;
          console.log(response.data);
          this.setState({ dataState: response.data });
          console.log("from state data man:::::::", this.state.dataState);
        })
        .catch(err => {
          // console.log(items);
          debugger;
          //var error = err.response.data.inner.name;
          //console.log(error);
          // this.setState({ dataState: [] });
          // alert("Token Expired");
          // console.log("from state data man:::::::", this.state.dataState);
          console.log(err);
          if (err.response.status === 401) {
            localStorage.clear();
            alert("Token expired!");
            location.href = "/";
          }
        });
    }
  }

  handleClick1(event) {
    let items = [];
    var token = sessionStorage.getItem("token");
    console.log(token);
    if (token !== undefined || token !== null) {
      axios({
        url: "http://localhost:8080/tasks",
        method: "get",
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(response => {
          debugger;
          console.log(response.data);
          this.setState({ tasks: response.data });
          console.log("from state data man:::::::", this.state.tasks);
        })
        .catch(err1 => {
          // console.log(items);
          debugger;
          //var error = err.response.data.inner.name;
          //console.log(error);
          // this.setState({ dataState: [] });
          // alert("Token Expired");
          // console.log("from state data man:::::::", this.state.dataState);
          console.log(err1);
          if (err1.response.status === 401) {
            localStorage.clear();
            alert("Token expired!");
            location.href = "/";
          }
        });
    }
  }

  delete() {
    console.log("inside delete ");
    var token = sessionStorage.getItem("token");
    console.log(token);
    debugger;

    if (token !== undefined || token !== null) {
      axios({
        url: "http://localhost:8080/delete/" + this.state.index,
        method: "delete",
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(response => {
          // console.log(response.data);
          //this.setState({ tasks: response.tasks });
          console.log("from state data man:::::::");
          this.setState({ tasks: this.state.tasks });
        })
        .catch(err1 => {
          // console.log(items);
          debugger;
          //var error = err.response.data.inner.name;
          //console.log(error);
          // this.setState({ dataState: [] });
          // alert("Token Expired");
          // console.log("from state data man:::::::", this.state.dataState);
          console.log(err1);
          if (err1.response.status === 401) {
            localStorage.clear();
            alert("Token expired!");
            location.href = "/";
          }
        });
    }
  }

  onAfterSaveCell(row, cellName, cellValue) {
    debugger;
    //alert(`Save cell ${cellName} with value ${cellValue}`);

    let rowStr = "";
    for (const prop in row) {
      rowStr += prop + ": " + row[prop] + "\n";
    }
    this.updateRow(row);
    //alert("The whole row :\n" + rowStr);
  }

  updateRow(row) {
    console.log("row data .....", row);
    debugger;
    var payload = {
      taskName: row.taskName,
      status: row.status
    };

    // tasks = JSON.parse(sessionStorage.getItem("tasks"));
    // console.log("session storage ...........", tasks);
    // tasks.push(payload);
    // console.log("Session updated", tasks);
    // sessionStorage.setItem("tasks", JSON.stringify(tasks));
    // console.log(tasks);
    var token = sessionStorage.getItem("token");
    console.log(token);
    var id = row.taskId;
    if (token !== undefined || token !== null) {
      axios({
        url: "http://localhost:8080/updateTask/" + id,
        method: "put",
        data: payload,
        headers: {
          Authorization: "Bearer " + token
        }
      })
        .then(function(res) {
          console.log(res);
          if (res.data.code == 200) {
            console.log("task updated successfully");
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
  }

  update() {
    this.setState(prevState => ({
      updateEnabled: !prevState.updateEnabled
    }));
  }

  render() {
    const val = this.state.dataState.length === 0 ? false : true;
    const val1 = this.state.tasks.length === 0 ? false : true;
    var scope = this;
    var tasks = [];

    const selectRow = {
      mode: "radio",
      bgColor: "pink",
      clickToSelect: true,
      onSelect: (row, isSelect, rowIndex, e) => {
        if (isSelect == true) {
          this.setState({
            index: row.taskId
          });
        } else {
          this.setState({ index: null });
          return;
        }

        console.log("onselect row data as ......", row.taskId);
      }
    };

    function buttonFormatter(cell, row) {
      return `<RaisedButton class="glyphicon glyphicon-trash" onClick = {this.delete}>`;
      //return `<button class="primary" value="delete"/>`;
      console.log(row);
    }

    const cellEditProp = {
      mode: "click",
      blurToSave: true,
      afterSaveCell: this.onAfterSaveCell
    };

    return (
      <div style={{ width: "70%", margin: "auto" }}>
        <MuiThemeProvider>
          {/* <div ref={el => (this.instance = el)}></div> */}
          <div>
            <RaisedButton
              label="Get All Users"
              primary={true}
              style={style}
              onClick={event => scope.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
        {val ? (
          <MuiThemeProvider>
            <div>
              <h4>All Registered Users</h4>
              <BootstrapTable
                data={this.state.dataState}
                cellEdit={
                  this.state.updateEnabled == true ? cellEditProp : Object
                }
              >
                <TableHeaderColumn dataField="id" isKey width={"10%"}>
                  ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="first_name">
                  First Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="last_name">
                  Last Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="email"> Email</TableHeaderColumn>
                <TableHeaderColumn dataFormat={buttonFormatter}>
                  Action
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </MuiThemeProvider>
        ) : null}
        <div>
          <br />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleClick1}
          >
            Show Tasks
          </button>
        </div>
        {val1 ? (
          <MuiThemeProvider>
            <div>
              <h4>All Tasks with details</h4>
              {this.state.updateEnabled == true ? (
                <BootstrapTable
                  data={scope.state.tasks}
                  //selectRow={selectRow}
                  options={this.options}
                  cellEdit={
                    this.state.updateEnabled == true ? cellEditProp : {}
                  }
                >
                  <TableHeaderColumn dataField="taskId" isKey width={"10%"}>
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="taskName">
                    Task Name
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="status">
                    status
                  </TableHeaderColumn>
                </BootstrapTable>
              ) : (
                <BootstrapTable
                  data={scope.state.tasks}
                  selectRow={selectRow}
                  options={this.options}
                  //cellEdit={this.state.updateEnabled == true ? cellEditProp : {}}
                >
                  <TableHeaderColumn dataField="taskId" isKey width={"10%"}>
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="taskName">
                    Task Name
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="status">
                    status
                  </TableHeaderColumn>
                </BootstrapTable>
              )}
              <br />
              <OpenModal updateTask={this.handleClick1} /> {this.props.children}
              <br />
              <div>
                <button
                  className="btn btn-primary del-wrap"
                  onClick={e => {
                    // e.stopPropagation();
                    // e.preventDefault();
                    console.log(this.state.index);
                    if (this.state.index != null) {
                      var ind = this.state.index;
                      this.setState({ index: null });
                      this.triggerDelete(this.state.tasks, ind);
                    }
                  }}
                >
                  Delete Selected Task
                </button>
                <br />
                <br />
                <button
                  className="btn btn-primary del-wrap"
                  onClick={this.update}
                >
                  Enable Update
                </button>
                <br />
              </div>
            </div>
          </MuiThemeProvider>
        ) : null}
      </div>
    );
  }
}

const style = {
  margin: 15
};
const border = {
  border: "1px solid black"
};
export default UsersInfo;
