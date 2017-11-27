import React, { Component } from 'react';
import {Grid , Row , Col , Panel} from 'react-bootstrap';

class Annotation extends Component {
    
    render () {
        return (
            <div className="Annotations">                
                <center><i><h5>"{this.props.quote}"</h5></i></center>
                <p><strong>Comments:</strong> {this.props.text}</p>                 
            </div>
        );
    }
}

export default Annotation;