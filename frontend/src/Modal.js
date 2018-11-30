import React, { Component } from "react";
const $ = window.$;

class Modal extends Component {
  constructor(props) {
    super(props);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }
  componentDidMount() {
    console.log("in the componentDidMount");
    const { handleModalCloseClick } = this.props;
    $(this.modal).modal("show");
    $(this.modal).on("hidden.bs.modal", handleModalCloseClick);
  }
  handleCloseClick() {
    const { handleModalCloseClick } = this.props;
    $(this.modal).modal("hide");
    handleModalCloseClick();
  }
  handleSubmitClick = event => {
    event.preventDefault();
    console.log(event.target[0].value + "    " + event.target[1].value);
  };
  render() {
    return (
      <div>
        <div
          className="modal fade"
          ref={modal => (this.modal = modal)}
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add products
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form role="form" onSubmit={this.handleSubmitClick}>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="productName"
                      placeholder="name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Price</label>
                    <input
                      type="text"
                      class="form-control"
                      id="productPrice"
                      placeholder="price"
                    />
                  </div>

                  <button type="submit" class="btn btn-default">
                    Submit
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={this.handleCloseClick}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
