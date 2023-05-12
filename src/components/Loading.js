import React from "react";
import { connect } from "react-redux";
import ReactLoading from "react-loading";
import { changeLoading } from "../feature/loading/loadingSlice";

// The loading screen
const Loading = (props) => {
  let render;
  if (props.isLoading) {
    render = (
      <div>
        <ReactLoading type="spin" height={100} width={100} />
        <span class="visually-hidden">{props.children}</span>
      </div>
    );
  } else render = props.children;

  return render;
};

const mapStateToProps = (state) => ({
  isLoading: state.loading.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeLoading: (isLoading) => dispatch(changeLoading(isLoading)),
  };
};

export default connect(mapStateToProps)(Loading);
export const changeLoadingDispatch = connect(null, mapDispatchToProps);
