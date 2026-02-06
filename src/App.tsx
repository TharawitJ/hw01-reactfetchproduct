import { useEffect, useState } from "react";
type Product = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: Rating;
  title: string;
}[];
type Rating = { rate: number; count: number };

function App() {
  const [productsData, setProductsData] = useState<Product>([]);
  const [products, setProducts] = useState<Product>([]);
  const [cate, setCates] = useState<string>("All");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((resp) => resp.json())
      .then((data: Product) => setProductsData(data));
  }, []);
  const categories = [...new Set(productsData.map((p) => p.category))];

  function hdlCateClick(e: React.MouseEvent<HTMLButtonElement>, cate: string) {
    e.preventDefault();
    setCates(cate);
    setProducts(() => productsData.filter((item) => item.category === cate));
  }

  return (
    <>
      <h1 className="text-5xl m-3">Products Fetch & Filter</h1>
      <hr />
      <p className="text-2xl m-3">
        Current Category :{" "}
        {cate === "All" ? "All" : `${cate[0].toUpperCase()}${cate.slice(1)}`},
        Amount : {products.length}
      </p>
      <div className="flex gap-2">
        {categories.map((item) => (
          <button
            className="border-2 py-1 px-2 rounded-sm m-2"
            key={item}
            onClick={(e) => hdlCateClick(e, item)}
          >
            {item[0].toUpperCase()}
            {item.slice(1)}
          </button>
        ))}
      </div>
      <hr />
      {products.map((item) => (
        <div className="border">
          <img
            className="ml-10 mt-5 m-2.5 rounded-2xl"
            src="https://picsum.photos/200"
            alt=""
          />
          <div className="ml-10">
            <span className="text-xl bold">Title</span> : {item.title}
          </div>
          <div className="ml-10">
            <span className="text-xl bold">Description</span> :{" "}
            {item.description}
          </div>
          <div className="ml-10 mb-5">
            <span className="text-xl bold">Price</span> : {item.price}
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
