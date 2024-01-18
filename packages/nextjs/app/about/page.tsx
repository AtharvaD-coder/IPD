'use client'
import React from 'react';

import { motion } from 'framer-motion';
import {FaceSmileIcon} from "@heroicons/react/24/solid";
// import blockchain from 'packages/nextjs/public/blockchain.jpeg';
import Accordion from '~~/components/custom_components/accordion';

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

      <motion.p className="text-xl leading-loose mb-6" whileHover={{ scale: 1.02 }}>
      <div id="accordion-open" data-accordion="open">
      {/* Accordion Item 1 */}
      <h2 id="accordion-open-heading-1">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-open-body-1"
          aria-expanded="true"
          aria-controls="accordion-open-body-1"
        >
          <span className="flex items-center">
            <svg
              className="w-5 h-5 me-2 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              ></path>
            </svg>
            What is blockchain and why use it here?
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            ></path>
          </svg>
        </button>
      </h2>
      <div id="accordion-open-body-1" className="hidden" aria-labelledby="accordion-open-heading-1">
              <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <ul className="list-disc list-inside">
            <li>Series of connected data blocks, forming a chain.</li>
            <li>Real estate transactions recorded in secure, connected data blocks.</li>
            <li>Each block captures essential transaction details like property information and ownership transfers.</li>
            <li>Verification process involves a decentralized network of participants, ensuring trust in property transactions.</li>
            <li>Cryptographic security safeguards sensitive information, providing a secure environment for real estate dealings.</li>
            <li>Immutability feature guarantees that once a property transaction is recorded, it cannot be altered.</li>
            <li>Transparent system allows all involved parties to view and verify real estate transactions.</li>
            <li>Integration of smart contracts automates and enforces terms of real estate agreements.</li>
            <li>Eliminates the need for a central authority in property transactions.</li>
            <li>Once a property transaction is recorded, it cannot be altered.</li>
            <li>Enhanced security reduces fraud risks, making blockchain an ideal solution for real estate data management.</li>
          </ul>
        </div>
      </div>


      <h2 id="accordion-open-heading-2">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-open-body-2"
          aria-expanded="false"
          aria-controls="accordion-open-body-2"
        >
          <span className="flex items-center">
            <svg
              className="w-5 h-5 me-2 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              ></path>
            </svg>
            What is ERC 1155?
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            ></path>
          </svg>
        </button>
      </h2>
      <div id="accordion-open-body-2" className="hidden" aria-labelledby="accordion-open-heading-2">
      <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
  <ul className="list-disc list-inside">
    <li>Standard for creating and managing fungible and non-fungible tokens on the Ethereum blockchain.</li>
    <li>Supports multiple token types within a single smart contract, providing efficiency and flexibility.</li>
    <li>Ideal for representing diverse real estate assets, such as properties, contracts, and ownership rights.</li>
    <li>Enables batch transfers, allowing multiple tokens to be sent in a single transaction, reducing gas costs.</li>
    <li>Provides a standardized interface for interacting with a variety of real estate-related assets in decentralized applications (DApps).</li>
  </ul>
</div>
      </div>


      <h2 id="accordion-open-heading-3">
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          data-accordion-target="#accordion-open-body-3"
          aria-expanded="false"
          aria-controls="accordion-open-body-3"
        >
          <span className="flex items-center">
            <svg
              className="w-5 h-5 me-2 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              ></path>
            </svg>
            What are tokens and NFTs?
          </span>
          <svg
            data-accordion-icon
            className="w-3 h-3 rotate-180 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            ></path>
          </svg>
        </button>
      </h2>
      <div id="accordion-open-body-3" className="hidden" aria-labelledby="accordion-open-heading-3">
      <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
  <ul className="list-disc list-inside">
    <li>Tokens are digital representations of real-world assets, such as real estate, represented on the blockchain.</li>
    <li>Non-Fungible Tokens (NFTs) are a type of token that represents unique and indivisible assets, ensuring ownership authenticity.</li>
    <li>NFTs on our platform can represent exclusive real estate properties, providing a digital certificate of ownership.</li>
    <li>Tokenization allows for fractional ownership, enabling investors to own a portion of high-value properties.</li>
    <li>NFTs are stored securely on the blockchain, providing transparency and traceability of ownership for real estate transactions.</li>
  </ul>
</div>


      </div>
      <h2 id="accordion-open-heading-4">
  <button
    type="button"
    className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
    data-accordion-target="#accordion-open-body-4"
    aria-expanded="false"
    aria-controls="accordion-open-body-4"
  >
    <span className="flex items-center">
      <svg
        className="w-5 h-5 me-2 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        ></path>
      </svg>
      What is the working behind fractional ownership?
    </span>
    <svg
      data-accordion-icon
      className="w-3 h-3 rotate-180 shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5 5 1 1 5"
      ></path>
    </svg>
  </button>
