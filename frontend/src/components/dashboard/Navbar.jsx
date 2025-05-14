export function Navbar({ name }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 md:p-8 shadow-xs md:shadow-lg">
      <div className="font-normal md:text-3xl md:font-extrabold">Payments App</div>
      <div className="flex text-xs md:text-lg items-center justify-center gap-2">
        <div>Hello, {name}</div>
        <div className="bg-black rounded-full text-white w-6 h-6 flex items-center justify-center md:w-10 md:h-10 md:p-2">
          <div className="cursor-pointer">{name?.[0]}</div>
        </div>
      </div>
    </div>
  );
}