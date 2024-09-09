import React, { Component } from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import { motion } from 'framer-motion';
import '@leenguyen/react-flip-clock-countdown/dist/index.css'; // Ensure to import the CSS

const CountdownLabel = ({ children }) => (
    <motion.div
        className="text-sm font-medium text-gray-600 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);

const CountdownDigit = ({ value }) => (
    <motion.div
        className="flex items-center justify-center w-14 h-24 text-4xl font-bold bg-white border rounded-md shadow-lg"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
    >
        {value}
    </motion.div>
);

class CountdownTimer extends Component {
    render() {
        const endTime = new Date('2024-10-26T00:00:00').getTime();

        return (
            <div className="countdown-timer p-8 bg-gray-100 rounded-lg shadow-xl text-center">
                <h2 className="text-4xl font-semibold text-gray-800 mb-6">
                    Hackathon Starts In
                </h2>
                <div className="flex justify-center items-center space-x-4">
                    <FlipClockCountdown
                        to={endTime}
                        labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                        labelStyle={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', color: '#4A4A4A' }}
                        digitBlockStyle={{ width: 50, height: 80, fontSize: 36 }}
                        dividerStyle={{ color: '#DDDDDD', height: 2 }}
                        separatorStyle={{ color: '#FF6347', size: '8px' }}
                        duration={0.5}
                    >
                        <div className="text-lg font-semibold text-red-500">Finished</div>
                    </FlipClockCountdown>
                </div>
            </div>
        );
    }
}

export default CountdownTimer;
