function FormLayout({ children, classes }) {
   return (
      <div
         className={`relative bg-white shadow  sm:rounded md:rounded-lg  p-8  ${classes}`}
      >
         {children}
      </div>
   );
}

export default FormLayout;
