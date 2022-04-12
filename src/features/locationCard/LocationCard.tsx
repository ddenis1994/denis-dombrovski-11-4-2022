import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTransition, animated } from "react-spring";

type LocationCardProps = {
  Date?: string;
  title?: string;
  cityKey?: string;
  Temperature: {
    Minimum: number;
    Maximum: number;
  };
  handleRemove?: (cityKey: string) => void;
};

export const LocationCard: React.FC<LocationCardProps> = (props) => {
  const { Date, Temperature, title, cityKey, handleRemove } = props;
  const [deleted, setDeleted] = useState(false);

  const transition = useTransition(!deleted, {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
    leave: { opacity: 0 },
  });

  return transition((style, item) =>
    item ? (
      <animated.div style={style}>
        <NavLink
          to={`/home/${cityKey}`}
          className="border bg-gray-50 flex relative items-center justify-center flex-col  max-h-44 rounded-md p-1 hover:ring flex-shrink-0"
        >
          {handleRemove && (
            <button
              className="justify-self-end self-end absolute top-0 right-0 m-1"
              onClick={(e) => {
                if (cityKey) {
                  e.preventDefault();
                  setDeleted(true);
                  setTimeout(() => {
                    handleRemove(cityKey);
                  }, 400);
                }
              }}
            >
              <div className="flex items-center justify-center border rounded-xl p-1">
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </button>
          )}
          {title && <div className="text-xl font-bold">{title}</div>}
          {Date && <div>{moment(Date).format("dddd ,Do")}</div>}
          <div className="text-center">
            {Temperature.Minimum} - {Temperature.Maximum}
          </div>
          <div className="mt-12 hover:underline">click hare for more info</div>
        </NavLink>
      </animated.div>
    ) : (
      <></>
    )
  );
};

export default LocationCard;
