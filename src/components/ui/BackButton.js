import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/solid';
export default function BackButton({ className, iconColor }) {
   return (
      <Link
         to="/"
         className={
            'cursor-pointer  w-max  flex items-center justify-center p-2 focus:outline-none rounded-lg  focus:ring-2  focus:ring-offset-2 focus:ring-gray-800 ' +
            className
         }
      >
         <ChevronLeftIcon
            className={'inline-block h-5 w-min mr-1 ' + iconColor}
         />
         Go back
      </Link>
   );
}
