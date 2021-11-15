import {Link} from 'react-router-dom'
import { ChevronLeftIcon } from "@heroicons/react/solid";
export default function BackButton() {
 return (
  <Link
          to="/"
          className="cursor-pointer  w-max mb-8 flex items-center justify-center py-2 focus:outline-none rounded-lg  focus:ring-2  focus:ring-offset-2 focus:ring-gray-300"
        >
          <ChevronLeftIcon className="inline-block h-5 w-min mr-1 text-blue-600" />
          Go back
  </Link>
 )
}
