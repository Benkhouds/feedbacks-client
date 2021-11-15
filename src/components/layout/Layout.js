import Navbar from "./Navbar"

export default function Layout({children}) {
 return (
      <div className="">
            <Navbar/>
            <div className="mt-16 p-8 ">
                  {children} 
            </div>   
      </div>
 )
}
