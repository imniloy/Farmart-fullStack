"use client";
import { Category } from "@/types/Categories";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";

const MobileCategoriesSideBar = ({
  categories,
}: {
  categories: Category[];
}): React.ReactElement => {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[100] min-h-screen"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 min-h-screen z-[1] block lg:hidden" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto bg-transparent z-[100] block lg:hidden">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel
              autoFocus
              className="w-full min-h-screen max-w-xs sm:max-w-[350px] transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all"
            ></Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MobileCategoriesSideBar;
