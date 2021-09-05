import React from "react";
import { ArweaveMarriage } from "../../arweave/arweave";
import "./style.css";

const timelineData = [
  {
    text: "Started working on the app-ideas repository",
    date: "February 25 2019",
    category: {
      tag: "app-ideas",
      color: "#FFDB14",
    },
    link: {
      url: "#!",
      text: "Check it out on GitHub",
    },
  },
  {
    text: "Started the Weekly Coding Challenge program",
    date: "March 04 2019",
    category: {
      tag: "blog",
      color: "#e17b77",
    },
    link: {
      url: "#!",
      text: "Check it out here",
    },
  },
  {
    text: "Got 1.000 followers on Twitter",
    date: "March 07 2019",
    category: {
      tag: "twitter",
      color: "#1DA1F2",
    },
    link: {
      url: "#!",
      text: "See profile",
    },
  },
  {
    text: "I published my first article in the FreeCodeCamp Medium Publication",
    date: "March 18 2019",
    category: {
      tag: "medium",
      color: "#018f69",
    },
    link: {
      url: "#!",
      text: "Check it out here",
    },
  },
  {
    text: "Over 12.000 views in a single day on my Medium posts",
    date: "April 05 2019",
    category: {
      tag: "medium",
      color: "#018f69",
    },
    link: {
      url: "#!",
      text: "See profile",
    },
  },
];

interface TimelineItemProps {
  data: ArweaveMarriage;
  key: number;
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
      <time>{data.updated_at}</time>
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
