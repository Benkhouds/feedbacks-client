export default function FormButton({ children, className, disabled }) {
   return (
      <button
         type="submit"
         disabled={disabled}
         className={
            'py-2 px-4 text-white focus:outline-none rounded-lg disabled:bg-gray-50 ' +
            className
         }
      >
         {children}
      </button>
   );
}
