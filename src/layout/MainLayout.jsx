import { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Main from "../components/Main";
import Side from "../components/Side";
import axios from "axios";
import Skeleton from "../components/Skeleton";
import useLocalStorage from "use-local-storage";
import InfiniteScroll from "react-infinite-scroll-component";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MainLayout() {
  const [records, setRecords] = useLocalStorage("records", []);
  const [favourites, setFavourites] = useLocalStorage("favourites", []);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useLocalStorage("chartdata", null);
  const [moreLoading, setMoreLoading] = useState(false);
  useEffect(() => {
    handleApiFetch();
  }, []);

  const handleApiFetch = (search = "") => {
    setLoading(true);
    axios.get(getUrl(search)).then((respose) => {
      setRecords(respose?.data?.records);
      setLoading(false);
    });
  };

  const loadMore = async () => {
    setMoreLoading(true);
    await axios.get(getUrl("", records.length + 1)).then((respose) => {
      console.log([...records, respose?.data?.records]);
      setRecords([...records, ...respose?.data?.records]);
      setMoreLoading(false);
    });
  };

  const getUrl = (search = "", start = null) => {
    const query = search ? `&q=${search}` : "";
    const startFrom = start ? `&start=${start}` : "";
    return `https://opendata.bristol.gov.uk/api/records/1.0/search/?dataset=foster-care-placements-number-of-children-in-bristol&sort=ward_name&facet=ward_name&facet=period${query}${startFrom}`;
  };

  const handleSearch = (value) => {
    handleApiFetch(value);
  };

  const handleFavourite = (code) => {
    let includes = false;

    favourites.forEach((favourite) => {
      if (favourite?.ward_code === code?.ward_code) {
        includes = true;
      }
    });

    const temp_fav = [...favourites];
    if (includes) {
      temp_fav.splice(temp_fav.indexOf(code), 1);
    } else {
      temp_fav.push(code);
    }

    // set chart data
    const tmp_chartData = [];
    temp_fav.forEach((fav) => {
      const children = Number(
        fav?.foster_care_placements_number_of_children.replace(/[^0-9]+/g, "")
      );
      tmp_chartData.push({ name: fav?.ward_name, value: children });
    });

    setChartData(tmp_chartData);
    setFavourites([...temp_fav]);
  };

  return (
    <>
      <div className="min-h-full">
        <Popover as="header" className="bg-teal-600 pb-24">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative flex items-center justify-center py-5 lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 flex-shrink-0 lg:static hidden lg:block">
                    <a href="#">
                      <span className="sr-only">Your Company</span>
                      <div className="flex items-center justify-center">
                        <img
                          className="h-10 w-auto"
                          src="https://images.squarespace-cdn.com/content/601c45f54889e53f2440675b/1612466254198-X43E4X5015FNF5JWSGVF/We+Care+Foster+Care+Logo.png?format=1500w&content-type=image%2Fpng"
                          alt="Your Company"
                        />
                        <span className="pl-5 text-white font-bold">
                          Foster Care Bristol
                        </span>
                      </div>
                    </a>
                  </div>

                  {/* Search */}
                  <div className="min-w-0 flex-1 px-12 lg:hidden">
                    <div className="mx-auto w-full max-w-xs">
                      <label htmlFor="desktop-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative text-white focus-within:text-gray-600">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <MagnifyingGlassIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                        <input
                          id="desktop-search"
                          className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-white focus:border-transparent focus:bg-opacity-100 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                          placeholder="Search"
                          type="search"
                          name="search"
                          onChange={(e) => {
                            if (e.target.value.length > 2)
                              handleSearch(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden border-t border-white border-opacity-20 py-5 lg:block">
                  <div className="grid grid-cols-1 items-center gap-8">
                    <div>
                      <div className="mx-auto w-full">
                        <label htmlFor="mobile-search" className="sr-only">
                          Search
                        </label>
                        <div className="relative text-white focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            id="mobile-search"
                            className="block w-full rounded-md border border-transparent bg-white bg-opacity-20 py-2 pl-10 pr-3 leading-5 text-gray-900 placeholder-white focus:border-transparent focus:bg-opacity-100 focus:placeholder-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                            placeholder="Search"
                            type="search"
                            name="search"
                            onChange={(e) => {
                              handleSearch(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Popover>
        <main className="-mt-24 pb-8">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="sr-only">Page title</h1>
            {/* Main 3 column grid */}
            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
              {/* Left column */}
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <section aria-labelledby="section-1-title">
                  <h2 className="sr-only" id="section-1-title">
                    Section title
                  </h2>
                  <div className="overflow-hidden rounded-lg bg-white shadow p-5">
                    <InfiniteScroll
                      dataLength={records.length}
                      next={loadMore}
                      hasMore={true}
                    >
                      {!loading && records && favourites && (
                        <Main
                          records={records}
                          handleFavourite={handleFavourite}
                          favourites={favourites}
                        />
                      )}
                    </InfiniteScroll>
                    {loading && <Skeleton />}
                    {moreLoading && <Skeleton />}
                  </div>
                </section>
              </div>

              {/* Right column */}
              <div className="grid grid-cols-1 gap-4">
                <section aria-labelledby="section-2-title">
                  <h2 className="sr-only" id="section-2-title">
                    Section title
                  </h2>
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      {favourites && (
                        <Side
                          favourites={favourites}
                          handleFavourite={handleFavourite}
                          chartData={chartData}
                        />
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="border-t border-gray-200 py-8 text-center text-sm text-gray-500 sm:text-left">
              <span className="block sm:inline">
                &copy; 2021 Your Company, Inc.
              </span>
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
