import { ImageResponse } from "next/og";

export const size = {
  width: 24,
  height: 24,
};

export const contentType = "image/png";

const Icon = () => {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          color: "#fd9745",
          // background: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        R
      </div>
    ),
    { ...size },
  );
};

export default Icon;
