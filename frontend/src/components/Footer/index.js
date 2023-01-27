import React from 'react'
import './Footer.css';
function Footer() {
  const today = new Date();
  console.log(today.getFullYear())
  return (
    <div className='footer-container'>
        <ul className='footer-list'>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>PostgreSQL</li>
            <li>React</li>
            <li>Redux</li>
            <li>Express</li>
            <li>Sequelize</li>
        </ul>
        <p>Copyright @ keithglines {today.getFullYear()}</p>
    </div>
  )
}

export default Footer;
