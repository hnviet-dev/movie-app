import { useLoaderData } from "react-router-dom";
import RelatedMediaList from "../../components/MediaDetail/RelatedMediaList";
import { GENDER_MAPING } from "../../libs/constant";

function PropleDetail() {
  const dataCast=useLoaderData();
  console.log(dataCast)

  return (
    <>
      <div className="flex bg-black text-white text-[1.2vw] 2xl:text-xl">
        <div className="container">
                <div className="flex-1">
          <div>
            <img
              src={ dataCast.profile_path? `https://image.tmdb.org/t/p/original${dataCast.profile_path}.jpg`:
            "../../../public/2x3.svg"
            }
              alt=""
            />
          </div>

          <p className="font-bold my-5 text-[1.4vw] ">Presonal Info</p>
          <div className="space-y-4">
            <div>
              <p className="font-bold">Known For</p>
              <p>
                {dataCast.known_for_department}
              </p>
            </div>
            <div>
              <p className="font-bold">Gender</p>
              <p>{GENDER_MAPING[dataCast.gender]}</p>
            </div>
            <div>
              <p className="font-bold">Place of Birth</p>
              <p>{dataCast.place_of_birth}</p>
            </div>
            <div>
              <p className="font-bold">Birthday</p>
              <p >{dataCast.birthday}</p>
            </div>
          </div>
        </div>
        <div className="flex-[2]">
          <p className="mb-6 text-[1.8vw] font-bold">{dataCast.name}</p>
          <div className="mb-6">
            <p className="mb-4 text-[1.4vw] font-bold">Biography</p>
            <p className="whitespace-pre-line">{dataCast.biography}</p>
          </div>
        <RelatedMediaList movieRelated={dataCast.combined_credits?.cast||[]}
        ></RelatedMediaList>

        </div>
        </div>
    
      </div>
    </>
  );
}

export default PropleDetail;
