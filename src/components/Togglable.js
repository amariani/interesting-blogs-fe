import React, { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ toggleVisibility }));

  return (
    <div>
      {visible ? (
        <div>
          {children}
          <button onClick={toggleVisibility}>Hide</button>
        </div>
      ) : (
        <div>
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
      )}
    </div>
  );
});

export default Togglable;
