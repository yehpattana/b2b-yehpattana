import EmailIcon from "@mui/icons-material/Email";

import React from "react";
export default function Footer() {
  return (
    // <footer className="bg-primary">
    //   <div className="w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-between bg-primary">
    //     <div className="text-sm text-white sm:text-center w-1/3">
    //       <h1 className="text-center text-lg font-semibold font-sans text-white">
    //         YMT innovation
    //       </h1>
    //     </div>
    //     <div className="w-1/3 flex flex-wrap items-center text-sm font-medium text-white sm:mt-0">
    //       <div className="flex pl-2 pt-3 pr-3">
    //         <div className="flex items-center">
    //           <h1 className="text-xl mr-2 font-semibold font-sans text-white">
    //             contact{" "}
    //           </h1>
    //           <div className="flex items-center justify-center text-white bg-gray-700">
    //             <EmailIcon />
    //           </div>
    //           <div className="bg-gray-600 text-white p-3">
    //             <h1>support@ymtinnovation.com</h1>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="w-full mx-auto max-w-screen-xl p-3 md:flex md:items-center md:justify-between bg-primary">
    //     <span className="text-sm text-white sm:text-center ">
    //       © 2024{" "}
    //       <a href="https://flowbite.com/" className="hover:underline">
    //         YMT innovation
    //       </a>
    //       . All Rights Reserved.
    //     </span>
    //     <ul className="w-1/3 flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
    //       <li>
    //         <a href="#" className="hover:underline me-4 md:me-6 p-3">
    //           About
    //         </a>
    //       </li>
    //       <li>
    //         <a href="#" className="hover:underline me-4 md:me-6 p-3">
    //           Privacy Policy
    //         </a>
    //       </li>
    //       <li>
    //         <a href="#" className="hover:underline me-4 md:me-6 p-3">
    //           Licensing
    //         </a>
    //       </li>
    //       <li>
    //         <a href="#" className="hover:underline p-3">
    //           Contact
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </footer>
    <footer className="bg-primary text-white">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        {/* Branding Section */}
        <div className="text-sm text-white sm:text-center w-full md:w-1/3 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-center">YMT Innovation</h1>
        </div>

        {/* Contact Section */}
        <div className="w-full md:w-1/3 flex flex-wrap items-center text-sm font-medium mb-4 md:mb-0">
          <div className="flex items-center space-x-2 md:space-x-3">
            <h1 className="text-xl font-semibold">Contact</h1>
            <div className="flex items-center justify-center bg-gray-700 p-2 rounded-full">
              <EmailIcon />
            </div>
            <div className="bg-gray-600 p-2 rounded">
              <h1>support@ymtinnovation.com</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mx-auto max-w-screen-xl p-3 md:flex md:items-center md:justify-between">
        {/* Footer Bottom Section */}
        <span className="text-sm text-white text-center md:text-left">
          © 2024{" "}
            YMT Innovation. All Rights Reserved.
        </span>
        <ul className="w-full flex flex-wrap items-center justify-center md:justify-end mt-3 text-sm font-medium space-y-2 md:space-y-0 md:space-x-4">
          <li>
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
