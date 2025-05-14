export function Navbar({ name }) {
  return (
    <div className="flex items-center justify-between p-8 shadow-xl">
      <div className="font-normal md:text-3xl md:font-extrabold">Payments App</div>
      <div className="flex items-center justify-center gap-4">
        <div>Hello, {name}</div>
        <div className="bg-black rounded-full text-white w-10 h-10 p-2 text-center">
          <div>{name?.[0]}</div>
        </div>
      </div>
    </div>
  );
}