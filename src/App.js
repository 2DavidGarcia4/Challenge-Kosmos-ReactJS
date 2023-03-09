import React, { useRef, useState } from "react";
import Component from "./components/Component";

const App = () => {
  const [moveableComponents, setMoveableComponents] = useState([]);
  const [namesComponents, setNamesComponents] = useState([]);
  const [selected, setSelected] = useState(null);
  const divRef = useRef()

  const addMoveable = () => {
    // Create a new moveable component and add it to the array
    const COLORS = ["red", "blue", "yellow", "green", "purple"];

    const id = Math.floor(Math.random() * Date.now())

    setMoveableComponents([
      ...moveableComponents,
      {
        id,
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        updateEnd: true
      },
    ]);

    setNamesComponents([
      ...namesComponents,
      {
        id,
        name: `Component: ${(''+id).slice(0,6)}`,
      }
    ])
  };

  const updateMoveable = (id, newComponent, updateEnd = false) => {
    // console.log({newComponent, updateEnd})
    const updatedMoveables = moveableComponents.map((moveable, i) => {
      if (moveable.id === id) {
        return { id, ...newComponent, updateEnd };
      }
      return moveable;
    });
    setMoveableComponents(updatedMoveables);
  };

  const handleResizeStart = (index, e) => {
    console.log("e", e.direction);
    // Check if the resize is coming from the left handle
    const [handlePosX, handlePosY] = e.direction;
    // 0 => center
    // -1 => top or left
    // 1 => bottom or right

    // -1, -1
    // -1, 0
    // -1, 1
    if (handlePosX === -1) {
      console.log("width", moveableComponents, e);
      // Save the initial left and width values of the moveable component
      const initialLeft = e.left;
      const initialWidth = e.width;

      // Set up the onResize event handler to update the left value based on the change in width
    }
  };

  return (
    <main >
      <button className="button" onClick={addMoveable}>Add Moveable1</button>

      <div ref={divRef} id="parent" style={{
          position: "relative",
          background: "black",
          height: "80vh",
          width: "80vw",
        }}>

        {moveableComponents.map((item, index) => (
          <Component
            {...item}
            key={item.id}
            index={index+1}
            updateMoveable={updateMoveable}
            handleResizeStart={handleResizeStart}
            setSelected={setSelected}
            isSelected={selected === item.id}
          />
        ))}
      </div>

      <ul className="list" >
        {namesComponents.map(m=> {
          const deleteComponent = () => {
            setMoveableComponents(c=> c.filter(f=> f.id !== m.id))
            setNamesComponents(c=> c.filter(f=> f.id !== m.id))
          }

          return (
            <li className="element" style={{backgroundColor: moveableComponents.find(f=> f.id === m.id).color}} key={m.id} onClick={deleteComponent}>
              {m.name}
            </li>
          )
        })}
      </ul>
    </main>
  );
};

export default App;
