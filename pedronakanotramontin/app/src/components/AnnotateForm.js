import React from 'react';
import {
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import '../css/AnnotateForm.css';

/**
 * Components that handles the form state.
 * Very simple, just manages the state of the textarea that holds the annotation description.
 */
class AnnotateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.formVisibility !== nextProps.formVisibility) {
      this.setState({ description: '' });
    }
  }

  handleChange(event) {
    this.setState({ description: event.target.value });
  }

  handleSaveClick() {
    const { handleFormSaveClick } = this.props;

    handleFormSaveClick(this.state.description);
  }

  render() {
    const { formVisibility, formPosition } = this.props;

    return (
      <div
        className="annotation-container"
        style={{ top: formPosition, visibility: formVisibility }}
      >
        <form className="annotation-form" >
          <div className="form-title">Annotation Details</div>
          <hr />
          <FormGroup controlId="annotation-form-id">
            <div className="form-control-label">Description</div>
            <FormControl
              componentClass="textarea"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <button type="button" onClick={this.handleSaveClick}>Save</button>
          </FormGroup>
        </form>
      </div>
    );
  }
}

AnnotateForm.propTypes = {
  formPosition: PropTypes.number.isRequired,
  formVisibility: PropTypes.string.isRequired,
  handleFormSaveClick: PropTypes.func.isRequired,
};

export default AnnotateForm;
