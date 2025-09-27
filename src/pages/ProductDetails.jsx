import { useEffect, useState } from "react";
import { getProduct } from "../api/products";
import { useParams } from "react-router";
import Carousel from "../components/product/Carousel.jsx";
import Details from "../components/product/details.jsx";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [current, setCurrent] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    const request = async () => {
      const response = await getProduct(id);

      setProduct(response);
    };
    request();
  }, []);

  return (
    <div className="flex flex-col px-[100px]">
      <div className="text-sm text-[#10151f] font-light mt-[30px] mb-[50px]">
        Listing / Product
      </div>
      <div className="w-full flex justify-between">
        <Carousel product={product} current={current} setCurrent={setCurrent} />
        <Details
          product={product}
          current={current}
          setCurrent={setCurrent}
          id={id}
        />
      </div>
    </div>
  );
}

export default ProductDetails;
