import React from 'react';
import {Link} from 'react-router-dom';
import './Header.scss';

class Header extends React.Component {

  render() {
    return (<header id='header' className='header' style={{
        ...this.props.style,
        overflow: 'auto'
      }}>
      <nav className='navbar navbar-custom' role='navigation'>
        <div className='container'>
          <div className='navbar-header'>
            <button className='navbar-toggle' data-toggle='collapse' data-target='#custom-collapse'>
              <span className='sr-only'/>
              <span className='icon-bar'/>
              <span className='icon-bar'/>
              <span className='icon-bar'/>
            </button>
            <Link to='/' className='navbar-brand'>Pintellect</Link>
          </div>
          <div id='custom-collapse' className='collapse navbar-collapse'>
            <ul className='nav navbar-nav navbar-left'>
              <li className='dropdown'></li>
            </ul>
            <ul className='nav navbar-nav navbar-right'>
              <li>
                <Link to='/'>index</Link>
              </li>
              <li>
                <Link to='/posts'>posts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>);
  }
}
export {
  Header as default
}
