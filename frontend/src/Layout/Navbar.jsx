import logo from "/images/Screenshot_3-removebg-preview.png";

const Navbar = () => {



  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="w-32">
            <img src={logo} alt="logo" className="w-full h-auto" />
          </div>

        </div>
      </div>
    </nav>
  )

};

export default Navbar;
