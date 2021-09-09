import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css'

const defaultNavbar = [
  {
    name: "Bookmark",
    xmlns: "http://www.w3.org/2000/svg",
    width: "30",
    height: "34",
    viewBox: "0 0 30 34",
    d: "M30.714,3H9.286A4.068,4.068,0,0,0,5,6.778V37l15-5.667L35,37V6.778A4.068,4.068,0,0,0,30.714,3Zm0,28.333L20,27.216,9.286,31.333V6.778H30.714Z",
    transform: "translate(-5 -3)",
    path: '/Book'
  },
  {
    name: "Calender",
    xmlns: "http://www.w3.org/2000/svg",
    width: "34",
    height: "36",
    viewBox: "0 0 34 36",
    d: "M33.222,4.6H31.333V1H27.556V4.6H12.444V1H8.667V4.6H6.778A3.7,3.7,0,0,0,3,8.2V33.4A3.7,3.7,0,0,0,6.778,37H33.222A3.7,3.7,0,0,0,37,33.4V8.2A3.7,3.7,0,0,0,33.222,4.6Zm0,28.8H6.778v-18H33.222ZM6.778,11.8V8.2H33.222v3.6ZM10.556,19H29.444v3.6H10.556Zm0,7.2H23.778v3.6H10.556Z",
    transform: "translate(-3 -1)",
    path: '/Calendar'
  },
  {
    name: "Search",
    xmlns: "http://www.w3.org/2000/svg",
    width: "33.5",
    height: "33.5",
    viewBox: "0 0 33.5 33.5",
    d: "M26.935,24.063H25.422l-.536-.517a12.465,12.465,0,1,0-1.34,1.34l.517.536v1.513l9.574,9.555,2.853-2.853Zm-11.489,0a8.617,8.617,0,1,1,8.617-8.617A8.605,8.605,0,0,1,15.446,24.063Z",
    transform: "translate(-3 -3)",
    path: '/Search'
  },
  {
    name: "Account",
    xmlns: "http://www.w3.org/2000/svg",
    width: "36",
    height: "36",
    viewBox: "0 0 36 36",
    d: "M20,2A18,18,0,1,0,38,20,18.007,18.007,0,0,0,20,2ZM11.126,31.3c.774-1.62,5.49-3.2,8.874-3.2s8.118,1.584,8.874,3.2a14.266,14.266,0,0,1-17.748,0Zm20.322-2.61C28.874,25.562,22.628,24.5,20,24.5s-8.874,1.062-11.448,4.194a14.4,14.4,0,1,1,22.9,0ZM20,9.2a6.3,6.3,0,1,0,6.3,6.3A6.284,6.284,0,0,0,20,9.2Zm0,9a2.7,2.7,0,1,1,2.7-2.7A2.7,2.7,0,0,1,20,18.2Z",
    transform: "translate(-2 -2)",
    path: '/Account'
  }
]



function NavbarButton({ icon, color, index, page }) {
  const unSelectedColor = "#7a599b";
  const selectedColor = "#554ff1";
  if (page.currentlySelected == index) {
    color = selectedColor;
  } else {
    color = unSelectedColor;
  }
  return (
    <Link to={icon.path} className='navbar-link'>
      <svg className='icon'
        xmlns={icon.xmlns}
        width={icon.width}
        height={icon.height}
        viewBox={icon.viewBox}
        transform={icon.transform}
        color={color}
        index={index}
        name={icon.name}
      >
        <path
          d={icon.d}
          transform={icon.transform}
          fill={color} />
      </svg>
    </Link>

  )
}


const unSelectedColor = "#7a599b";
const selectedColor = "#554ff1";

function Navbar(props) {
  const [button, setButton] = useState(defaultNavbar);
  return (
    <>
      {button.map((ic, i) => {
        return (
          <>
            <NavbarButton
              key={i}
              index={i}
              icon={ic}
              page={props}
            />
          </>

        );
      })}

    </>

  )
}

export default Navbar
