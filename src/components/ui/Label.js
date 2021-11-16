function Label({title, subtitle, id, className}) {
 return (
  <>
    <label className={"text-md text-gray-700 "+className} htmlFor={id}>{title} </label>
    {subtitle && <p className=" text-sm  text-gray-400 mb-4 ">
     {subtitle}
    </p>}
  </>
 )
}

export default Label
