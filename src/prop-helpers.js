import PropTypes from "prop-types";

const meetingShape = PropTypes.shape({
  name: PropTypes.string,
  length: PropTypes.number,
  date: PropTypes.string,
  status: PropTypes.oneOf(["planned", "done", "cancelled"])
});
export { meetingShape };
