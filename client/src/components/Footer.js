import React from 'react';
import '../scss/footer.scss';

const Footer = () => {

    return(
        <div className="footer ui two column centered grid">
            <div className="four column centered row">
                <div className="column">
                    <h3>Information</h3>
                   <div className="ui link list">
                        <a href="/" className="white item">Some link</a>
                        <a href="/" className="item">Some link</a>
                        <a href="/" className="item">Some link</a>
                        <a href="/" className="item">Some link</a>
                   </div> 
                </div>
                <div className="column">
                    <h3>Information</h3>
                    <div className="ui link list">
                        <a href="/" className="white item">Some link</a>
                        <a href="/" className="item">Some link</a>
                        <a href="/" className="item">Some link</a>
                        <a href="/" className="item">Some link</a>
                    </div>
                </div>
            </div>
            
            <div className="four column row">
                <div className="column">
                    <p>&copy; {window.moment().format('YYYY')} StudyUp</p>
                </div>
                <div className="column">
                    <p>Development by love &amp; coffee &#124; Esterlin/JD</p>
                </div>
            </div>
        </div>
    );
};


export default Footer;