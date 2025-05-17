import "./App.css";
import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import ListComponent from "./components/ListComponent";
import LoadingIndicator from "./LoadingIndicator";
import ErrorMessage from "./ErrorMessage";
import Pagination from "./Pagination";
import SearchAndFilter from "./SearchAndFilter";

// Constants
const API_URL = "https://rickandmortyapi.com/api/character";
const INITIAL_STATE = {
  characters: 0,
  error: null,
  loading: true,
  list: [],
  info: null,
};

/**
 * Custom hook for fetching data from API
 */
const useFetch = (page = 1) => {
  const [state, setState] = useState(INITIAL_STATE);

  // useEffect to fetch API data
  // and set state variables
  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await fetch(`${API_URL}?page=${page}`);

        // Validate response (status code 200-299)
        // else, throw an error
        // to be caught in the catch block
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
          throw new Error("No characters data available");
        }

        setState({
          characters: data.info.count,
          list: data.results,
          info: data.info,
          loading: false,
          error: null,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setState((prev) => ({
          ...prev,
          error: err.message,
          list: [],
          loading: false,
        }));
      }
    };

    fetchData();
  }, [page]);

  return state;
};

/**
 * Main application component.
 * It renders fetched API data
 *
 * @returns {JSX.Element}
 */
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");

  const { characters, error, loading, list, info } = useFetch(currentPage);

  // Filter characters based on search and filters
  const filteredCharacters = useMemo(() => {
    if (!list) return [];

    return list.filter((character) => {
      const matchesSearch = character.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter
        ? character.status.toLowerCase() === statusFilter.toLowerCase()
        : true;
      const matchesGender = genderFilter
        ? character.gender.toLowerCase() === genderFilter.toLowerCase()
        : true;

      return matchesSearch && matchesStatus && matchesGender;
    });
  }, [list, searchTerm, statusFilter, genderFilter]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle retry
  const handleRetry = () => {
    window.location.reload();
  };

  // Calculate pagination info
  const hasNextPage = info?.next !== null;
  const hasPrevPage = info?.prev !== null;
  const totalPages = info?.pages || 1;

  return (
    <>
      <main className="main_app">
        {/* Logo here */}
        <div>
          <img
            src={reactLogo}
            className="react logo"
            alt="React logo"
            width="100"
            height="100"
            loading="lazy"
            aria-label="React logo"
          />
        </div>

        <div className="title_div">
          <h1 className="heading_text">Rick and Monty Character Explorer</h1>
          <p>
            Explore all <span className="char">{characters}</span> characters
            from the Rick and Morty universe, and the number of episodes they
            appear in.
          </p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          genderFilter={genderFilter}
          onGenderFilterChange={setGenderFilter}
        />

        <div className="results-info">
          {!loading && !error && (
            <p>
              Showing {filteredCharacters.length} characters on page{" "}
              {currentPage} of {totalPages}
            </p>
          )}
        </div>

        <section className="list_section" aria-busy={loading}>
          {loading && <LoadingIndicator />}
          {error && <ErrorMessage error={error} onRetry={handleRetry} />}

          {!loading && !error && (
            <>
              {filteredCharacters.length === 0 ? (
                <div className="no-results">
                  <svg className="no-results-icon" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                  </svg>
                  <h3>No characters found</h3>
                  <p>Try adjusting your search or filters</p>
                </div>
              ) : (
                <ul aria-live="polite">
                  {filteredCharacters.map((item) => (
                    <li key={item.id} className="list_item">
                      <ListComponent item={item} />
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </section>

        {!loading && !error && filteredCharacters.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
          />
        )}
      </main>
    </>
  );
}

export default App;
// Note: The code is structured to be modular and reusable.
