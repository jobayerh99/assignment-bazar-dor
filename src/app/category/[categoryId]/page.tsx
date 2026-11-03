
import React from "react";
import CategoryProducts from "@/components/CategoryProducts";
import { notFound } from "next/navigation";

interface CategoryPageProps {
    params: Promise<{
        categoryId: string;
    }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
    const { categoryId } = await params;

    // Fetch category products
    const res = await fetch(
        `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
    );

    if (!res.ok) {
        throw new Error("Failed to fetch category products");
    }

    const data = await res.json();

    if(!data){
        notFound()
    }

    // Ensure API response is an array
    const categoryProducts = Array.isArray(data) ? data : [];

    console.log("Category ID:", categoryId);
    console.log("Category Products:", categoryProducts);

    return (
        <CategoryProducts
            products={categoryProducts}
            categoryId={categoryId}
        />
    );
};

export default CategoryPage;
