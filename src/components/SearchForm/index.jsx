import { useForm } from "react-hook-form";
import FormField from "./FormField";
import mediaTypeInput from "./FormInput/mediaTypeInput";
import GenresInput from "./FormInput/GenresInput";
import RatingInput from "./FormInput/RatingInput";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function SearchForm({ setSearchFormValue }) {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const mediaTypeSearch = searchParams.get("mediaType") || "movie";
  console.log(mediaTypeSearch);
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      mediaType: mediaTypeSearch,
      genres: [],
      rating: "all",
    },
  });
  console.log(control);

  const formValue = watch();

  useEffect(() => {
    setSearchFormValue(formValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formValue)]);
  // setSearchFormValue(formValue)
  useEffect(() => {
    setSearchFormValue(formValue); // Cập nhật giá trị form bên ngoài

    const updatedParams = new URLSearchParams();

    // Chỉ thêm vào URL các giá trị thay đổi
    if (formValue.mediaType !== "movie") {
      // Nếu `mediaType` không phải mặc định
      updatedParams.set("mediaType", formValue.mediaType);
    }

    if (formValue.rating !== "all") {
      // Nếu `rating` không phải mặc định
      updatedParams.set("rating", formValue.rating);
    }

    if (formValue.genres.length > 0) {
      // Nếu `genres` có giá trị
      updatedParams.set("genres", formValue.genres.join(","));
    }

    // Cập nhật lại URL với các query params thay đổi
    setSearchParams(updatedParams);
  }, [JSON.stringify(formValue), setSearchParams, setSearchFormValue]);

  const onSubmit = (data) => {
    console.log(data); // Log dữ liệu form khi submit
  };
  return (
    <div className="space-y-6">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          label={"Media Type"}
          name={"mediaType"}
          control={control}
          Component={mediaTypeInput}
        />
        <FormField
          label={"Genres"}
          name={"genres"}
          control={control}
          Component={GenresInput}
        />
        <FormField
          label={"Rating"}
          name={"rating"}
          control={control}
          Component={RatingInput}
        />
        <button
          className="w-full transform rounded-lg bg-gradient-to-r from-red-600 to-orange-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-red-700 hover:to-orange-700 hover:shadow-xl"
          type="submit"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
