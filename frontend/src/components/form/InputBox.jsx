export function InputBox({
  labelFor,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={labelFor}
        className="block mb-1 font-medium text-gray-900"
      >
        {name}
      </label>
      <input
        id={labelFor}
        name={labelFor}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 w-full"
      />
    </div>
  );
}
