

function TvShowInformation({ tvInfo }) {

  return (
    <>
      <div>
        <p className="font-bold text-[1.2vw] text-white mb-4">
          Information TV Show
        </p>

        <div className="2xl:text-xl">
          <div className="mb-4">
            <p className="font-bold">Original Name</p>
            <p>{tvInfo.original_name} </p>
          </div>
          <div className="mb-4">
            <p className="font-bold">Original Country</p>

            {(tvInfo.origin_country || []).map((countryCode) => (
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
            <p className="font-bold">Status</p>
            <p>{tvInfo.status}</p>
          </div>
          <div className="mb-4">
            <p className="font-bold">NetWork</p>
            <div className="">
              {(tvInfo.networks||[]).map(networks=>
                   <img   className="w-[6vw] h-auto bg-white p-1 mt-1 "  key={networks.id} src={`https://image.tmdb.org/t/p/original/${networks.logo_path}`} alt="" />
              )}
           
            </div>
  
          </div>
        </div>
      </div>
    </>
  );
}

export default TvShowInformation;
