import { tv, type VariantProps } from "tailwind-variants";
interface RemoveProps {
  type: ButtonVariants["type"];
  deleteImage: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const buttonStyles = tv({
  base: "absolute text-(--text) bg-(--light-danger) text-2xl w-30 h-10 font-raleway cursor-pointer hover:bg-(--danger) hover:text-white/90 transition-colors ease-in-out duration-200 shadow-(--shadow-l)",
  variants: {
    type: {
      auth: "top-[95%] rounded-full",
      profile: "top-[108%] right-0",
    },
  },
});
type ButtonVariants = VariantProps<typeof buttonStyles>;
const Remove = ({ type, deleteImage }: RemoveProps) => {
  return (
    <button type="button" onClick={(e) => deleteImage(e)} className={buttonStyles({ type })}>
      Remove
    </button>
  );
};

export default Remove;
