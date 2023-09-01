"use client";
import {
  setAuthMadalOpen,
  setIsRegisterOpen,
} from "@/redux/features/uiSlider/slices";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthMadal = (): React.ReactElement => {
  const sliderState = useAppSelector((state) => state.mobileSlider);
  const { isAuthMadalOpen, isLoginOpen, isRegisterOpen } = sliderState;
  const dispatch = useAppDispatch();

  function closeModal() {
    dispatch(setAuthMadalOpen(false));
    dispatch(setIsRegisterOpen(false));
  }

  return (
    <Transition appear show={isAuthMadalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-125"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-90"
            >
              <Dialog.Panel className="relative w-full max-w-[95%] sm:max-w-[520px] md:max-w-[700px] lg:max-w-[920px] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all h-fit">
                <div
                  className="absolute ring-2 ring-[#02b290] ring-opacity-70 top-2 sm:top-4 right-2 sm:right-4 rounded-full overflow-hidden p-[2px] cursor-pointer"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-700"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </div>
                {isLoginOpen && <Login />}
                {isRegisterOpen && <Register />}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthMadal;
