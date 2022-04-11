import React from "react";
import { NavLink } from "react-router-dom";

type ButtonProps = {
  label: string;
  isActive?: true;
  route: string;
  icon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { label, route, icon } = props;
  return (
    <NavLink
      className="px-1 py-0.5 block border rounded-md hover:bg-gray-500 hover:text-white transition-colors ease-out"
      style={({ isActive }) => {
        return {
          color: isActive ? "white" : "",
          background: isActive ? "rgb(107 114 128" : "",
        };
      }}
      to={route}
    >
      <div className="flex gap-1 items-center">
        {icon}
        {label}
      </div>
    </NavLink>
  );
};

export default Button;
