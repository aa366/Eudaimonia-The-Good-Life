import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const items = [
    {title : "Admin Dashboard" , href:"/admin/dashboard"},
    {title:"Create Category" , href:"/admin/categorylist"},
  {title:"All Products" , href:"/admin/allproductslist"},
    {title:" Manage Users" , href:"/admin/userlist"},
    {title:" Manage Orders" , href:"/admin/orderlist"},
  ]
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${
          isMenuOpen ? "top-2 right-2" : "top-5 right-7"
        } bg-[#151515] p-2 fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[#151515] p-4 fixed right-7 top-5">

          <ul className="list-none mt-2">
           
           {items.map((ele,idx)=>(
             <li key={idx + ele.href}>
              <NavLink
                className=" py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm"
                to={ele.href}
                style={({ isActive }) => ({
                  color: isActive ? "greenyellow" : "white",
                })}
              >
               {ele.title}
              </NavLink>
            </li>
           ))}
           
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;