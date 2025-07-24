function RatingInput({ field }) {
  const { onChange } = field;
  return (
    <select
      className="w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-white transition-all duration-200 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
      name={field.name}
      onChange={onChange}
      defaultValue="all"
    >
      <option value="all">All Ratings</option>
      <option value="0-49">⭐ 0-4.9 (Poor)</option>
      <option value="50-69">⭐ 5.0-6.9 (Average)</option>
      <option value="70-100">⭐ 7.0-10 (Good)</option>
    </select>
  );
}

export default RatingInput;
