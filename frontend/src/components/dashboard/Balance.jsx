export function Balance({balance}) {
  return (
    <div className="px-4 py-2 my-1 md:p-8 text-base md:text-3xl  font-black">
      <h1>
        Your Balance <span className="font-normal ml-2">₹ {balance || 0} </span>
      </h1>
    </div>
  );
}
