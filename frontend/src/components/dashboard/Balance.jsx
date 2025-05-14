export function Balance({balance}) {
  return (
    <div className="px-8 pt-6 pb-4 text-3xl font-black">
      <h1>
        Your Balance <span className="font-normal ml-2">₹ {balance} </span>
      </h1>
    </div>
  );
}
