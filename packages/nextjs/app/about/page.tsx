'use client'
import React from 'react';

import { motion } from 'framer-motion';
import {FaceSmileIcon} from "@heroicons/react/24/solid";
// import blockchain from 'packages/nextjs/public/blockchain.jpeg';
import Accordion from './component/accordion';
const accordionData = [
  {
    question: "What is blockchain and why use it here?",
    answer: [
      "Series of connected data blocks, forming a chain.",
      "Real estate transactions recorded in secure, connected data blocks.",
      "Each block captures essential transaction details like property information and ownership transfers.",
      "Verification process involves a decentralized network of participants, ensuring trust in property transactions.",
      "Cryptographic security safeguards sensitive information, providing a secure environment for real estate dealings.",
      "Immutability feature guarantees that once a property transaction is recorded, it cannot be altered.",
      "Transparent system allows all involved parties to view and verify real estate transactions.",
      "Integration of smart contracts automates and enforces terms of real estate agreements.",
      "Eliminates the need for a central authority in property transactions.",
      "Once a property transaction is recorded, it cannot be altered.",
      "Enhanced security reduces fraud risks, making blockchain an ideal solution for real estate data management."
    ]
  },
  {
    question: "What is ERC 1155?",
    answer: [
      "Standard for creating and managing fungible and non-fungible tokens on the Ethereum blockchain.",
      "Supports multiple token types within a single smart contract, providing efficiency and flexibility.",
      "Ideal for representing diverse real estate assets, such as properties, contracts, and ownership rights.",
      "Enables batch transfers, allowing multiple tokens to be sent in a single transaction, reducing gas costs.",
      "Provides a standardized interface for interacting with a variety of real estate-related assets in decentralized applications (DApps)."
    ]
  },
  {
    question: "What are tokens and NFTs?",
    answer: [
      "Tokens are digital representations of real-world assets, such as real estate, represented on the blockchain.",
      "Non-Fungible Tokens (NFTs) are a type of token that represents unique and indivisible assets, ensuring ownership authenticity.",
      "NFTs on our platform can represent exclusive real estate properties, providing a digital certificate of ownership.",
      "Tokenization allows for fractional ownership, enabling investors to own a portion of high-value properties.",
      "NFTs are stored securely on the blockchain, providing transparency and traceability of ownership for real estate transactions."
    ]
  },
  {
    question: "What is the working behind fractional ownership?",
    answer: [
      "Fractional ownership allows multiple investors to collectively own a high-value real estate asset.",
      "Each investor holds a percentage of the property, and profits and responsibilities are distributed proportionally.",
      "Smart contracts automate the fractional ownership process, ensuring transparency and security in transactions.",
      "Investors can buy, sell, or trade their ownership share, providing liquidity to the fractional real estate market.",
      "This democratizes access to real estate investments, making it accessible to a broader range of investors."
    ]
  },
  {
    question: "How do I make a profit from all this?",
    answer: [
      "Profit from fractional ownership by earning a share of rental income generated by the property.",
      "Property appreciation contributes to potential capital gains when selling your ownership share.",
      "Participate in real estate value appreciation without the need for significant capital investment.",
      "Trade or sell your ownership tokens on the platform to other investors, capturing potential profits.",
      "Our platform provides real-time insights into property performance, helping you make informed investment decisions."
    ]
  },
  {
    question: "How much do I need to start investing?",
    answer: [
      "Start investing with a minimum amount, as our platform allows fractional ownership of high-value properties.",
      "Investors can choose to invest in fractions of a property, making real estate accessible with a lower initial investment.",
      "Flexible investment options cater to a range of budgets, accommodating both small and large-scale investors.",
      "Our platform provides transparency on property values, helping you make informed decisions based on your budget.",
      "Explore different properties and investment opportunities to find the right fit for your financial goals."
    ]
  },
  {
    question: "Is this safe since I don't know the other fractional investors?",
    answer: [
      "All transactions and investments are securely recorded on the blockchain, ensuring transparency and immutability.",
      "Blockchain's decentralized nature eliminates the need for a central authority, reducing the risk of manipulation.",
      "Smart contracts automatically enforce the terms of agreements, providing a trustless environment.",
      "Your ownership details are cryptographically secured, preventing unauthorized access or alterations.",
      "The blockchain's transparent ledger allows you to independently verify all transactions and ownership records."
    ]
  }
];
const About = () => {
  return (
    <div className="container mx-auto p-8  ">
      <motion.h1 className="text-6xl font-bold mb-7 text-center" whileHover={{ scale: 1.05 }}>
        Welcome to OpenEstate!
      </motion.h1>

      <motion.p className="text-xl leading-relaxed mb-6" whileHover={{ scale: 1.02 }}>
        We leverage the power of blockchain technology to redefine property transactions. Our platform allows you to buy, sell, and rent real estate effortlessly
      </motion.p>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8" whileHover={{ scale: 1.02 }}>
        <motion.img
          src="blockchain.jpeg"
          alt="Blockchain Illustration"
          className="rounded-md object-cover w-full h-full"
        />
        <motion.p className="text-xl leading-loose">
          Our use of blockchain ensures transparency, security, and efficiency in every real estate transaction. Whether you're a seasoned investor or a first-time homebuyer, [Your Company Name] makes real estate accessible to everyone.
        </motion.p>
      </motion.div>

      <motion.h2 className="text-5xl font-bold mb-10 text-center" whileHover={{ scale: 1.05 }}>
        How does it work?
      </motion.h2>

      <motion.p className="text-xl leading-loose mb-20" whileHover={{ scale: 1.02 }}>
        <motion.span className="font-bold" whileHover={{ textDecoration: 'underline' }}>Renters/Buyers:</motion.span> We understand that finding the perfect rental is more than a search; it's a journey toward your ideal home. At OpenEstate, we've crafted a user-friendly platform that simplifies the rental process. Simply select any home you like and rent/buy it! We even offer tokens of estate for those who don't have a big budget. There's something for everyone 
      </motion.p>

      <motion.p className="text-xl leading-loose mb-20" whileHover={{ scale: 1.02 }}>
        <motion.span className="font-bold" whileHover={{ textDecoration: 'underline' }}>Sellers:</motion.span> If you're considering selling your property, you're in the right place. We empower sellers with a streamlined and transparent selling experience. All you need to do is upload your property documents and details on the website and relax. Via secure smart contracts, the payments will be delivered directly into your wallet!
      </motion.p>

      <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8" whileHover={{ scale: 1.02 }}>
        <motion.p className="text-xl leading-loose">
          Join us in revolutionizing the real estate industry. We are not just a platform; we are a community dedicated to making real estate transactions efficient, secure, and accessible to all.
        </motion.p>
        <motion.img
          src="/images/team-image.jpg"
          alt="Team Photo"
          className="rounded-md object-cover w-full h-full"
        />
      </motion.div>

      <motion.p className="text-xl leading-loose mb-6" whileHover={{ scale: 1.02 }}>
        Whether you dream of owning a home, expanding your investment portfolio, or participating in the future of real estate, OpenEstate is here to guide you every step of the way. Experience the possibilities with us.
      </motion.p>

      <div className="accordion" id="accordionExample">
                {accordionData.map((item, index) => (
                    <Accordion index={index} key={index} question={item.question} answer={item.answer} />
                ))}
            </div>
    </div>
  );
};

export default About;