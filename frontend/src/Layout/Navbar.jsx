import logo from "/images/Screenshot_3-removebg-preview.png";
import { Link } from "react-router-dom";
const Navbar = () => {



  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="w-32">
            <img src={logo} alt="logo" className="w-full h-auto" />
          </div>
          <div>
          <Link to='/admin-333' className="bg-black text-white px-2 rounded-2xl">admin</Link>
          </div>
        </div>
      </div>
    </nav>
  )

};

export default Navbar;
