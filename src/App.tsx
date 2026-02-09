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

const btnStyles = "border-2 py-1 px-2 rounded-sm ml-3 min-w-25 my-5";
const cardStyles =
  "card p-5 w-[400px] border border-gray-400 h-[600px] flex flex-col rounded-2xl overflow-auto bg-white";

function App() {
  const [productsData, setProductsData] = useState<Product>([]);
  const [products, setProducts] = useState<Product>([]);
  const [cate, setCates] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

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
  function hdlAllClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setProducts(productsData);
  }
  function searchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setProducts(
      productsData.filter(
        (item) =>
          item.category.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search) ||
          item.title.toLowerCase().includes(search),
      ),
    );
  }

  return (
    <>
      <h1 className="text-5xl p-3 ">Products Fetch & Filter</h1>
      <hr className=" w-98/100 m-auto text-gray-400" />
      <span className="text-2xl m-3">
        Current Category :{" "}
        {cate === "All" ? "All" : `${cate[0].toUpperCase()}${cate.slice(1)}`},
        Amount : {products.length}
      </span>
      <input
        className="mt-3 ml-3 mb-1 border-3 rounded-2xl pl-3 text-xl p-1 max-w-130 border-b-cyan-800"
        type="text"
        placeholder="Search"
        onChange={(e) => searchChange(e)}
      />
      <div className="flex gap-2">
        {categories.map((item) => (
          <button
            className={btnStyles}
            key={item}
            onClick={(e) => hdlCateClick(e, item)}
          >
            {item[0].toUpperCase()}
            {item.slice(1)}
          </button>
        ))}
        <button className={btnStyles} onClick={hdlAllClick}>
          All
        </button>
      </div>
      <hr className="text-gray-400"/>
      <div className="flex justify-center gap-x-15 gap-y-5 py-5 flex-wrap bg-gray-100 flex-1 shrink-0">
        {products.map((item) => (
          <div key={item.id} className={cardStyles}>
            <div className="flex justify-center">
              <img
                className="m-2.5 mt-7 w-37.5 h-50 object-scale-down"
                src={item.image}
                alt=""
              />
            </div>
            <div className="flex gap-2 flex-col">
              <div className="mt-6 ml-2">
                <p className="text-2xl bold">Title</p>
                {item.title}
              </div>
              <div className="ml-2">
                <p className="text-2xl bold">Description</p>
                {item.description}
              </div>
              <div className="ml-2 mb-5">
                <span className="text-2xl bold">Price : {item.price} $</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
