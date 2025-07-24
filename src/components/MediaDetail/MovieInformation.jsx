import { currencyFormatterUS } from "../../libs/utils";

function MovieInformation({ movieInfor }) {
  console.log(movieInfor);
  return (
    <>
      <div>
        <p className="font-bold text-[1.2vw] 2xl:text-xl text-white mb-4">Information</p>

        <div className="2xl:text-xl">
          <div className="mb-4">
            <p className="font-bold">Original Name</p>
            <p>{movieInfor.original_title} </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Original Country</p>

            {(movieInfor.origin_country || []).map((countryCode) => (
              <div className="flex" key={countryCode}>
                <img
                  key={countryCode}
                  src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
                  className="mr-2 mt-1 w-[1.4vw]"
                />
                <p>{countryCode}</p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <p className="font-bold ">Status</p>
            <p>{movieInfor.status}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Budget</p>

            <p>{currencyFormatterUS(movieInfor.budget)}$</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Revenue</p>
            <p>{currencyFormatterUS(movieInfor.revenue)}$</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieInformation;
