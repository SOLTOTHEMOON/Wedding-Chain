import React from "react";
import { ArweaveMarriage } from "../../arweave/arweave";
import "./style.css";

interface ICertificateProps {
  marriage: ArweaveMarriage;
}

export const Certificate: React.FunctionComponent<ICertificateProps> = ({
  marriage,
}) => {
  return (
    <div>
      {/* <div classNameName="certificate-container">
                <div classNameName="heading">
                    <h1>Certificate of Marraige</h1>
                </div>

                <div classNameName="certificate-content">

                    <p>This certifies that</p>

                    <p>7nbyxVXZpmo4Mxq4ZvTjjH1nMb1yBT8Nm5TX9f7fZ2uK</p>
                    <h4>&</h4>
                    <p>7nbyxVXZpmo4Mxq4ZvTjjH1nMb1yBT8Nm5TX9f7fZ2uK</p>
                    <p>were united in the holy bonds of matrimony.</p>

                    <p> on the 17th day of June in the year 2000.</p>
                </div>

                <div classNameName="certificate-footer">
                    <p>witnessd by Solana (devnet.net) and Arweave</p>
                    <p>Officiated by Chain-Marraige</p>
                </div>

            </div> */}

      <div className="body dark-background">
        <div className="outer-border">
          <div className="mid-border">
            <div className="inner-border">
              <img
                className="corner-decoration corner-left-top"
                src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"
                alt="border"
              ></img>
              <img
                className="corner-decoration corner-right-top"
                src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"
                alt="border"
              ></img>
              <img
                className="corner-decoration corner-right-bottom"
                src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"
                alt="border"
              ></img>
              <img
                className="corner-decoration corner-left-bottom"
                src="https://i.ibb.co/4mKvK3N/corner-decoration.jpg"
                alt="border"
              ></img>
              <img
                className="vertical-decoration top"
                src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png"
                alt="border"
              ></img>
              <img
                className="vertical-decoration bottom"
                src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png"
                alt="border"
              ></img>

              <div className="container">
                <div className="certificate-content ">
                  <p>This certifies that</p>

                  <p>
                    <span className="highlight">
                      {marriage.spouse1pubKey} - {marriage.spouse1Name}
                    </span>
                  </p>
                  <h4>&</h4>
                  <p>
                    <span className="highlight">
                      {marriage.spouse2pubKey} - {marriage.spouse2Name}
                    </span>
                  </p>
                  <p>were united in the holy bonds of matrimony.</p>

                  <p> on {marriage.updated_at}.</p>

                  <p>witnessd by Solana (devnet.net) and Arweave</p>
                  <p>
                    Officiated by{" "}
                    <span className="highlight">Chain-Marraige</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
