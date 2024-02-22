import React from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"
import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Home - Isaiah Wiesner</title>
                <meta name="description" content="Welcome to Isaiah Wiesner's Web Development Portfolio | Software Development and Network Engineering Student - Explore Isaiah Wiesner's projects" />
                <meta name="og:description" content="Welcome to Isaiah Wiesner's Web Development Portfolio | Software Development and Network Engineering Student - Explore Isaiah Wiesner's projects" />
                <meta name="og:title" content="Home - Isaiah Wiesner" />
                <meta name="og:url" content="/" />
            </Helmet>
            <div className="page pt-16 md:pt-32">
                <div className="side-by-side">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-2">
                            <p className="swoop-1-animation text-4xl">
                                Hi, I'm
                            </p>
                            <p className="name-animation text-6xl text-primary-600 dark:text-primary-400 font-normal">
                                Isaiah Wiesner
                            </p>
                            <p className="swoop-2-animation text-3xl font-normal">I make websites.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Link to="/portfolio">
                                <button className="btn btn-primary-outline w-full button-animation-1">
                                    Enter Portfolio
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8 body-animation md:max-h-[calc(100vh-10rem)] md:scroll-y">
                        <div className="flex flex-col gap-2">
                            <h1>About Me</h1>
                            <p>
                                Hi! I'm Isaiah Wiesner, an Ontario-based software development student at
                                Sheridan College. If you're looking for a website, you've found the right place!
                            </p>
                            <p>
                                My passion for web development goes back as far as I've has access to a computer.
                                At the young age of 10, I started teaching myself how to create websites for my
                                friends and I to advertise our Minecraft servers to others. I have dedicated a
                                large portion of my teen years into developing websites and that brings me to
                                where I am today.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3>Don't Hesitate!</h3>
                            <p>
                                If you have any questions or inqueries, please feel free to contact me via email.
                                This could be the start of something great!
                            </p>
                        </div>
                        <div className="max-w-[25rem] flex flex-col gap-2">
                            <h4 className="italic secondary-text">
                                "You miss 100% of the shots you don't take."
                            </h4>
                            <h5 className="italic text-right">
                                - Wayne Gretzky
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    )
}