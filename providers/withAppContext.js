import { withContext, compose } from "recompose";
import * as PropTypes from "prop-types";
import withStateAndHandlers from "./withStateAndHandlers";

export const AppPropTypes = {
    selectedZen: PropTypes.number,
    zenClicked: PropTypes.func,
}

const AppContext = withContext(
    AppPropTypes,
    ({ selectedZen, zenClicked }) => ({
        selectedZen,
        zenClicked,
    })
);

export default compose(
    withStateAndHandlers,
    AppContext,
);
