function ChevronUpIcon({className, size}) {
 return (
  <svg xmlns="http://www.w3.org/2000/svg" className={"mx-auto " + (size ? size : 'h-4 w-4')} fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" className={"stroke-current "+className} strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
</svg>
 )
}

export default ChevronUpIcon
