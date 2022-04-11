import moment from "moment";
import React from "react";

type LocationCardProps = {
  Date: string;
  title?: string;
  Temperature: {
    Minimum: number;
    Maximum: number;
  };
};

const LocationCard: React.FC<LocationCardProps> = (props) => {
  const { Date, Temperature, title } = props;
  return (
    <div className="border h-32 rounded-md p-1 flex-shrink-0" >
      {title && <div className="text-xl font-bold">{title}</div>}
      <div>{moment(Date).format("dddd ,Do")}</div>
      <div>
        {Temperature.Maximum} - {Temperature.Maximum}
      </div>
    </div>
  );
};

export default LocationCard;
