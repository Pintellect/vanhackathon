
import React from 'react';
import './Footer.scss';

let Footer = () => (
  <footer id='footer'>
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12'>
          <ul className='social-links'>
            <li>
              <a href='index.html#' data-aos='fade-up' data-aos-delay='0'>
                <i className='fa fa-facebook'></i>
              </a>
            </li>
            <li>
              <a href='index.html#' data-aos='fade-up' data-aos-delay='100'>
                <i className='fa fa-twitter'></i>
              </a>
            </li>
            <li>
              <a href='index.html#' data-aos='fade-up' data-aos-delay='200'>
                <i className='fa fa-google-plus'></i>
              </a>
            </li>
            <li>
              <a href='index.html#' data-aos='fade-up' data-aos-delay='400'>
                <i className='fa fa-pinterest'></i>
              </a>
            </li>
            <li>
              <a href='index.html#' data-aos='fade-up' data-aos-delay='500'>
                <i className='fa fa-envelope'></i>
              </a>
            </li>
          </ul>
          <p className='copyright'>
            © 2017 pintellect.com
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
