import React from 'react';
import { withState, withHandlers, compose } from 'recompose';

const withStateAndHandlers = compose(
    withState('selectedZen', 'zenClicked', 4),
    withHandlers({
        zenClicked: (props) => (id, evt) => props.zenClicked(selectedZen => id)
    }),
)

export default withStateAndHandlers;