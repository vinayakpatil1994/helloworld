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
      index: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClick1 = this.handleClick1.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.triggerDelete = this.triggerDelete.bind(this);
    this.delete = this.delete.bind(this);

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
    var options = {
      onRowClick: function(row) {
        scope.setState({
          selectedData: row.id + "  " + row.first_name + "  " + row.last_name
        });
      }
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
              <BootstrapTable data={this.state.dataState} options={options}>
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
              <BootstrapTable
                data={scope.state.tasks}
                selectRow={selectRow}
                options={this.options}
              >
                <TableHeaderColumn dataField="taskId" isKey width={"10%"}>
                  ID
                </TableHeaderColumn>
                <TableHeaderColumn dataField="taskName">
                  Task Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="status">status</TableHeaderColumn>
              </BootstrapTable>
              <br />
              {sessionStorage.setItem(
                "tasks",
                JSON.stringify(this.state.tasks)
              )}
              <OpenModal />
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
