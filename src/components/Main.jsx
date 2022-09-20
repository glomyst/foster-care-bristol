import { HeartIcon as HeartSolid } from "@heroicons/react/20/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

export default function Main({ records, handleFavourite, favourites }) {
  return (
    <>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2">
        {records.map((data, i) => {
          // const lon = data?.geometry?.coordinates[0] ?? null;
          // const lat = data?.geometry?.coordinates[1] ?? null;
          let favourited = false;

          favourites.forEach((favourite) => {
            if (favourite?.ward_code === data?.fields?.ward_code) {
              favourited = true;
            }
          });
          // if (favourites.includes(data?.fields)) favourited = true;

          const lon = null;
          const lat = null;

          const img =
            lat && lon
              ? `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+9ed4bd(${lon},${lat})/${lon},${lat},18/600x600?access_token=pk.eyJ1Ijoid2VibWFzdGVybXYiLCJhIjoiY2s5dmEzZXIwMDFkOTNncnZlYnZ1Z2Z4aCJ9.684YcbVZdQSd0hk1PG4AFg`
              : "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=";

          return (
            <li
              key={i}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <div className="flex flex-1 flex-col p-8">
                <img
                  className="mx-auto flex-shrink-0 rounded-lg shadow-md"
                  src={img}
                  alt=""
                />

                <h3 className="mt-6 text-sm font-medium text-gray-900">
                  {data?.fields?.ward_name}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dt className="sr-only">Ward Name</dt>
                  <dd className="text-sm text-gray-500">
                    {data?.fields?.period}
                  </dd>
                  <dt className="sr-only">Number of Children</dt>
                  <dd className="mt-3">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {data?.fields?.foster_care_placements_number_of_children}{" "}
                      Children
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <button
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
                      onClick={() => handleFavourite(data?.fields, true)}
                    >
                      {!favourited && (
                        <HeartOutline
                          className="h-5 w-5 text-teal-600"
                          aria-hidden="true"
                        />
                      )}

                      {favourited && (
                        <HeartSolid
                          className="h-5 w-5 text-red-600"
                          aria-hidden="true"
                        />
                      )}

                      {!favourited && (
                        <span className="ml-3 text-teal-600">
                          Add to Favourites
                        </span>
                      )}

                      {favourited && (
                        <span className="ml-3 text-red-600">
                          Remove from Favourites
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
