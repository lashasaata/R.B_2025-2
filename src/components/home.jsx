import { useEffect, useState } from "react";
import Filtering from "./filtering";
import { getProducts } from "../api/products";
import { data, useNavigate } from "react-router";
import Pagination from "./pagination";

function Home() {
  const navigate = useNavigate();
  const [prices, setPrices] = useState({
    from: "",
    to: "",
  });
  const [sortValue, setSortValue] = useState({ default: "-created_at" });
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let apiData = {
      page: page,
      ...(prices.from !== "" && { "filter[price_from]": Number(prices.from) }),
      ...(prices.to !== "" && { "filter[price_to]": Number(prices.to) }),
      sort: Object.values(sortValue)[0],
    };
    const request = async () => {
      try {
        const response = await getProducts(apiData);

        setProducts(response);
      } catch (error) {
        console.log(error);
      }
    };
    request();
  }, [prices, sortValue, page]);
  console.log(products);
  return (
    <div
      className={`${
        prices.from || prices.to ? "gap-[26px]" : "gap-[32px]"
      } px-[100px] mt-[72px] flex flex-col`}
    >
      <Filtering
        prices={prices}
        setPrices={setPrices}
        sortValue={sortValue}
        setSortValue={setSortValue}
        meta={products?.meta}
        setPage={setPage}
      />
      <section className="grid grid-cols-4 gap-x-[16px] gap-y-[40px]">
        {products.data?.map((e, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-3 cursor-pointer"
              onClick={() => navigate(`/products/${e.id}`)}
            >
              <img src={e.cover_image} alt="" className="" />
              <p className="text-xl text-[#10151f] leading-[27px] font-medium">
                {e.name}
              </p>
              <span className="text-base text-[#10151f] leading-[24px] font-medium mt-[-10px]">
                $ {e.price}
              </span>
            </div>
          );
        })}
      </section>
      <Pagination
        currentPage={products.meta?.current_page}
        totalPages={products.meta?.last_page}
        onPageChange={setPage}
      />
    </div>
  );
}

export default Home;
