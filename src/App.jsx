import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import Header from "./components/Header";

import FeatureMovies from "./components/FeatureMovies";
import MediaList from "./components/MediaList";
import {
  TABS_Popular,
  TABS_TOP_RATE,
  TABS_TRENDING,
  TABS_NOW_PLAYING,
  TABS_UPCOMING,
} from "./libs/constant";

function App() {
  return (
    <>
      <FeatureMovies />

      <div className="bg-black">
        <div className="xl:text-red m-auto max-w-screen-2xl">
          <MediaList title={"Trending"} tabs={TABS_TRENDING} />
          <MediaList title={"Top Rates"} tabs={TABS_TOP_RATE} />
          <MediaList title={"Popular"} tabs={TABS_Popular} />
          <MediaList title={"Now Playing"} tabs={TABS_NOW_PLAYING} />
          <MediaList title={"Upcoming"} tabs={TABS_UPCOMING} />
        </div>
      </div>
    </>
  );
}

export default App;
