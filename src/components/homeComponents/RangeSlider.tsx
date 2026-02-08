import { useProductsStore } from "@/stores/useProductsStore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PriceRangeInput from "./PriceRangeInput";
import { usePaginationStore } from "@/stores/usePaginationStore";
import { debounce } from "@/utils/debounce";

interface RangeSliderProps {
  setIsRangeSliderOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function RangeSlider({ setIsRangeSliderOpen }: RangeSliderProps) {
  const { setPriceRange, initialMinPrice, initialMaxPrice, priceRange } = useProductsStore();
  const { setPagination } = usePaginationStore();
  const [minVal, setMinVal] = useState(initialMinPrice);
  const [maxVal, setMaxVal] = useState(initialMaxPrice);
  const middleRangeColor = useRef<HTMLDivElement | null>(null);

  const minThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value < maxVal) {
      setMinVal(value);
    }
    if (value >= maxVal) {
      setMinVal(maxVal);
    }
    if (value < initialMinPrice) {
      setMinVal(initialMinPrice);
    }
  };

  const maxThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > minVal) {
      setMaxVal(value);
    }
    if (value <= minVal) {
      setMaxVal(minVal);
    }
    if (value > initialMaxPrice) {
      setMaxVal(initialMaxPrice);
    }
  };

  const rangeChange = useCallback(
    (minThumb: number, maxThumb: number) => {
      const sliderWidth = initialMaxPrice - initialMinPrice;
      const sliderColor = "#ffffff";
      const middleColor = "var(--secondary)";
      const minThumbPosition = ((minThumb - initialMinPrice) / sliderWidth) * 100;
      const maxThumbPosition = ((maxThumb - initialMinPrice) / sliderWidth) * 100;
      if (!middleRangeColor.current) return;
      middleRangeColor.current.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${minThumbPosition}%,
      ${middleColor} ${minThumbPosition}%,
      ${middleColor} ${maxThumbPosition}%,
      ${sliderColor} ${maxThumbPosition}%,
      ${sliderColor} 100%
      )`;
    },
    [initialMaxPrice, initialMinPrice],
  );

  const debouncedSetPriceRange = useMemo(() => debounce((val: { price_min: number; price_max: number }) => setPriceRange(val), 500), [setPriceRange]);

  const onMouseUp = () => {
    setPagination(0, 1);
    debouncedSetPriceRange({ price_min: minVal, price_max: maxVal });
  };
  useEffect(() => {
    rangeChange(minVal, maxVal);
  }, [minVal, maxVal, rangeChange]);
  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsRangeSliderOpen(false);
        }}
        className="fixed inset-0 z-10"
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[130%] left-1/2 -translate-x-1/2 flex flex-col items-center justify-evenly w-100 h-40 bg-(--bg) border-2 border-(--border) rounded-3xl z-20"
      >
        <div className="relative w-80 h-fit ">
          <div ref={middleRangeColor} className="absolute w-full h-2 rounded-full top-1/2 -translate-y-1/2" />
          <input
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none z-20 top-1/2 -translate-y-1/2"
            onChange={minThumbChange}
            onMouseUp={onMouseUp}
            type="range"
            value={minVal}
            min={initialMinPrice}
            max={initialMaxPrice}
          />
          <input
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none top-1/2 -translate-y-1/2"
            onChange={maxThumbChange}
            onMouseUp={onMouseUp}
            style={{ zIndex: maxVal <= initialMinPrice ? 30 : 10 }}
            type="range"
            value={maxVal}
            min={initialMinPrice}
            max={initialMaxPrice}
          />
        </div>
        <div className="flex justify-evenly w-full text-2xl">
          <PriceRangeInput value={minVal} title="Min" onChange={minThumbChange} setMinVal={setMinVal} minVal={minVal} maxVal={maxVal} />
          <PriceRangeInput value={maxVal} title="Max" onChange={maxThumbChange} setMaxVal={setMaxVal} maxVal={maxVal} minVal={minVal} />
        </div>
      </div>
    </>
  );
}

export default RangeSlider;
