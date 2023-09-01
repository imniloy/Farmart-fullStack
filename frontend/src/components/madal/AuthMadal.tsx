"use client";
import { setAuthMadalOpen } from "@/redux/features/uiSlider/slices";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import LoginImage from "../assets/images/login.jpeg";
import RegisterImage from "../assets/images/registration.webp";
import FarmartLogo from "./assets/svg/framart-logo-header.svg";
import Login from "./Login";
import Register from "./Register";

const AuthMadal = (): React.ReactElement => {
  const isOpen = useAppSelector((state) => state.mobileSlider.isAuthMadalOpen);
  const dispatch = useAppDispatch();

  function closeModal() {
    dispatch(setAuthMadalOpen(false));
  }

  console.log(isOpen);
  return (
    <Transition appear show={isOpen} as={Fragment}>
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
                <Login />
                {/* <Register /> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthMadal;
