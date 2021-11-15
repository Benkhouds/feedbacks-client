export default function FormButton({children, className}) {
 return (
  <button type='submit' className={"py-2 px-4 text-white focus:outline-none rounded-lg "+className}>
              {children}
   </button>
 )
}
