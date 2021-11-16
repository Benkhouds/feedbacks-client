function TextArea({onChange, value, placeholder}) {
 return (
    <textarea
          className="block w-full py-3 px-2 mt-2 text-gray-500 placeholder-gray-400 placeholder-opacity-60 bg-indigo-50 rounded  bg-opacity-50  focus:outline-none focus:ring-indigo-100 focus:ring-2 focus:bg-opacity-80 "
          rows="3"
          id="details"
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          required
      />
 )
}

export default TextArea
