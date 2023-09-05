import { BreadCumb } from "@/types/breadCumbs";
import Link from "next/link";
import React from "react";

const BreadCumbs = ({
  breadcumbs,
}: {
  breadcumbs: BreadCumb[];
}): React.ReactNode => {
  return (
    <div className="Breadcrumbs-container-element w-full py-4 sm:py-6">
      <ol className="flex items-center space-x-1">
        {breadcumbs.map((b: BreadCumb, i) => (
          <li
            key={i}
            className="flex items-center text-sm transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-medium"
          >
            <Link
              href={b.url}
              className="text-xs 500px:text-sm sm:text-base flex items-center space-x-[6px]"
            >
              {b.name === "Home" && b.url === "/" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <p>{b.name}</p>
            </Link>

            {b.name === "Home" && b.url === "/" && (
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default BreadCumbs;
