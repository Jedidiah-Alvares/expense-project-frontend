import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectRoutes = ({ Component, isLoggedIn }) => {
  const location = useLocation();
  return (
    <>
      {isLoggedIn ? (
        <Component></Component>
      ) : (
        <Navigate to="/signin" state={{ path: location.pathname }} />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.name ? true : false,
});

export default connect(mapStateToProps)(ProtectRoutes);
