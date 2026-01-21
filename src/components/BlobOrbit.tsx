import React, { useId } from "react";
import "./BlobOrbit.css";

const BLOB_D =
  "M43.1,-68.5C56.2,-58.6,67.5,-47.3,72.3,-33.9C77.2,-20.5,75.5,-4.9,74.2,11.3C72.9,27.6,71.9,44.5,63.8,57.2C55.7,69.8,40.6,78.2,25.5,79.2C10.4,80.1,-4.7,73.6,-20.9,69.6C-37.1,65.5,-54.5,63.9,-66,54.8C-77.5,45.8,-83.2,29.3,-85.7,12.3C-88.3,-4.8,-87.7,-22.3,-79.6,-34.8C-71.5,-47.3,-55.8,-54.9,-41.3,-64.2C-26.7,-73.6,-13.4,-84.7,0.8,-86C15,-87.2,29.9,-78.5,43.1,-68.5Z";

const ORBIT_TEXT = "❤ ROMAIN DUJARDIN ❤ ROMAIN DUJARDIN ";

const BlobOrbit: React.FC = () => {
  const uid = useId();
  const clipId = `blobOrbitClip-${uid}`;
  const textPathId = `blobOrbitTextPath-${uid}`;
  const titleId = `blobOrbitTitle-${uid}`;

  const imgHref = "img/romain.png";

  return (
    <section className="blobOrbitSection" aria-label="Animation blob">
      <div className="blobOrbitWrap">
        <svg
          className="blobOrbitSvg"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-labelledby={titleId}
          role="img"
        >
          <title id={titleId}>Image avec texte en orbite</title>

          <clipPath
            id={clipId}
            className="blobOrbitClip"
            clipPathUnits="userSpaceOnUse"
          >
            <path d={BLOB_D} transform="translate(100 100)" />
          </clipPath>

          <image
            href={imgHref}
            width="200"
            height="200"
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />

          <path
            id={textPathId}
            d={BLOB_D}
            transform="translate(100 100)"
            fill="none"
            stroke="none"
            pathLength="100"
          />

          <text className="blobOrbitText">
            <textPath href={`#${textPathId}`} startOffset="0%">
              {ORBIT_TEXT.repeat(2)}
              <animate
                attributeName="startOffset"
                from="0%"
                to="100%"
                dur="15s"
                repeatCount="indefinite"
              />
            </textPath>
            <textPath href={`#${textPathId}`} startOffset="100%">
              {ORBIT_TEXT.repeat(2)}
              <animate
                attributeName="startOffset"
                from="-100%"
                to="0%"
                dur="15s"
                repeatCount="indefinite"
              />
            </textPath>
          </text>
        </svg>
      </div>
    </section>
  );
};

export default BlobOrbit;
