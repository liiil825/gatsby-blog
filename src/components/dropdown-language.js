import React from "react";
import { Link } from "gatsby"
import Popper from "popper.js";

const Language = ({ langs = [] }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end"
    })
    setDropdownPopoverShow(true);
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  }
  console.log('nav:', langs)
  return (
    <>
      <a
        className="text-gray-600 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={e => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          Language
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
        }
        style={{ minWidth: "12rem" }}
      >
        {
          langs.map(lang => (
            <Link 
              className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800"
              }
              to={lang.link} key={lang.langKey}>
                {lang.langKey}
            </Link>
          ))

        }
      </div>
    </>
  );
};

export default Language;
