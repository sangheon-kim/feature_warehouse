import React from "react";

type Props = {};

const MainContainer: React.FC<Props> = () => {
  console.log("hello");
  return <div>123</div>;
};

export default React.memo(MainContainer);
