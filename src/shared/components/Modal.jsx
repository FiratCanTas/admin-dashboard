import React from "react";

const Modal = ({ title, buttonTitle, onClose, children }) => {
  return (
    <div>
      <button
        className="cursor-pointer bg-gray-200 rounded-sm border text-nowrap px-2 py-1 shadow"
        command="show-modal"
        commandfor="dialog"
      >
        {buttonTitle}
      </button>

      <dialog className="rounded-lg m-auto p-4" id="dialog">
        <div>
          <p>{title}</p>
        </div>

        <hr className="my-4" />
        <div>{children}</div>
        <div>
          <button
            className=" cursor-pointer bg-red-200 rounded-md text-nowrap px-2 outline-1 mt-2  w-full"
            commandfor="dialog"
            command="close"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
