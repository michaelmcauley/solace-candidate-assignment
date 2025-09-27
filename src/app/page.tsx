"use client";

import AdvocateCard from "./components/AdvocateCard";
import { Advocate } from "./types";
import { useEffect, useState } from "react";

import "./page.css";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [advocates, setAdvocates] = useState<Advocate[]>([]);

  // handleSearch is called when the form is submitted or when the component mounts
  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const url = searchTerm ? `/api/advocates?search=${searchTerm}` : "/api/advocates";
    fetch(url).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  };

  // populate some advocates when the component mounts
  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <main className="container" id="advocate-search">
      <header>
        <h1 className="centered">Find your advocate</h1>
      </header>
      <section>
        <form onSubmit={handleSearch}>
          <fieldset role="group">
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              name="searchTerm"
              type="text"
              placeholder="Search advocates by name or specialty"
            />
            <input type="submit" value="Search" />
          </fieldset>
        </form>
      </section>
      <section>
        {advocates.map((advocate) => (
          <AdvocateCard key={advocate.id} advocate={advocate} />
        ))}
      </section>
    </main>
  );
}
