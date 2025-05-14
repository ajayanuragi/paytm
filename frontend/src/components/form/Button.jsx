export function Button({ text, onClick }) {
  return (
    <button
      className="p-2 rounded bg-black text-white w-full text-xl cursor-pointer"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
