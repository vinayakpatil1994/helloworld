import React, { Component } from "react";
import axios from "axios";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import Modal from "./Modal";

//require('../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css');
var ReactBsTable = require("react-bootstrap-table");

class UsersInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataState: [],
      selectedData: "",
      popup: false
    };
    this.handleModalShowClick = this.handleModalShowClick.bind(this);
    this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
  }

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
          this.setState({ dataState: [] });
          alert("Token Expired");
          console.log("from state data man:::::::", this.state.dataState);
        });
    }
  }
  delete() {
    console.log("inside delete ");
    var token = sessionStorage.getItem("token");
    console.log(token);

    if (token !== undefined || token !== null) {
      axios({
        url: "http://localhost:8080/delete/{}",
        method: "delete",
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
          this.setState({ dataState: [] });
          alert("Token Expired");
          console.log("from state data man:::::::", this.state.dataState);
        });
    }
  }

  handleModalShowClick(e) {
    debugger;
    //e.preventDefault();
    this.setState({
      popup: true
    });
  }

  handleModalCloseClick() {
    this.setState({
      popup: false
    });
  }

  render() {
    const val = this.state.dataState.length === 0 ? false : true;
    var scope = this;

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
              onClick={event => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
        {val ? (
          <MuiThemeProvider>
            <div>
              <h4>All Registered Users</h4>
              <BootstrapTable
                data={this.state.dataState}
                options={options}
                remote
                pagination
                striped
                hover
                condensed
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleModalShowClick}
          >
            Add Task
          </button>
          {this.state.popup ? (
            <Modal handleModalCloseClick={this.handleModalCloseClick} />
          ) : null}
        </div>
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
