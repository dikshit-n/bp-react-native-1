import React from "react";

export const withProps = (props, Component) => React.cloneElement(Component, props);
