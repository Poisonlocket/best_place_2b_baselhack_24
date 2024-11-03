"use client";
import React from "react";
import { Link } from "react-router-dom";
import peopleImage from '../assets/people.png'; // Import the image

const HomeComponent = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-start p-4"> {/* Use flex-col for small screens */}
                <div className="people flex-1 flex-shrink-0 mb-4 md:mb-0 md:mr-[5px]"> {/* Add margin bottom for small screens */}
                    <img
                        src={peopleImage}
                        alt="Developers working with Open API"
                        className="max-w-[600px] max-h-[600px] w-full h-auto object-contain" // Set max width and height
                    />
                </div>
                <div className="Menu flex-1 flex flex-col items-center justify-center">
                    <h1 className="text-6xl font-bold text-center">SmartGuide</h1>
                    <h2 className="text-xl text-gray-600 px-1.5 text-center">Simple creation. Simple Use!</h2>
                    <div className="flex space-x-4 mt-4"> {/* Add space between buttons and margin on top */}
                        <Link to="/edit">
                            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                                New Guide
                            </button>
                        </Link>
                        <Link to="/overview">
                            <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                All Guides
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="stats shadow items-center justify-center w-full pt-10 pb-20">
                <div className="stat text-center">
                    <div className="stat-title text-3xl">AI Mistakes per 1000 interactions:</div>
                    <div className="stat-value text-6xl">110%</div>
                    <div className="stat-desc text-2xl">Only slightly worse than your average intern</div>
                    <div className="rating justify-self-center pt-4 gap-1">
                        <input type="radio" name="rating-3" className="mask mask-heart bg-red-400"/>
                        <input type="radio" name="rating-3" className="mask mask-heart bg-orange-400" />
                        <input type="radio" name="rating-3" className="mask mask-heart bg-yellow-400"/>
                        <input type="radio" name="rating-3" className="mask mask-heart bg-lime-400"/>
                        <input type="radio" name="rating-3" className="mask mask-heart bg-green-400" checked="checked"/>
                    </div>
                </div>
            </div>


            <footer className="footer bg-base-200 text-base-content p-10">
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Child labor</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Exploitation</a>
                    <a className="link link-hover">Warcrimes</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Don't sue us</a>
                    <a className="link link-hover">Waiving your rights</a>
                </nav>
                <form>
                    <h6 className="footer-title">Newsletter</h6>
                    <fieldset className="form-control w-80">
                        <label className="label">
                            <span className="label-text">Join our <b>amazing</b> newsletter</span>
                        </label>
                        <div className="join">
                            <input
                                type="text"
                                placeholder="annoying email spam"
                                className="input input-bordered join-item"/>
                            <button className="btn btn-primary join-item">Sell your Soul</button>
                        </div>
                    </fieldset>
                </form>
            </footer>

        </>
    );
}

export default HomeComponent;








