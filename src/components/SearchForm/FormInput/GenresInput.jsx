import { useWatch } from "react-hook-form";
import useFetch from "../../../hooks";
import { useEffect } from "react";

function GenresInput({ control, field }) {
  const { value = [], onChange } = field;

  console.log(value);
  const mediaType = useWatch({ name: "mediaType", control });
  // name là bên field lắng nghe

  const { data: dataSearch } = useFetch({
    url: `https://api.themoviedb.org/3/genre/${mediaType}/list`,
    token: `${import.meta.env.VITE_API_TOKEN}`,
  });
  useEffect(() => {
    onChange([]);
  }, [mediaType]);
  // if (!mediaType) {
  //   return (
  //     <p className="text-sm text-gray-500">Vui lòng chọn loại media trước</p>
  //   );
  // }

  console.log(dataSearch);
  console.log(mediaType);

  return (
    <div className="flex flex-wrap gap-2">
      {(dataSearch.genres || []).map((genre) => (
        <button
          type="button"
          onClick={() => {
            if (value.includes(genre.id)) {
              return onChange(value.filter((item) => item !== genre.id));
            } else {
              return onChange([...value, genre.id]);
            }
          }}
          key={genre.id}
          className={`rounded-full border px-3 py-2 text-sm font-medium transition-all duration-200 ${
            value.includes(genre.id)
              ? "border-red-600 bg-red-600 text-white shadow-lg"
              : "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-600"
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenresInput;
