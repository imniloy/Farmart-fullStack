import AllProductsSection from "@/components/AllProducts/AllProductsSection";
import CategoriesSidebar from "@/components/AllProducts/CategoriesSidebar";
import { getAllCategories } from "@/services/category";
import { getAllProducts } from "@/services/product";
import { Categories, Category } from "@/types/Categories";
import { ProductsDataType } from "@/types/pagination";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Farmart | Products",
  description:
    "Farmart - Leading Grocery App in Bangladesh developed by Niloy Kumar Das",
};

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const categoriesData: Categories = await getAllCategories();
  const { data: categories, success }: { data: Category[]; success: boolean } =
    categoriesData;

  const { category, query, page } = searchParams;
  const ProductsData: ProductsDataType = await getAllProducts({
    category,
    query,
    page,
  });
  const { data, meta } = ProductsData;

  return (
    <main className="bg-white">
      <section className="py-10 lg:pb-14 bg-gray-50">
        <div className="section-container">
          <div className="flex items-start w-full space-x-0 lg:space-x-8">
            <CategoriesSidebar categories={categories} />
            <AllProductsSection
              searchParams={searchParams}
              pagination={meta.pagination}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
