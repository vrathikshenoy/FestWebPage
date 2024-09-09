'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

const people = [
  {
    id: 1,
    name: "Raj",
    designation: "Software Engineer",
    image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Shobitha",
    designation: "UX Designer",
    image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Hrishikesh",
    designation: "Soap Developer",
    image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 4,
    name: "Kannika",
    designation: "The Explorer",
    image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

let sendSound = null;
let receiveSound = null;

const initializeSounds = () => {
  if (!sendSound) {
    sendSound = new Howl({
      src: ['/send.mp3'],
      volume: 1,
      preload: true,
      onload: () => console.log('Send sound loaded successfully'),
      onloaderror: (id, error) => console.error('Error loading send sound:', error),
    });
  }
  if (!receiveSound) {
    receiveSound = new Howl({
      src: ['/receive.mp3'],
      volume: 1,
      preload: true,
      onload: () => console.log('Receive sound loaded successfully'),
      onloaderror: (id, error) => console.error('Error loading receive sound:', error),
    });
  }
};

const SeenBy = React.memo(({ users }) => {
  const uniqueUsers = useMemo(() => {
    const userSet = new Set(users);
    return Array.from(userSet).map((user) => people.find((p) => p.name === user));
  }, [users]);

  return (
      <div className="flex -space-x-2 mt-1">
        {uniqueUsers.map((user, index) => (
            <motion.div
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
            >
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              </div>
            </motion.div>
        ))}
      </div>
  );
});

const ChatMessage = React.memo(({ message, isUser, onMessageDisplayed, seenByUsers }) => {
  const [typing, setTyping] = useState(!isUser);
  const [fullyDisplayed, setFullyDisplayed] = useState(false);

  useEffect(() => {
    if (!isUser) {
      const typingTimer = setTimeout(() => {
        setTyping(false);
      }, 1000);

      const displayTimer = setTimeout(() => {
        setFullyDisplayed(true);
        if (onMessageDisplayed && typeof onMessageDisplayed === 'function') {
          onMessageDisplayed();
        }
      }, 1200);

      return () => {
        clearTimeout(typingTimer);
        clearTimeout(displayTimer);
      };
    } else {
      setFullyDisplayed(true);
      if (onMessageDisplayed && typeof onMessageDisplayed === 'function') {
        onMessageDisplayed();
      }
    }
  }, [isUser, onMessageDisplayed]);

  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-4`}
      >
        <span className="text-sm text-gray-500 mb-1">{message.user}</span>
        <div
            className={`rounded-3xl py-2 px-4 sm:py-3 sm:px-5 max-w-xs sm:max-w-md ${isUser ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'} shadow-lg`}
        >
          {typing ? (
              <div className="flex space-x-1">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.9,
                          ease: 'easeInOut',
                          delay: i * 0.3,
                        }}
                    />
                ))}
              </div>
          ) : (
              <p>{message.text}</p>
          )}
        </div>
        {!isUser && fullyDisplayed && seenByUsers.length > 0 && (
            <SeenBy users={seenByUsers} />
        )}
      </motion.div>
  );
});

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey, did you guys hear about the college fest !! 🤠', isUser: false, user: 'Raj' },
    { id: 2, text: 'No way! When is it? 🤔', isUser: false, user: 'Shobitha' },
    { id: 3, text: 'It s on October 25th. There s going to be a bunch of cool stuff—workshops, competitions, and a ton of fun activities. 🔥', isUser: false, user: 'Hrishikesh' },
    { id: 4, text: 'That sounds awesome! 🤠', isUser: false, user: 'Kannika' },
    { id: 5, text: 'Awesome, thanks for the info!🤠', isUser: false, user: 'Shobitha' },
  ]);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [showLetsGoooButton, setShowLetsGoooButton] = useState(false);
  const [soundPlayed, setSoundPlayed] = useState({ send: false, receive: false });
  const [seenByUsers, setSeenByUsers] = useState({});
  const [replyOptionsVisible, setReplyOptionsVisible] = useState(false);
  const [replyOptionsShownOnce, setReplyOptionsShownOnce] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!audioInitialized) {
        initializeSounds();
        setAudioInitialized(true);
        document.removeEventListener('click', handleUserInteraction);
      }
    };

    document.addEventListener('click', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [audioInitialized]);

  useEffect(() => {
    if (currentIndex < messages.length) {
      const showNextMessage = () => {
        setVisibleMessages((prev) => [...prev, messages[currentIndex]]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setSoundPlayed({ send: false, receive: false });
      };

      const timer = setTimeout(showNextMessage, 1800);
      return () => clearTimeout(timer);
    } else {
      setReplyOptionsVisible(true);
    }
  }, [currentIndex, messages]);

  const handleMessageDisplayed = useCallback(() => {
    const lastMessage = visibleMessages[visibleMessages.length - 1];

    if (lastMessage && !lastMessage.isUser && !soundPlayed.receive && receiveSound) {
      receiveSound.play();
      setSoundPlayed((prev) => ({ ...prev, receive: true }));
    }

    if (lastMessage && lastMessage.isUser && !soundPlayed.send && sendSound) {
      sendSound.play();
      setSoundPlayed((prev) => ({ ...prev, send: true }));
    }

    const seenByMap = {
      1: ['Kannika', 'Hrishikesh', 'Shobitha'],
      2: ['Raj', 'Kannika', 'Hrishikesh'],
      3: ['Shobitha', 'Kannika', 'Raj'],
      4: ['Hrishikesh', 'Shobitha', 'Raj'],
      5: ['Raj', 'Kannika', 'Hrishikesh'],
    };

    if (lastMessage) {
      setSeenByUsers((prev) => ({
        ...prev,
        [lastMessage.id]: seenByMap[lastMessage.id] || [],
      }));
    }
  }, [visibleMessages, soundPlayed]);

  const addMessage = useCallback(
      (text, isUser) => {
        const newMessage = {
          id: Date.now(),
          text,
          isUser,
          user: isUser ? "You" : "Unknown",
        };
        setMessages((prev) => [...prev, newMessage]);

        if (isUser) {
          setReplyOptionsVisible(false);
          setShowLetsGoooButton(true);
        }
      },
      []
  );

  const renderReplyOptions = useMemo(() => {
    if (!replyOptionsVisible || replyOptionsShownOnce) return null;

    const options = ["count me in!!"];
    return (
        <div className="flex space-x-2 justify-center items-center">
          {options.map((option, index) => (
              <button
                  key={index}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 py-3 text-lg font-semibold shadow-lg"
                  onClick={() => {
                    addMessage(option, true);
                    setReplyOptionsShownOnce(true);
                  }}
              >
                {option}
              </button>
          ))}
        </div>
    );
  }, [replyOptionsVisible, replyOptionsShownOnce, addMessage]);

  const handleLetsGoClick = () => {
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (

      <div className=" w-full bg-gray-900 text-white min-h-screen p-10  h-full flex flex-col">
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-3xl font-mono text-white drop-shadow-lg">
            Somewhere in Mangalore
          </h1>
        </div>
        <AnimatePresence>
          {visibleMessages.map((message, index) => (
              <ChatMessage
                  key={message.id}
                  message={message}
                  isUser={message.isUser}
                  onMessageDisplayed={handleMessageDisplayed}
                  seenByUsers={seenByUsers[message.id] || []}
              />
          ))}
        </AnimatePresence>

        <div className="mt-4 text-center">
          {renderReplyOptions}
          {showLetsGoooButton && (
              <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-green-400"
                  onClick={() => handleLetsGoClick()}
              >
                Let's gooo!!
              </button>
          )}
        </div>
      </div>
  );
};

export default ChatInterface;