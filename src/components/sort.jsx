function Sort(props) {
  const handleApply = async (name, value) => {
    props.setSortValue({ [name]: value });
    props.setModals({
      price: false,
      sort: false,
    });
  };

  return (
    <section className="cursor-default absolute top-[34px] right-0 w-[223px] flex flex-col gap-2 py-4 border border-[#e1dfe1] rounded-[8px]">
      <h2 className="text-base text-[#10151f] leading-[26px] font-semibold px-4">
        Sort by
      </h2>
      <ul className="flex flex-col">
        <li
          className="px-4 py-2 text-base text-[#10151f] leading-[24px] cursor-pointer hover:bg-[#928d8d]"
          onClick={() => handleApply("New products first", "created_at")}
        >
          New products first
        </li>
        <li
          className="px-4 py-2 text-base text-[#10151f] leading-[24px] cursor-pointer hover:bg-[#928d8d]"
          onClick={() => handleApply("Price, low to high", "Price")}
        >
          Price, low to high
        </li>
        <li
          className="px-4 py-2 text-base text-[#10151f] leading-[24px] cursor-pointer hover:bg-[#928d8d]"
          onClick={() => handleApply("Price, high to low", "-Price")}
        >
          Price, high to low
        </li>
      </ul>
    </section>
  );
}

export default Sort;
