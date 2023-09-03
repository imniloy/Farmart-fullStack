"use client";
import { PUBLIC_App_URL } from "@/urls";
import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  WhatsappShareButton,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";

const ShareOptions = ({ name }: { name: string }) => {
  const url = window.location.href;
  return (
    <div className="absolute shadow-lg rounded-md right-0 p-4 bg-white">
      <p className="text-sm text-gray-600 font-inter font-semibold mb-2">
        Share in social network
      </p>
      <p className="text-gray-500 text-xs mb-5">
        To reach the highest traffic view share this product
      </p>

      <div className="flex items-center">
        <FacebookShareButton className="w-fit h-fit" url={url} quote={name}>
          <BsFacebook className="h-8 w-8 text-blue-500" />
        </FacebookShareButton>

        <TwitterShareButton className="w-fit h-fit" url={url} title={name}>
          {/* <div className="h-8 w-8 rounded-full "></div> */}
          <AiFillTwitterCircle className="h-9 w-9 text-sky-500" />
        </TwitterShareButton>

        {/* <LinkedinShareButton url={url} summary={name} title={name}>
          <LinkedinIcon size={36} round={true} />
        </LinkedinShareButton>

        <TwitterShareButton url={url} title={name}>
          <TwitterIcon size={36} round={true} />
        </TwitterShareButton>

        <WhatsappShareButton url={url} title={name}>
          <WhatsappIcon size={36} round={true} />
        </WhatsappShareButton> */}
      </div>
    </div>
  );
};

export default ShareOptions;
