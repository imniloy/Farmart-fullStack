import { PaginationType } from "@/types/pagination";
import Link from "next/link";
import React from "react";

const Pagination = ({
  pagination,
  searchParams,
  currentWebPageView,
}: {
  pagination: PaginationType;
  searchParams: { [key: string]: string | string[] | undefined };
  currentWebPageView: string;
}): React.ReactElement => {
  const { start, limit, total } = pagination;
  let { category, query, page: urlPageString, orders, products } = searchParams;
  if (!urlPageString) urlPageString = "1";

  let currentPage: number = 1;
  if (searchParams.page) currentPage = Number(searchParams.page);
  const totalPage: number = Math.ceil(total / limit);
  let offset: number = (currentPage - 1) * limit;

  // here i am making initial url ..
  // if (currentWebPageView === "user_dashboard") then check another condition that is if(orders) string exits then url will be *** `?orders=${orders}&` *** else url will be `?*** orders=all&` ***
  // if (currentWebPageView !== "user_dashboard") then url will be *** `?` ***...

  let url: string = "?";

  if (currentWebPageView === "user_dashboard") {
    if (orders) {
      url = `?orders=${orders}&`;
    } else {
      url = `?orders=all&`;
    }
  }

  if (currentWebPageView === "admin_dashboard") {
    if (products) {
      url = `?products=${products}&`;
    } else {
      url = "?products=all&";
    }
  }

  if (query && currentWebPageView === "user_products_page") {
    url = `${url}query=${query}&`;
  }

  if (category && currentWebPageView === "user_products_page") {
    url = `${url}category=${category}&`;
  }

  let paginationContent: Array<number> = [];
  for (let i = currentPage - 3; i <= currentPage + 3; i++) {
    if (i < 1) continue;
    if (i > totalPage) break;
    paginationContent.push(i);
  }

  return (
    <div
      className={`mt-10 flex items-center ${
        (currentWebPageView === "user_dashboard" ||
          "admin_dashboard" ||
          "admin_orders_information") &&
        "justify-start"
      } ${
        currentWebPageView === "user_products_page" && "justify-center"
      } space-x-1 sm:space-x-2`}
    >
      {/* previous-button */}
      {currentPage > 1 && (
        <Link
          href={`${url}page=${Number(urlPageString) - 1}`}
          className="flex items-center border border-black h-8 500px:h-10 hover:bg-brand-color hover:text-white transition-all p-2 rounded-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 500px:w-5 500px:h-5"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium mr-2 hidden sm:block">
            Previous
          </span>
        </Link>
      )}

      {paginationContent.map((page) => (
        <Link key={page} href={`${url}page=${page}`}>
          <div
            className={`h-8 w-8 500px:h-10 500px:w-10 ${
              Number(urlPageString) === page || currentPage === page
                ? "text-white bg-brand-color font-bold"
                : "hover:bg-brand-color hover:text-white font-medium "
            } border border-color-black text-sm transition-all rounded-sm flex justify-center items-center`}
          >
            <p>{page}</p>
          </div>
        </Link>
      ))}

      {currentPage < totalPage && (
        <Link
          href={`${url}page=${Number(urlPageString) + 1}`}
          className="flex items-center border border-color-black h-8 500px:h-10 hover:bg-brand-color hover:text-white transition-all p-2 rounded-sm"
        >
          <span className="text-sm font-medium ml-2  hidden sm:block">
            Next
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 500px:w-5 500px:h-5"
          >
            <path
              fillRule="evenodd"
              d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
