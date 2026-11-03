
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/lib/utils";


export default async function Home() {

  const productRes = await fetch("https://openapi.programming-hero.com/api/bazardor/products")

  const dataObj = await productRes.json()

  const data: IProduct[] = dataObj

  const risingProduct = data?.filter((iteam) => iteam.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallerProduct = data?.filter((iteam) => iteam.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  console.log(risingProduct);
  console.log(fallerProduct);

  return (
    <div className="">
      <Hero></Hero>
      <section className="container max-w-6xl mx-auto px-4 py-10">
        <div>
          <h2 className="mb-6 text-2xl font-bold">
            আজ দাম বেড়েছে <span className="text-red-600 font-bold">▲</span>
          </h2>
          <div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {risingProduct.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <div className="pt-5">
          <h2 className="mb-6 text-2xl font-bold">
            আজ দাম কমেছে <span className="text-green-600 font-bold">▼</span>
          </h2>
          {/* Fallen Products */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {fallerProduct.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="pt-6 scroll-mt-30 py-10" id="all-products">
          <h2 className="mb-6 text-2xl font-bold">সব পন্য</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>


      </section>
    </div>
  );
}
