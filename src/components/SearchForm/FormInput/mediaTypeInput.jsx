function mediaTypeInput({ field }) {
  return (
    <div className="flex space-x-4">
      <label className="flex cursor-pointer items-center space-x-2">
        <input
          type="radio"
          name={field.name}
          onChange={field.onChange}
          value="movie"
          checked={field.value === "movie"}
          className="h-4 w-4 border-gray-600 bg-gray-700 text-red-600 focus:ring-2 focus:ring-red-500"
        />
        <span className="font-medium text-gray-300">Movies</span>
      </label>

      <label className="flex cursor-pointer items-center space-x-2">
        <input
          type="radio"
          name={field.name}
          onChange={field.onChange}
          value="tv"
          checked={field.value === "tv"}
          className="h-4 w-4 border-gray-600 bg-gray-700 text-red-600 focus:ring-2 focus:ring-red-500"
        />
        <span className="font-medium text-gray-300">TV Shows</span>
      </label>
    </div>
  );
}

export default mediaTypeInput;
