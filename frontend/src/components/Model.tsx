import type React from "react";

interface Prop{
  isOpen:   boolean;
  onClose: () => void;
  children?:React.ReactNode    ;
}

const Modal = ({ isOpen, onClose, children }:Prop) => {

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">

          <div className="fixed inset-0 bg-black opacity-50" ></div>

          <div className="absolute top-[50%] right-[50%] bg-gray-600 p-4 rounded-lg z-10 text-right  transform-[translate(50%,-50%)] ">
            <button
              className=" font-semibold text-lg hover:cursor-pointer hover:text-gray-300 focus:outline-none mr-2"
              onClick={onClose}
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;