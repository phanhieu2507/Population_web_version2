import React from 'react'
import './styles.css'

Footer.propTypes = {}

function Footer (props) {
  return (
    <div className="footer">
      <div className="social">
        <a href="https://www.instagram.com/cp.hieu2507/" target="_blank" rel="noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" target="_blank">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.facebook.com/cp.hieu2507/" target="_blank" rel="noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
      </div>
      <ul className="list">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="">Services</a>
        </li>
        <li>
          <a href="">About</a>
        </li>
        <li>
          <a href="">Term</a>
        </li>
      </ul>
      <p className="copyright">ReactJS Developers 2023</p>
    </div>
  )
}

export default Footer
