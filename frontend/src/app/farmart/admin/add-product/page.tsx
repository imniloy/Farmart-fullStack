"use client";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { Categories, Category } from "@/types/Categories";
import { product } from "@/types/products";

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

  const [thumbnailImageFiles, setThumbnailImageFiles] = useState<File[]>([]);
  const [showThumbnailImage, setShowThumbnailImage] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [showImagesFiles, setShowImagesFiles] = useState<string[]>([]);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cat, setCat] = useState<Category>();
  const [err, setErr] = useState<string>("");

  const inputHandle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // imageHandler is responsible for handling slide images...
  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    let images: File[] = [];
    let imagesUrl: string[] = [];
    let length = e.target.files?.length;

    for (let i = 0; i < length; i++) {
      if (e.target.files?.length) {
        let img = e.target.files[i];
        let url = URL.createObjectURL(img);
        images.push(img);
        imagesUrl.push(url);
      } else {
        return;
      }
    }
    setImageFiles([...imageFiles, ...images]);
    setShowImagesFiles([...showImagesFiles, ...imagesUrl]);
  };

  const imageUpdateHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    if (!e.target.files?.length) return;
    const file: File = e.target.files[0];
    const updatedFileUrl = URL.createObjectURL(file);
    const imgFiles = [...imageFiles];
    const imgUrls = [...showImagesFiles];
    const findImgFileIndex = imgFiles.findIndex((_, index) => index === i);
    const findImgUrlIndex = imgUrls.findIndex((_, index) => index === i);
    imgFiles[findImgFileIndex] = file;
    imgUrls[findImgUrlIndex] = updatedFileUrl;
    setImageFiles(imgFiles);
    setShowImagesFiles(imgUrls);
  };

  const removeImages = (i: number) => {
    const imgFiles = [...imageFiles];
    const imgUrls = [...showImagesFiles];
    const updatedimgFiles = imgFiles.filter((_, index) => index !== i);
    const updatedimgUrls = imgUrls.filter((_, index) => index !== i);
    setImageFiles(updatedimgFiles);
    setShowImagesFiles(updatedimgUrls);
  };

  // thumbNailHandler is responsible for handling thumbNail image...
  const thumbNailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      let imgFile = e.target.files[0];
      let imgUrl = URL.createObjectURL(imgFile);
      setThumbnailImageFiles([imgFile]);
      setShowThumbnailImage([imgUrl]);
    }
  };
  // remove thambnail...
  const removeThumbnail = () => {
    setThumbnailImageFiles([]);
    setShowThumbnailImage([]);
  };

  const resetState = () => {
    setState({
      name: "",
      description: "",
      price: "",
      original_price: "",
      stock: "",
    });
    setImageFiles([]);
    setShowImagesFiles([]);
    setShowThumbnailImage([]);
    setThumbnailImageFiles([]);
    setCat(undefined);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cat) {
      toast.error("Product must have a category");
      return;
    }
    if (imageFiles?.length > 2) {
      toast.error("Only two images are allowed to be uploaded");
      return;
    }

    const formData = new FormData();
    const data = {
      name: state.name,
      description: state.description,
      price: Number(state.price),
      original_price: state.original_price?.length
        ? state.original_price
        : null,
      stock: state.stock,
      category: cat.id,
      slug: crypto.randomUUID(),
    };

    formData.append("data", JSON.stringify(data));

    for (let i = 0; i < thumbnailImageFiles.length; i++) {
      formData.append(
        "files.thumbnail",
        thumbnailImageFiles[i],
        thumbnailImageFiles[i].name
      );
    }

    const length = imageFiles.length > 2 ? 2 : imageFiles.length;
    for (let i = 0; i < length; i++) {
      formData.append("files.images", imageFiles[i], imageFiles[i].name);
    }

    try {
      const response = await fetch("http://localhost:1337/api/products", {
        method: "POST",
        cache: "no-cache",
        body: formData,
      });

      const { data }: { data: product } = await response.json();

      if (data?.id) {
        toast.success(`${data.attributes.name} added successfully`);

        resetState();
      }
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:1337/api/categories?`, {
          method: "GET",
          cache: "no-store",
        });

        if (response.ok) {
          const { data }: { data: Category[] } = await response.json();
          // You can now use the 'data' variable with the response data.
          setCategories(data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.log("An error occurred while fetching categories data", error);
      }
    };

    fetchData();
  }, []);

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
                    {showThumbnailImage.length > 0 && (
                      <div className="relative h-[180px] lg:h-[220px] cursor-pointer">
                        <MdDelete
                          onClick={() => removeThumbnail()}
                          className="h-8 w-8 absolute cursor-pointer top-2 right-2 text-black shadow-lg"
                        />
                        <label htmlFor="thubmnail">
                          <img
                            src={showThumbnailImage[0]}
                            className="h-full w-full object-contain"
                            alt="thubmnail"
                          />
                        </label>
                        <input
                          type="file"
                          hidden
                          id="thubmnail"
                          name="thubmnail"
                          accept="image/png, image/WebP, image/jpeg, image/avif"
                          onChange={thumbNailHandler}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="h-fit">
                      <p className="block text-gray-500 text-sm leading-none mb-3">
                        Select Silder images{" "}
                        <span className="text-red-500">
                          (First two images will be uploaded)
                        </span>
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
                        multiple
                        hidden
                        className={`${
                          imageFiles?.length <= 2 ? "cursor-none" : ""
                        }`}
                        accept="image/png, image/WebP, image/jpeg, image/avif"
                        type="file"
                        name="images"
                        id="images"
                        onChange={imageHandler}
                      />
                    </div>
                    <div className="space-x-4">
                      {showImagesFiles.length > 0 && (
                        <div className={`relative grid grid-cols-2 gap-4`}>
                          {showImagesFiles.map((img, i) => (
                            <div
                              className="relative w-full h-[180px] lg:h-[220px] overflow-hidden rounded-lg"
                              key={i}
                            >
                              <MdDelete
                                onClick={() => removeImages(i)}
                                className="h-8 w-8 absolute cursor-pointer top-2 right-2 text-black"
                              />

                              <label htmlFor={`${i}`}>
                                <img
                                  src={img}
                                  className="w-full h-full object-cover rounded-lg"
                                  alt=""
                                />
                              </label>
                              <input
                                type="file"
                                id={`${i}`}
                                hidden
                                accept="image/png, image/WebP, image/jpeg, image/avif"
                                onChange={(
                                  e: React.ChangeEvent<HTMLInputElement>
                                ) => imageUpdateHandler(e, i)}
                              />
                            </div>
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
                        {categories.length > 0 && cat
                          ? `${cat.attributes.name}`
                          : "Select Category"}
                        <AiFillCaretDown className="text-gray-500" />
                      </div>
                    </div>

                    {showCategories && (
                      <div className="shadow-lg absolute w-full h-fit max-h-[200px] overflow-y-auto ">
                        {categories?.map((c) => (
                          <div
                            key={c.id}
                            className="w-full px-4 md:px-6 py-3 bg-white border-gray-100 flex items-center justify-start cursor-pointer  border"
                            onClick={() => {
                              setCat(c);
                              setShowCategories(false);
                            }}
                          >
                            {c.attributes.name}
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

// https://youtu.be/54_SKMmrJkA
