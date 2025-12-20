const FormField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  textarea = false,
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={4}
          placeholder={placeholder}
          className="w-full text-black border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border rounded-md px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />
      )}
    </div>
  );
};

export default FormField;
