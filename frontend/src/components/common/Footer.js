const Footer = () => {
    return (
        <footer>
            <section>
                <p>
                    A Neil McCarthy Website
                </p>
            </section>
            <section>
                <p>
                    Phone: 0872974760<br/>
                    Email: nmccarthy0101@gmail.com
                </p>
            </section>
            <section>
                <ul>
                    <li><a href='https://www.github.com/neil-mccarthy'><img src={require('../../images/icons/github.png')} /></a></li>
                    <li><a href='https://www.linkedin.com/in/neil-mccarthy-392898170/'><img src={require('../../images/icons/linkedin.png')} /></a></li>
                </ul>
            </section>
        </footer>
    )
}

export default Footer;