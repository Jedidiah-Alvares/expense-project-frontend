import React, { Component } from "react";
import { changeLoading } from "../feature/loading/loadingSlice";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

const withLoading = ({ WrapperComponent, isLoading, changeLoading }) => {
  class withLoading extends Component {
    render() {
      return (
        <>
          {isLoading ? (
            <div>
              <ReactLoading type="spin" height={100} width={100} />
              <span class="visually-hidden">
                <WrapperComponent
                  changeLoading={changeLoading}
                  {...this.props}
                />
              </span>
            </div>
          ) : (
            <WrapperComponent changeLoading={changeLoading} {...this.props} />
          )}
        </>
      );
    }
  }

  return withLoading;
};

const mapStateToProps = (state) => ({
  isLoading: state.loading.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoading: () => dispatch(changeLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withLoading);
