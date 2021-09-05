import React from "react";
import { ArweaveMarriage } from "../../arweave/arweave";
import "./style.css";



interface TimelineItemProps {
  data: ArweaveMarriage;
  key: number;
}

const dateConverter = (date: string) => {

  var d = new Date(parseInt(date, 10) * 1000);
  // example representations
  return d.toLocaleString()
}
const TimelineItem: React.FunctionComponent<TimelineItemProps> = ({
  data,
  key,
}) => (
  <div className="timeline-item">
    <div className="timeline-item-content">
      <span className="tag" style={{ color: "#018f69" }}>
        {data.status}
      </span>
      <time>{dateConverter(data.updated_at!)}</time>
      <p>{data.spouse2Name}</p>
      <div>{data.spouse2pubKey}</div>
      <span className="circle" />
    </div>
  </div>
);

interface TimelineProps {
  marriages: ArweaveMarriage[];
}

export const Timeline: React.FunctionComponent<TimelineProps> = ({
  marriages,
}) => {
  return (
    <div className="timeline-container">
      {marriages.map((data: ArweaveMarriage, index: number) => (
        <TimelineItem data={data} key={index} />
      ))}
    </div>
  );
};
