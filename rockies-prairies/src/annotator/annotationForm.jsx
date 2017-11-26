import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form'
 
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.notes) {
    errors.notes = 'Required';
  }
  return errors;
};

const renderField = ({ input, placeholder, type, className, meta: { touched, error } }) => (
  <div>
    <input {...input} autoFocus={true} placeholder={placeholder} type={type} className={className} />
    {touched && (error && 
      <div className="alert alert-danger" role="alert">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        {error}
      </div>)}
  </div>
);

const renderTextArea = ({ input, placeholder, type, className, meta: { touched, error } }) => (
  <div>
    <textarea {...input} placeholder={placeholder} className={className}></textarea>
    {touched && (error && 
      <div className="alert alert-danger" role="alert">
        <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
        {error}
      </div>)}
  </div>
);

export default class AnnotationForm extends Component {
  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div role="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your name</label>
            <Field
              type="text"
              name="name"
              className="form-control"
              placeholder="Ex: Richard Sherman"
              component={renderField} />
          </div>
          <div className="form-group">
            <label>Notes</label>
            <Field 
              name="notes"
              placeholder="Ex: U MAD BRO?"
              component={renderTextArea} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              <i className="fa fa-plus"></i>&nbsp;
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export const AnnotationFormContainer = reduxForm({form: 'annotation', validate})(AnnotationForm);