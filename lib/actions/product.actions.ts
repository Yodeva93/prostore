'use server';
import { PrismaClient } from "@prisma/client";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// Get latest products
const prisma = new PrismaClient();
export async function getLatestProducts() {
    
    const data = await prisma.product.findMany({
        take: LATEST_PRODUCTS_LIMIT,
        orderBy: { createdAt: 'desc' },
    });

    return convertToPlainObject(data);
}

// Get single product by slug
export async function getProductBySlug(slug: string) {
    return await prisma.product.findFirst({
        where: { slug: slug },
    });
}