function Dropdown({ options , onChange, value}) {
  return (
    <select
      onChange={onChange}
      value={value}
      className="block w-full py-3 px-2 mt-2 text-gray-500 placeholder-gray-400 placeholder-opacity-60 bg-indigo-50 rounded  bg-opacity-50  focus:outline-none focus:ring-indigo-100 focus:ring-2 focus:bg-opacity-80 "
    >
      {options.length &&
        options.map((e, i) => (
          <option value={e.toLowerCase()} key={i} className="">
            {e}
          </option>
        ))}
    </select>
  );
}

export default Dropdown;
