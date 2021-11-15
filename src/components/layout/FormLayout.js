


function FormLayout({children, classes, onSubmit}) {
 return (
      <form autoComplete="on" onSubmit={onSubmit} className={`relative bg-white shadow  sm:rounded md:rounded-lg  p-8  ${classes}`}>
        {children}
      </form>
 )
}

export default FormLayout
