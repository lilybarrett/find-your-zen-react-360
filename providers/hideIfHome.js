import React from "react";
import hideIf from "./hideIf";

const hideIfHome = hideIf((props) => props.selectedZen === 4);

export default hideIfHome;