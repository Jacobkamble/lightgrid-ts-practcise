import React, { useState, useCallback } from "react";
import Cell from "./Cell";

interface GridProps {
  config: number[][];
}

const Grid: React.FC<GridProps> = ({ config }) => {
  const [activeCells, setActiveCells] = useState<number[]>([]);
  const [isDeactivating, setIsDeactivating] = useState<boolean>(false);

  const deactivateCells = useCallback(() => {
    setIsDeactivating(true);
    const interval = setInterval(() => {
      setActiveCells((prevActiveCells: number[]) => {
        const updatedActiveCells = [...prevActiveCells];
        updatedActiveCells.pop();

        if (updatedActiveCells.length === 0) {
          setIsDeactivating(false);
          clearInterval(interval);
        }

        return updatedActiveCells;
      });
    }, 100);
  }, []);

  const activateCell = useCallback(
    (index: number) => {
      const updatedActiveCells = [...activeCells];
      const isSelected = updatedActiveCells.includes(index);

      if (!isSelected) {
        updatedActiveCells.push(index);
        setActiveCells(updatedActiveCells);
      }

      if (
        updatedActiveCells.length ===
        config.flat(1).filter((cell: number) => cell).length
      ) {
        deactivateCells();
      }
    },
    [activeCells, config, deactivateCells]
  );

  return (
    <div className="grid-container">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${config[0].length}, 1fr)`,
          gridTemplateRows: `repeat(${config[0].length}, 1fr)`,
        }}
      >
        {config?.flat(1)?.map((cell: number, index: number) => {
          return cell ? (
            <Cell
              key={index}
              label={`Cell ${index + 1}`}
              isFilled={activeCells.includes(index)}
              isDisabled={activeCells.includes(index) || isDeactivating}
              handleClick={() => activateCell(index)}
            />
          ) : (
            <span key={index}></span>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
