import { faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
function Header() {
  return (
    <>
      <header className="flex h-14 items-center justify-between bg-slate-950 px-8 text-white">
        <div className="flex items-center gap-4">
          <NavLink to={"/"}>
            <img
              src="../public/Logo/netflix.png"
              alt=""
              className="w-16 sm:w-28"
            />
          </NavLink>
          <Link
            to="/search?mediaType=movie"
            className="text-[1.4vw] 2xl:text-2xl"
          >
            Movie
          </Link>
          <Link to="/search?mediaType=tv" className="text-[1.4vw] 2xl:text-2xl">
            TV Show
          </Link>
        </div>

        <div className="flex cursor-pointer items-center gap-4">
          <NavLink to="/search">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </NavLink>

          <FontAwesomeIcon icon={faBell} />
          <img src="/Icond/image.png" alt="" className="w-8" />
        </div>
      </header>
    </>
  );
}

export default Header;