</h2>
<div id="accordion-open-body-4" className="hidden" aria-labelledby="accordion-open-heading-4">
  <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
    <ul className="list-disc list-inside">
      <li>Fractional ownership allows multiple investors to collectively own a high-value real estate asset.</li>
      <li>Each investor holds a percentage of the property, and profits and responsibilities are distributed proportionally.</li>
      <li>Smart contracts automate the fractional ownership process, ensuring transparency and security in transactions.</li>
      <li>Investors can buy, sell, or trade their ownership share, providing liquidity to the fractional real estate market.</li>
      <li>This democratizes access to real estate investments, making it accessible to a broader range of investors.</li>
    </ul>
  </div>
</div>

<h2 id="accordion-open-heading-5">
  <button
    type="button"
    className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
    data-accordion-target="#accordion-open-body-5"
    aria-expanded="false"
    aria-controls="accordion-open-body-5"
  >
    <span className="flex items-center">
      <svg
        className="w-5 h-5 me-2 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        ></path>
      </svg>
      How do I make a profit from all this?
    </span>
    <svg
      data-accordion-icon
      className="w-3 h-3 rotate-180 shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5 5 1 1 5"
      ></path>
    </svg>
  </button>
</h2>
<div id="accordion-open-body-5" className="hidden" aria-labelledby="accordion-open-heading-5">
  <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
    <ul className="list-disc list-inside">
      <li>Profit from fractional ownership by earning a share of rental income generated by the property.</li>
      <li>Property appreciation contributes to potential capital gains when selling your ownership share.</li>
      <li>Participate in real estate value appreciation without the need for significant capital investment.</li>
      <li>Trade or sell your ownership tokens on the platform to other investors, capturing potential profits.</li>
      <li>Our platform provides real-time insights into property performance, helping you make informed investment decisions.</li>
    </ul>
  </div>
</div>

<h2 id="accordion-open-heading-6">
  <button
    type="button"
    className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
    data-accordion-target="#accordion-open-body-6"
    aria-expanded="false"
    aria-controls="accordion-open-body-6"
  >
    <span className="flex items-center">
      <svg
        className="w-5 h-5 me-2 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        ></path>
      </svg>
      How much do I need to start investing?
    </span>
    <svg
      data-accordion-icon
      className="w-3 h-3 rotate-180 shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5 5 1 1 5"
      ></path>
    </svg>
  </button>
</h2>
<div id="accordion-open-body-6" className="hidden" aria-labelledby="accordion-open-heading-6">
  <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
    <ul className="list-disc list-inside">
      <li>Start investing with a minimum amount, as our platform allows fractional ownership of high-value properties.</li>
      <li>Investors can choose to invest in fractions of a property, making real estate accessible with a lower initial investment.</li>
      <li>Flexible investment options cater to a range of budgets, accommodating both small and large-scale investors.</li>
      <li>Our platform provides transparency on property values, helping you make informed decisions based on your budget.</li>
      <li>Explore different properties and investment opportunities to find the right fit for your financial goals.</li>
    </ul>
  </div>
</div>

{/* Accordion Item 4 */}
<h2 id="accordion-open-heading-4">
  <button
    type="button"
    className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
    data-accordion-target="#accordion-open-body-4"
    aria-expanded="false"
    aria-controls="accordion-open-body-4"
  >
    <span className="flex items-center">
      <svg
        className="w-5 h-5 me-2 shrink-0"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        ></path>
      </svg>
      Is this safe since I don't know the other fractional investors?
    </span>
    <svg
      data-accordion-icon
      className="w-3 h-3 rotate-180 shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5 5 1 1 5"
      ></path>
    </svg>
  </button>
</h2>
<div id="accordion-open-body-4" className="hidden" aria-labelledby="accordion-open-heading-4">
  <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
    <ul className="list-disc list-inside">
      <li>All transactions and investments are securely recorded on the blockchain, ensuring transparency and immutability.</li>
      <li>Blockchain's decentralized nature eliminates the need for a central authority, reducing the risk of manipulation.</li>
      <li>Smart contracts automatically enforce the terms of agreements, providing a trustless environment.</li>
      <li>Your ownership details are cryptographically secured, preventing unauthorized access or alterations.</li>
      <li>The blockchain's transparent ledger allows you to independently verify all transactions and ownership records.</li>
    </ul>
  </div>
</div>

    </div>
      </motion.p>
    </div>
  );
};

export default About;
