import Image from "next/image";
import { CarCard, CustomFilter, Hero, SearchBar } from "@/components";
import { getCars } from "@/api";
import { fuels, yearsOfProduction } from "@/constants";

export default async function Home({ searchParams }: any) {
  // console.log(searchParams)
  const allCars = await getCars({
    manufacturer: searchParams.manufacturer || "audi",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "q5",
  });

  const isDataEmpty =
    !Array.isArray(allCars.data) || allCars.data.length < 1 || !allCars.data;

  // console.log(isDataEmpty);

  return (
    <main className="overflow-hidden">
      <Hero />
      <div id="discover" className=" max-width mt-12 padding-x padding-y">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like.</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year"  options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars.data?.map((car: CarType, i: string) => (
                <CarCard car={car} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Ops , no results</h2>
            <p className="">{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  );
}
