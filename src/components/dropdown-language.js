import React from "react";
import { Link } from "gatsby"
import { createPopper } from "@popperjs/core";
import { FormattedMessage } from 'react-intl'

const LanguageDropdown = ({ langs = [] }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end"
    })
    setDropdownPopoverShow(true);
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  }
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
          <FormattedMessage id="Translations" defaultMessage="Translations"/>
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
          langs.filter(lang => !lang.selected).map(lang => (
            <Link 
              className={
                `text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-gray-800 hover:bg-primary hover:text-white ${lang.selected ? 'bg-primary text-white' : ''}`
              }
              to={lang.url} key={lang.langKey}>
                <FormattedMessage id={lang.langKey} />
            </Link>
          ))

        }
      </div>
    </>
  );
};

export default LanguageDropdown;
