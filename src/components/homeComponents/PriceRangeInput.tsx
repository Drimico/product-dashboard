import { useProductsStore } from "@/stores/useProductsStore";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRef, useState } from "react";

interface PriceRangeInputProps {
  title: string;
  minVal: number;
  maxVal: number;
  setMaxVal?: React.Dispatch<React.SetStateAction<number>>;
  setMinVal?: React.Dispatch<React.SetStateAction<number>>;
  debounce: (arg: { price_min: number; price_max: number }) => void;
}

const PriceRangeInput = ({ title, minVal, maxVal, setMinVal, setMaxVal, debounce }: PriceRangeInputProps) => {
  const { initialMinPrice, initialMaxPrice } = useProductsStore();
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const speedRef = useRef(500);

  const currentPropValue = title === "Min" ? minVal : maxVal;

  const [localInput, setLocalInput] = useState<string>(currentPropValue.toString());

  const [prevPropValue, setPrevPropValue] = useState(currentPropValue);

  if (currentPropValue !== prevPropValue) {
    setPrevPropValue(currentPropValue);
    setLocalInput(currentPropValue.toString());
  }

  const increment = (incrementValue: number) => {
    const updateMinVal = () => {
      if (setMinVal) {
        setMinVal((prev) => {
          const newVal = prev + incrementValue;
          if (newVal < initialMinPrice) return initialMinPrice;
          if (newVal >= maxVal) return maxVal - 1;
          return newVal;
        });
      }
    };

    const updateMaxVal = () => {
      if (setMaxVal) {
        setMaxVal((prev) => {
          const newVal = prev + incrementValue;
          if (newVal > initialMaxPrice) return initialMaxPrice;
          if (newVal <= minVal) return minVal + 1;
          return newVal;
        });
      }
    };

    updateMinVal();
    updateMaxVal();
    speedRef.current = 500;

    timeoutRef.current = setTimeout(() => {
      const runIncrement = () => {
        updateMinVal();
        updateMaxVal();

        if (speedRef.current > 50) {
          speedRef.current = Math.max(50, speedRef.current * 0.85);
          clearInterval(intervalRef.current!);
          intervalRef.current = setInterval(runIncrement, speedRef.current);
        }
      };

      intervalRef.current = setInterval(runIncrement, speedRef.current);
    }, 300);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalInput(value);

    const numValue = parseInt(value);
    if (isNaN(numValue)) return;

    if (title === "Min") {
      if (numValue >= initialMinPrice && numValue < maxVal) {
        setMinVal?.(numValue);
        debounce({ price_min: numValue, price_max: maxVal });
      }
    } else {
      if (numValue <= initialMaxPrice && numValue > minVal) {
        setMaxVal?.(numValue);
        debounce({ price_min: minVal, price_max: numValue });
      }
    }
  };
  const handleBlur = () => {
    setLocalInput(currentPropValue.toString());
  };
  const stopIncrement = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    speedRef.current = 500;

    debounce({ price_min: minVal, price_max: maxVal });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-3xl">{title}</div>
      <div className="flex items-center border-2 border-(--border) bg-(--bg-light) rounded-2xl">
        <div className="flex items-center p-2 w-fit h-full border-r-2 border-r-(--border)">$</div>
        <input
          className="field-sizing-content min-w-15 max-w-25 h-fit focus:outline-none px-1"
          onChange={onChange}
          type="number"
          value={localInput}
          onBlur={handleBlur}
          name={title === "Min" ? "price_min" : "price_max"}
          min={initialMinPrice}
          max={initialMaxPrice}
        />
        <div className="flex flex-col ">
          <button
            onMouseDown={() => increment(1)}
            onMouseUp={stopIncrement}
            onMouseLeave={stopIncrement}
            className="cursor-pointer active:text-(--secondary)"
          >
            <ChevronUp />
          </button>
          <button
            onMouseDown={() => increment(-1)}
            onMouseUp={stopIncrement}
            onMouseLeave={stopIncrement}
            className="cursor-pointer active:text-(--secondary)"
          >
            <ChevronDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeInput;
