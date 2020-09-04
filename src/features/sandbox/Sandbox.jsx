import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "semantic-ui-react";
import { increment, decrement } from "./testReducer";

export default function Sandbox() {
  const dispatch = useDispatch();
  // Hook that gets the data from store
  const data = useSelector((state) => state.test.data);

  return (
    <>
      <h1>testing 123</h1>
      <h3>Data is: {data}</h3>
      <Button
        onClick={() => dispatch(increment(20))}
        content="Increment"
        color="green"
      />
      <Button
        onClick={() => dispatch(decrement(10))}
        content="Decrement"
        color="red"
      />
    </>
  );
}
