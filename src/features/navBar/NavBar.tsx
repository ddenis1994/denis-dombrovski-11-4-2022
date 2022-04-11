import React from "react";
import Button from "./button/Button";
type NavBarProps = {
  navigation: {
    route: string;
    label: string;
  }[];
};

const NavBar: React.FC<NavBarProps> = (props) => {
  const { navigation } = props;
  return (
    <nav className="flex gap-2">
      {navigation.map((navigation) => (
        <Button {...navigation} />
      ))}
    </nav>
  );
};

export default NavBar;
