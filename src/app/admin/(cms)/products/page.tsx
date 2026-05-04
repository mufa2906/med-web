import { desc } from "drizzle-orm";
import { getDb } from "@/db/client";
import { products } from "@/db/schema";
import { ProductsTable } from "@/components/admin/products-table";

export default async function AdminProductsPage() {
  const list = await getDb().select().from(products).orderBy(desc(products.createdAt));

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Produk</h1>
      <p className="mt-1 text-muted-foreground">Kelola katalog alat kesehatan.</p>
      <div className="mt-8">
        <ProductsTable initial={list} />
      </div>
    </div>
  );
}
