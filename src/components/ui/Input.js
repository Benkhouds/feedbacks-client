



function Input({type, onChange ,placeholder, value}) {
 return (
  <input
    className="block w-full py-3 px-2 mt-2 text-gray-500 placeholder-gray-400 placeholder-opacity-60 bg-indigo-50 rounded  bg-opacity-50  focus:outline-none focus:ring-indigo-100 focus:ring-2 focus:bg-opacity-80 "
    type={type}
    placeholder={placeholder || ''}
    onChange={onChange}
    autoComplete="on"
    value={value}
    required
  />
 )
}

export default Input
