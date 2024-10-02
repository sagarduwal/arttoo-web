import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="w-[90vw] mx-auto sm:w-[85vw] flex flex-col gap-8 py-16">
        <h3 className="text-white md:text-[60px] text-[30px] leading-[39.3px] sm:text-[44px] sm:leading-[51.23px] font-medium md:leading-[78.6px]">
          Ready to Own <span className="italic">Your Piece of History?</span>
        </h3>

        <div className="flex gap-2 flex-col font-poppins">
          <div className="border border-white rounded-full p-1 max-w-[400px] w-full flex">
            <input
              type="email"
              className="focus:outline-none bg-transparent px-4 py-2 w-full text-white"
              placeholder="johndoe@gmail.com"
            />
            <button className="bg-[#E4FF1A] px-4 py-2 rounded-full text-black font-">
              Submit
            </button>
          </div>
          <p className="text-white leading-[19.2px]  font-light">
            Join the Waitlist & Get Informed when New Artworks are Available!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
