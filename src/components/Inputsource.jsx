import React, { useState } from "react";
import { Input, Button, Modal, Row, Col } from "antd";
import "../App.css";
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
    let usedBackTick = false;
    let usedPipeLine = false;
    formattedValue = formattedValue
      .replaceAll("\n", " ")
      .replaceAll("\n", " ")
      .replaceAll("  ", " ")
      .replaceAll("  ", " ")
      .replaceAll("  ", " ")
      .replaceAll("  ", " ")
      .replaceAll("  ", " ")
      .replaceAll("  ", " ")
      .replaceAll("  ", " ");

    if (!formattedValue.includes("`")) {
      usedBackTick = true;
      formattedValue = formattedValue.replaceAll("'", "`");
    } else if (!formattedValue.includes("|")) {
      usedPipeLine = true;
      formattedValue = formattedValue.replaceAll("'", "|");
    } else {
      Modal.error("코드에 백틱이나 파이프라인이 있습니다.");
      return;
    }
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
    console.log("useBackTick :>> ", usedBackTick);
    console.log("first", usedPipeLine);
    let vv = result.join(" ");
    if (usedBackTick) {
      vv = vv.replaceAll("`", "'");
    } else if (usedPipeLine) {
      vv = vv.replaceAll("|", "'");
    }
    // '\r\n' <- 개행.
    setFormatted(vv);
  };
  return (
    <Row className="container">
      <Col style={{ width: "45%" }}>
        <div>
          <h1>SQL FORMATTER</h1>
          <TextArea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Controlled autosize"
            autoSize={{
              minRows: 38,
              maxRows: 38,
            }}
          />
        </div>
      </Col>
      <Col className="button" flex={0}>
        <Button onClick={onClickHandler}>formatting</Button>
      </Col>
      <Col style={{ width: "45%" }}>
        <div>
          <h1>FORMATTED</h1>
          <TextArea
            value={formatted}
            placeholder="Controlled autosize"
            autoSize={{
              minRows: 38,
              maxRows: 38,
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default Inputsource;
