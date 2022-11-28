import React, { useState } from "react";
import { Input, Button } from "antd";
const Inputsource = () => {
  const { TextArea } = Input;
  const [value, setValue] = useState("");
  const [formatted, setFormatted] = useState("");
  const sqlFunc = [
    "SELECT",
    "UPDATE",
    "DELETE",
    "INSERT",
    // "FROM",
    // "WHERE",
    "UNION",
    "UNION ALL",
    "LEFT",
    "LEFT JOIN",
    "RIGHT",
    "RIGHT JOIN",
    "JOIN",
    "INNER JOIN",
    "FULL OUTER JOIN",
    "CREATE",
  ];
  const onClickHandler = (e) => {
    let formattedValue = value;
    formattedValue = formattedValue
      .replaceAll("'", "`")
      .replaceAll("\n", " ")
      .replaceAll("  ", " ")
      .replaceAll("  ", " ")
      .replaceAll("  ", " ")
      .replaceAll("  ", " ")
      .replaceAll("  ", " ")
      .replaceAll("  ", " ");
    console.log("formattedValue", formattedValue);
    let valueArray1 = formattedValue.split(";");
    console.log("valueArray1 :>> ", valueArray1);
    let valueArray2 = valueArray1.map((item) => {
      console.log("item2", item);
      return item.split(" ");
    });
    console.log("valueArray2", valueArray2);

    let valueArray = valueArray2[0];
    console.log("formattedValue", valueArray);
    let result = valueArray.map((item, idx) => {
      console.log("item : ", item);
      // let res = sqlFunc.indexOf(item);
      let rt = false;
      sqlFunc.forEach((element) => {
        if (element === item.trim().toUpperCase()) {
          rt = true;
        }
      });
      if (rt === true) {
        return "\r\n" + item.trim();
      } else {
        return item.trim();
      }
    });
    let vv = result.join(" ");
    console.log("vv", vv);
    console.log("valueArray :>> ", result);
    // '\r\n' <- 개행.
    setFormatted(vv);
  };
  return (
    <div>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Controlled autosize"
        autoSize={{
          minRows: 8,
          maxRows: 8,
        }}
      />
      <Button onClick={onClickHandler}>formatting</Button>
      <TextArea
        value={formatted}
        placeholder="Controlled autosize"
        autoSize={{
          minRows: 8,
          maxRows: 10,
        }}
      />
    </div>
  );
};

export default Inputsource;
