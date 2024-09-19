import React,{memo} from "react";

interface CellProps {
  label: string;
  handleClick: () => void;
  isFilled: boolean;
  isDisabled: boolean;
}

const Cell: React.FC<CellProps> = ({
  label,
  handleClick,
  isFilled,
  isDisabled,
}) => {
  return (
    <>
      <button
        className="cell-button"
        disabled={isDisabled}
        onClick={handleClick}
        style={{
          backgroundColor: `${isFilled ? "green" : ""}`,
        }}
      >
        {label}
      </button>
    </>
  );
};

export default memo( Cell);
