import React from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import { changeLoading } from "../feature/loading/loadingSlice";

const Loading = (props) => {
  return (
    <>
      {props.isLoading ? (
        <div>
          <ReactLoading type="spin" height={100} width={100} />
          <span class="visually-hidden">{props.children}</span>
        </div>
      ) : (
        props.children
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.loading.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoading: () => dispatch(changeLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
