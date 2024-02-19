"use client";

// import React, { useCallback, useRef, useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/solid";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
// import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { AnimatePresence, motion } from "framer-motion";
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <motion.div  whileHover={{
      scale: 1.1,
      transition: { duration: 0.1 },
    }}
    >

    <Link
      href={href}
      passHref
      className={`
      py-1.5 px-3 text-sm rounded-full gap-2 flex text-white hover:underline underline-offset-4 decoration-2 focus:underline`}
      >
      {children}
    </Link>
      </motion.div>
  );
};

// /**
//  * Site header
//  */
// export const Header = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const burgerMenuRef = useRef<HTMLDivElement>(null);
//   useOutsideClick(
//     burgerMenuRef,
//     useCallback(() => setIsDrawerOpen(false), []),
//   );

//   const navLinks = (
//     <>
//       <li>
//         <NavLink href="/">
//           <UserIcon className="h-4 w-4" />
//           Home
//         </NavLink>
//       </li>
//       <li>
//         <NavLink href="/listRealEstate">
//           <HomeIcon className="h-4 w-4" />
//           <span className="hover:text-secondary-content focus:text-secondary-content">List Real Estate</span>
//         </NavLink>
//       </li>

//       <li>
//         <NavLink href="/realEstates">
//           <MagnifyingGlassIcon className="h-4 w-4" />
//           <span className="hover:text-secondary-content focus:text-secondary-content">Search Estates</span>
//         </NavLink>
//       </li>

//       <li>
//         <NavLink href="/about">
//           <UserGroupIcon className="h-4 w-4" />
//           <span className="hover:text-secondary-content focus:text-secondary-content">About us</span>
//         </NavLink>
//       </li>
//     </>
//   );

//   return (
//     <div className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
//       <div className="navbar-start w-auto lg:w-1/2">
//         <div className="lg:hidden dropdown" ref={burgerMenuRef}>
//           <label
//             tabIndex={0}
//             className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
//             onClick={() => {
//               setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
//             }}
//           >
//             <Bars3Icon className="h-1/2" />
//           </label>
//           {isDrawerOpen && (
//             <ul
//               tabIndex={0}
//               className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
//               onClick={() => {
//                 setIsDrawerOpen(false);
//               }}
//             >
//               {navLinks}
//             </ul>
//           )}
//         </div>
//         <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6">
//           <div className="flex relative w-10 h-10">
//             <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
//           </div>
//           <div className="flex flex-col">
//             <span className="font-bold leading-tight">OpenEstate</span>
//             <span className="text-xs">Your Gateway to Digital Ownership</span>
//           </div>
//         </Link>
//         <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
//       </div>
//       <div className="navbar-end flex-grow mr-4">
//         <RainbowKitCustomConnectButton />
//         <FaucetButton />
//       </div>
//     </div>
//   );
// };





import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import { useScrollDirection } from "~~/hooks/scrollDirection";
import Image from "next/image";
import Logo from "./logo";

const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#', icon: ChartPieIcon },
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#', icon: FingerPrintIcon },
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Header() {
  const isNearTop = useScrollDirection();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  console.log(isNearTop,"isNea")

  return (
    <AnimatePresence>
    {isNearTop && <motion.header initial={{opacity:0,height:0}} animate={{opacity:1, height:'100px'}} exit={{opacity:0,height:0}} transition={{duration:0.5}}  className={`bg-primary sticky top-0 z-50 rounded-b-md`} style={{position: 'fixed', width: '100%', zIndex: '999'}}>
      <div className="mx-auto flex  items-center justify-around p-0 lg:px-8" aria-label="Global">
        <div>
          <a href="#" className="-m-1.5 p-1.5">
            <Logo />
          </a>
        </div>
        <div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <NavLink href="/">
              <UserIcon className="h-4 w-4" />
              Home
            </NavLink>

            <NavLink href="/listRealEstate">
              <HomeIcon className="h-4 w-4" />
              <span className="hover:text-secondary-content focus:text-secondary-content">List Real Estate</span>
            </NavLink>

            <NavLink href="/realEstates">
              <MagnifyingGlassIcon className="h-4 w-4" />
              <span className="hover:text-secondary-content focus:text-secondary-content">Search Estates</span>
            </NavLink>

            <NavLink href="/about">
              <UserGroupIcon className="h-4 w-4" />
              <span className="hover:text-secondary-content focus:text-secondary-content">About us</span>
            </NavLink>
          </Popover.Group>
        </div>

        {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div> */}
        <div className="  flex  mr-4 w-fit">
          <RainbowKitCustomConnectButton />
          <FaucetButton />
        </div>
      </div>

    </motion.header>
}
    </AnimatePresence>
  )
}











