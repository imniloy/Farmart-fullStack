"use client";
import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { toast } from "react-toastify";

type State = {
  name: string;
  description: string;
  price: string;
  original_price: string;
  stock: string;
};

const AddProduct = () => {
  const [state, setState] = useState<State>({
    name: "",
    description: "",
    price: "",
    original_price: "",
    stock: "",
  });

  const [thumbnailImageFiles, setThumbnailImageFiles] = useState<File[] | File>(
    []
  );
  const [showThumbnailImage, setShowThumbnailImage] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [showImagesFiles, setShowImagesFiles] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [categories, setCategories] = useState<Number>(0);
  const [err, setErr] = useState<string>("");

  const inputHandle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // imageHandler is responsible for handling slide images...
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let images: File[] = [];
    let imagesUrl: string[] = [];
    let length = e.target.files?.length ? e.target.files.length : 0;

    for (let i = 0; i < length; i++) {
      if ((i == 0 || i == 1) && e.target.files?.length) {
        let img = e.target.files[i];
        let url = URL.createObjectURL(img);
        images.push(img);
        imagesUrl.push(url);
      }
    }

    // if()
    console.log(imagesUrl);
    console.log(images);
  };

  // thumbNailHandler is responsible for handling thumbNail image...
  const thumbNailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      let imgFile = e.target.files[0];
      let imgUrl = URL.createObjectURL(imgFile);
      setThumbnailImageFiles(imgFile);
      setShowThumbnailImage(imgUrl);
    }
  };

  return (
    <section className="relative bg-[#f9fafb]">
      <div className="section-container">
        <div className="px-2 lg:px-0 py-8 md:py-10 lg:py-12 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col lg:space-y-0">
          <div className="personal_Information_Form space-y-4">
            <h2 className="font-semibold text-gray-700 pb-4 text-lg">
              Add New Product
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 md:space-y-6">
                <div className="w-full">
                  <label
                    className="block text-gray-500 text-sm leading-none mb-3"
                    htmlFor="name"
                  >
                    Name
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={state.name}
                    onChange={inputHandle}
                    className="py-2 px-3 appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-emerald-500 h-11 md:h-12 w-full"
                    placeholder="John"
                  />
                </div>

                {/* description */}
                <div className="w-full">
                  <label
                    className="block text-gray-500 text-sm leading-none mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    autoCorrect="on"
                    placeholder="Enter description"
                    id="description"
                    name="description"
                    rows={6}
                    value={state.description}
                    onChange={inputHandle}
                    className="py-2 px-3 resize-none appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-300 focus:outline-none focus:border-emerald-500 w-full"
                  ></textarea>
                </div>

                {/* images */}
                <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 lg:grid-rows-1 gap-4 lg:gap-6 auto-rows-min">
                  <div className="space-y-4">
                    <div>
                      <p className="block text-gray-500 text-sm leading-none mb-3">
                        Thumbnail Image <span className="text-red-500">*</span>
                      </p>
                      <label
                        htmlFor="thubmnail"
                        className="flex justify-center items-center flex-col h-[220px] cursor-pointer border border-dashed border-gray-500 text-[#6b7280] w-full"
                      >
                        <span>
                          <BsImages />
                        </span>
                        <span className="mt-1">Select image</span>
                      </label>
                      <input
                        hidden
                        accept="image/png, image/WebP, image/jpeg, image/avif"
                        type="file"
                        id="thubmnail"
                        name="thubmnail"
                        onChange={thumbNailHandler}
                      />
                    </div>
                    {showThumbnailImage && (
                      <div className="relative h-[180px] lg:h-[220px]">
                        <label htmlFor="0">
                          <img
                            src={showThumbnailImage}
                            className="w-full h-full absolute object-cover"
                            alt=""
                            id="0"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="h-fit">
                      <p className="block text-gray-500 text-sm leading-none mb-3">
                        Select Silder images (Maximum first two images will be
                        shown)
                      </p>
                      <label
                        htmlFor="images"
                        className="flex justify-center items-center flex-col h-[220px] cursor-pointer border border-dashed border-gray-500 text-[#6b7280] w-full"
                      >
                        <span>
                          <BsImages />
                        </span>
                        <span className="mt-1">Select image</span>
                      </label>
                      <input
                        hidden
                        multiple
                        accept="image/png, image/WebP, image/jpeg, image/avif"
                        type="file"
                        name="images"
                        id="images"
                        onChange={imageHandler}
                      />
                    </div>
                    <div className="space-x-4">
                      {showImagesFiles.length > 0 && (
                        <div
                          className={`relative grid grid-cols-[${showImagesFiles.length}]`}
                        >
                          {showImagesFiles.map((img) => (
                            <img
                              src={img}
                              className="w-1/2 object-cover h-[180px] lg:h-[220px]"
                              alt=""
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* price and original price */}
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 md:gap-6">
                  <div className="w-full">
                    <label
                      className="block text-gray-500 text-sm leading-none mb-2"
                      htmlFor="price"
                    >
                      Price<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      required
                      value={state.price}
                      onChange={inputHandle}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                      placeholder="John"
                    />
                  </div>

                  <div className="w-full">
                    <label
                      className="block text-gray-500 text-sm leading-none mb-2"
                      htmlFor="original_price"
                    >
                      Original Price
                    </label>
                    <input
                      type="text"
                      id="original_price"
                      required
                      name="original_price"
                      value={state.original_price}
                      onChange={inputHandle}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                      placeholder="Duo"
                    />
                  </div>
                </div>
                {/* stock and category */}
                <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 gap-4 md:gap-6">
                  <div className="w-full">
                    <label
                      className="block text-gray-500  text-sm leading-none mb-3"
                      htmlFor="stock"
                    >
                      Stock<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="stock"
                      name="stock"
                      required
                      value={state.stock}
                      onChange={inputHandle}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                      placeholder="100"
                    />
                  </div>

                  <div className="w-full relative">
                    <p className="block text-gray-500  text-sm leading-none mb-3">
                      Category<span className="text-red-500">*</span>
                    </p>
                    <div
                      onClick={() => {
                        setShowCategories(!showCategories);
                      }}
                      className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12 cursor-pointer"
                    >
                      <div className="w-full h-full flex justify-between items-center">
                        {categories === 0 ? "Select Category" : `${categories}`}
                        <AiFillCaretDown className="text-gray-500" />
                      </div>
                    </div>

                    {showCategories && (
                      <div className="shadow-lg absolute w-full h-fit max-h-[200px] overflow-y-auto ">
                        {[1, 2, 3, 4, 5, 6, 7]?.map((value) => (
                          <div className="w-full px-4 md:px-6 py-3 bg-white border-gray-100 flex items-center justify-start cursor-pointer  border">
                            {value}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="ml-auto w-full md:w-fit mt-10 block px-10 py-3 bg-emerald-500 font-bold text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
