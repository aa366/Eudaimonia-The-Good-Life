import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

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
    <div className=" relative">
      <button
        className={` text-2xl bg-[#151515] p-2  rounded-lg cursor-pointer`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
           <FaBars  color="white"/>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-[#151515] p-4 absolute right-0 ">

          <ul className="list-none mt-2 ">
           
           {items.map((ele,idx)=>(
             <li key={idx + ele.href}>
              <NavLink
                className=" py-2 px-3 block mb-5 hover:bg-[#2E2D2D] rounded-sm  whitespace-nowrap"
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
    </div>
  );
};

export default AdminMenu;