'use client';
import React from 'react';
import {motion} from 'framer-motion';
import {BackgroundGradient} from '@/components/ui/background-gradient';
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {CardSpotlight} from "@/components/ui/card-spotlight";
import '@fontsource/orbitron';
import Link from "next/link";
// Import Google Font for a robotic look
// You can install it via npm or use a CDN link in your project

const About = () => {
    return (
        <div style={{width: '100%', height: '100vh'}}>
            <div className="relative bg-gray-200">
                <div className="absolute top-4 right-4 z-10">
                    <Link href="/" className="relative inline-block text-lg group">
            <span
                className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span
                    className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                <span className="relative">Back to Home</span>
            </span>
                        <span
                            className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                            data-rounded="rounded-lg"></span>
                    </Link>
                </div>
            </div>


            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white ">

                <div className="relative z-10 container mx-auto px-4 py-16">
                    <motion.h1
                        className="text-6xl font-['Orbitron'] mb-8 text-center"
                        initial={{opacity: 0, y: -50}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                    >
                        About Our Hackathon
                    </motion.h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        <CardSpotlight>
                            <p className="text-xl font-['latin-400-normal'] relative z-20 mt-8 text-white">
                                We aim to inspire innovation, foster collaboration, and push the boundaries of
                                technology.
                                Our hackathon provides a platform for brilliant minds to come together and create
                                groundbreaking solutions to real-world problems.
                            </p>

                        </CardSpotlight>


                        <CardSpotlight className="bg-black shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-xl font-['Orbitron'] relative z-20 mt-2 text-white">What to
                                    Expect</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="list-disc list-inside  font-['latin-400-normal'] relative z-20 mt-2 text-white space-y-2">
                                    <li>24 hours of intense coding and creativity</li>
                                    <li>Workshops and mentoring sessions</li>
                                    <li>Networking opportunities with industry leaders</li>
                                    <li>Amazing prizes for top projects</li>
                                </ul>
                            </CardContent>
                        </CardSpotlight>

                        <CardSpotlight className="bg-black shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-['Orbitron'] relative z-20 mt-2 text-white">Our
                                    Vision</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="font-['latin-400-normal'] relative z-20 mt-2 text-white">
                                    Our vision is to empower the next generation of tech enthusiasts to become
                                    trailblazers in the
                                    tech world. We believe in the power of collaboration and the magic of collective
                                    creativity.
                                </p>
                            </CardContent>
                        </CardSpotlight>

                        <CardSpotlight className="bg-black relative z-20 mt-2 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl relative z-20 mt-2 font-['Orbitron']">Event
                                    Highlights</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="font-['latin-400-normal'] list-disc list-inside relative z-20 mt-2 text-white space-y-2">
                                    <li>Live coding challenges</li>
                                    <li>Expert panel discussions</li>
                                    <li>Interactive tech demos</li>
                                    <li>Fun social events to relax and unwind</li>
                                </ul>
                            </CardContent>
                        </CardSpotlight>
                    </div>

                    <motion.div
                        className="mt-16 text-center"
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        transition={{duration: 0.5, delay: 0.2}}
                    >
                        <h2 className="text-4xl font-semibold pt-20 mt-16 mb-10">Ready to Join Us?</h2>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                            Register Now
                        </Button>
                    </motion.div>

                    <div className="mt-16">
                        <h3 className="text-3xl font-semibold mb-4">Our Sponsors</h3>
                        <div className="flex justify-center items-center space-x-8">
                            {['Sponsor1', 'Sponsor2', 'Sponsor3'].map((sponsor, index) => (
                                <motion.div
                                    key={index}
                                    className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center shadow-md"
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={{opacity: 1, scale: 1}}
                                    transition={{duration: 0.5, delay: index * 0.2}}
                                >
                                    {sponsor}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#1F2937" fillOpacity="1"
                          d="M0,32L48,53.3C96,75,192,117,288,138.7C384,160,480,160,576,138.7C672,117,768,75,864,80C960,85,1056,139,1152,160C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
        </div>

    );
};

export default About;

