function Carousel(props) {
  return (
    <div className="flex gap-6">
      <section className="flex flex-col gap-[9px] min-w-[121px]">
        {props.product?.images?.map((e, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => {
                if (props.current != index) {
                  props.setCurrent(index);
                }
              }}
            >
              <img src={e} alt="" className="h-[163px] w-[121px] shadow-sm" />
            </div>
          );
        })}
      </section>
      <img
        src={props.product?.images && props.product?.images[props.current]}
        alt=""
        className="w-[703px] h-[907px] shadow-md"
      />
    </div>
  );
}

export default Carousel;
