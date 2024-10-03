"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { ArttooLogo, ArttooLogoBlack } from "@/assets/images";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const navlinks = [
  {
    title: "Artworks",
    link: "#",
  },
  {
    title: "Learn",
    link: "#",
  },
  {
    title: "About",
    link: "#",
  },
  {
    title: "Contact us",
    link: "#",
  },
];
const Header = () => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const tl = gsap.timeline();
  useGSAP(() => {
    tl.to("#nav-container img", {
      y: -10,
      opacity: 1,
      duration: 0.3,
    });
    tl.to("#nav-container div a", {
      y: -10,
      opacity: 1,
      duration: 0.2,
      stagger: 0.05,
    });
  });

  useEffect(() => {
    if (openDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openDrawer]);

  return (
    <>
      <header
        id="header"
        className=" h-fit fixed top-0 z-10 left-1/2 -translate-x-1/2  w-full"
      >
        <div
          id="nav-container"
          className="flex justify-between w-[90vw] sm:w-[85vw] py-8 mx-auto"
        >
          <Image src={ArttooLogo} alt="logo" className="w-[160px] opacity-0" />

          <button
            onClick={() => setOpenDrawer(true)}
            className="block sm:hidden text-white"
          >
            <Menu id="menu" />
          </button>
          <div className="hidden sm:flex gap-16 text-white font-poppins font-medium">
            {navlinks.map((link, index) => {
              return (
                <Link key={index} href={link.link} className="opacity-0">
                  {link.title}
                </Link>
              );
            })}
          </div>
        </div>
      </header>
      <SideDrawer open={openDrawer} close={() => setOpenDrawer(false)} />
    </>
  );
};

const SideDrawer = ({ open, close }: { open: boolean; close: () => void }) => {
  return (
    <div
      className={`${
        open ? "right-0" : "right-[-100%]"
      } h-screen max-w-[640px] w-full space-y-12 shadow-lg bg-white z-50 fixed top-0 transition-all duration-500 ease-out`}
    >
      <div className="flex justify-between mt-12 px-4">
        <Image src={ArttooLogoBlack} alt="logo" className="w-[120px]" />
        <button onClick={close} className="">
          <X />
        </button>
      </div>
      <div className="gap-8 text-[18px] flex flex-col px-4 py-4 font-poppins ">
        {navlinks.map((link, index) => {
          return (
            <Link
              className="text-[32px] leading-[48px]"
              key={index}
              href={link.link}
            >
              {link.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
