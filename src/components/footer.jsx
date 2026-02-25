import { NavLink } from "react-router"

import "./styles/footer.css"

export default function Footer() {
    return (
        <div>
            <footer>
                <div className="container">
                    <div className="info-links">
                        <div>
                            <ul className="first">
                                <li><NavLink to="/">logo</NavLink></li>
                                <li><NavLink to="#">About</NavLink></li>
                                <li><NavLink to="#">Explore</NavLink></li>
                                <li><NavLink to="#">Careers</NavLink></li>
                            </ul>
                        </div>
                        <div>
                            <ul className="second">
                                <li><a href="https://github.com/Leon-Ashbourne" target="_blank">github</a></li>
                                <li><NavLink to="#">email</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div className="additional-info">
                        <section className="products">
                            <span className="mini-head-styled">Products</span>
                            <ul className="ul-styled">
                                <li><NavLink to="#">Creator platform</NavLink></li>
                                <li><NavLink to="#">Experts</NavLink></li>
                                <li><NavLink to="#">For news</NavLink></li>
                                <li><NavLink to="#">Integrations</NavLink></li>
                            </ul>
                        </section>
                        <section className="developers">
                            <span className="mini-head-styled">Developers</span>
                            <ul className="ul-styled">
                                <li><NavLink to="#">How to install SaintBorne</NavLink></li>
                                <li><NavLink to="#">Core concepts</NavLink></li>
                                <li><NavLink to="#">Api documentation</NavLink></li>
                                <li><NavLink to="#">Security overview</NavLink></li>
                            </ul>
                        </section>
                        <section className="resources">
                            <span className="mini-head-styled">Resources</span>
                            <ul className="ul-styled">
                                <li><NavLink to="#">Tutorials</NavLink></li>
                                <li><NavLink to="#">Resources</NavLink></li>
                                <li><NavLink to="#">Reviews</NavLink></li>
                                <li><NavLink to="#">Subscription platforms</NavLink></li>
                            </ul>
                        </section>
                        <section className="support">
                            <span className="mini-head-styled">Support</span>
                            <ul className="ul-styled">
                                <li><NavLink to="#">Help center</NavLink></li>
                                <li><NavLink to="#">Community</NavLink></li>
                                <li><NavLink to="#">status</NavLink></li>
                            </ul>
                        </section>
                    </div>
                    <div className="t-c-policy-info">
                        <ul className="third">
                            <li><NavLink to="#">Terms</NavLink></li>
                            <li><NavLink to="#">Policies</NavLink></li>
                            <li><NavLink to="#">Contact</NavLink></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}