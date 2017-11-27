
import React from 'react';
import autoBind from 'react-autobind';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Badge extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }
  render() {
    return (
      <div className="col-lg-3 col-md-6">
        <div className="panel panel-custom">
          <div className="panel-heading">
            <div className="row">
              <div className="col-xs-9">
                {this.props.title}
              </div>
              <div className="col-xs-3 text-right">
                <i className={cx('fa', this.props.className)} />
              </div>
            </div>
          </div>
          <Link to={this.props.url || '#'}>
            <div className="panel-footer">
              <span className="pull-left" data-aos="flip-up" data-aos-delay="200">{this.props.description}</span>
              <span className="pull-right">
                <i className="fa fa-caret-square-o-right" aria-hidden="true" />
              </span>
              <div className="clearfix">&nbsp;</div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

Badge.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export { Badge as default };
