import React from "react";
const ProductList = ({ student }) => {
  return (
    <>
      {student.map((item) => (
        <div>
          {item.id}. {item.name}
        </div>
      ))}
    </>
  );
};

export default ProductList;
