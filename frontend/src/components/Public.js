import React from 'react';
// import {Link} from 'react-router-dom';
import Header from './common/Header';
import Nav from './common/Nav';
import Footer from './common/Footer';

const Public = () => {
    return (
        <React.Fragment>
            <Header />
            <Nav isLoggedIn={false} />
            <main className='home'>
                <section>
                    <h1>
                        Welcome to the Traders Emporium
                    </h1>
                    <p>
                        Greetings and welcome to all traders, barterers and those with an interest in trinkets, odds and ends, and those sorts of things! Whether it's a deal you're seeking or a place to pawn some goods, you've found the right place.
                        Here at Trinkets for Trade we wish to re-establish the art of exchange in the modern world. We yearn for the days of being able trade a chicken and a basket of eggs for the weekly shop.
                        Cash, the usurper, has been king long enough. We seek only to return the old dynasty to it's former glory..<br/><br/>
                        But in all seriousness, toppling the powers that be by challenging the current means of exchange is more of a long term project. For right now our goal is just to offer a fun and simple alternative to buying or selling second hand goods.
                        So if you've ever fancied trying your hand trading the old way have a gander at what we've got in stock or post a trinket of your own!
                    </p>
                </section>
                <section>
                    <h1>
                        How to Trade
                    </h1>
                    <p>
                        Simple! All you need to do is see something you like and make an offer in with cash value or offer a trade! If the owner likes your offer they can accept!<br/>As for offering your own trade, all you need to do is create a new trinket, add
                        in all the details and wait for an offer!<br/><br/>Both of the above will require you to have an acount so make sure you sign-up or login in order to start your trading!
                    </p>
                </section>
                <section className='auth'>
                    <section>
                        <h1>
                            New here? Sign-up!
                        </h1>
                        <p>
                            Signing up will only take a minute and is completely free!
                        </p>
                        <a href="newUser">Sign-up</a>
                    </section>
                    <section>
                        <h1>
                            Have an account? Login!
                        </h1>
                        <p>
                            Welcome back! Click the button below to login to your account
                        </p>
                        <a href="login">Login</a>
                    </section>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Public;