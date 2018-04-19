import { branch, renderNothing } from "recompose";

const isNotHome = ((zen) => zen !== 4);
const hideIfNotHome = (isNotHome) =>
    branch(
        isNotHome,
        renderNothing,
    );

export default hideIfNotHome;