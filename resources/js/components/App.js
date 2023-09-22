import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import StarshipCard from "./StarshipCard"

    function App() {
        // Setup state hooks
        const [starships, setStarships] = useState([]);
        const [filteredStarships, setFilteredStarships] = useState([]);
        const [starshipClassInputValue, setStarshipClassInputValue] = useState("");
        const [starshipCostInputValue, setStarshipCostInputValue] = useState("");
        const [loading, setLoading] = useState(true);

        // Filter loaded starships based on the name without reloading
        function handleNameChange(event) {
            const filteredShips = starships.filter( starship => {
                return starship.name.includes(event.target.value);
            });
            setFilteredStarships(filteredShips);
        }

        // Send request to find starships based on classname and cost
        function searchStarships() {
            setLoading(true);
            setStarships([]);
            setFilteredStarships([]);
            const body = {
                starshipClass: starshipClassInputValue,
                starshipCost: starshipCostInputValue
            };
            axios.post('http://localhost:8000/api/starships', body)
                .then(data => {
                    setStarships(Object.values(data.data));
                    setFilteredStarships(Object.values(data.data));
                    setLoading(false);
                })
                // Do better error management here
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }

        // When the component loads, send request to get all starships
        useEffect(() => {
            axios.get('http://localhost:8000/api/starships')
                .then(data => {
                    setStarships(data.data.results);
                    setFilteredStarships(data.data.results);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        }, []);

        return (
            <div className="container" style={{marginTop: "35px"}}>
                <div className="search-form">
                    <div style={{ gridColumn: "1 / 2"}}>
                        <label htmlFor="starship_class" className="search-form-labels">Starship class</label>
                        <input onChange={e => setStarshipClassInputValue(e.target.value)} className="search-form-inputs" type="text" name="starship_class" id="starship_class"/>
                    </div>

                    <div style={{ gridColumn: "3 / 4"}}>
                        <label htmlFor="starship_budget" className="search-form-labels">Budget cost in credits</label>
                        <input onChange={e => setStarshipCostInputValue(e.target.value)} className="search-form-inputs" type="number" name="starship_budget" id="starship_budget"/>
                    </div>

                    <input onClick={searchStarships} className="search-form-button" style={{ gridColumn: "5 / 5" }} type="button" id="search-button" value="search"/>
                </div>

                <div className="separator"></div>

                <div id="results-container">
                    <div style={{ gridColumn: "1 / 1"}}>
                        <h3>{filteredStarships.length} out of {starships.length} results</h3>
                        <div>
                            <label style={{ marginRight: "5px" }} htmlFor="starship_name">Filter by name</label>
                            <input onChange={handleNameChange} style={{background: "#d9d5d3"}} type="text" name="starship_name" id="starship_name"/>
                        </div>
                    </div>
                    <div style={{ gridColumn: "2 / 3"  }} id="results-dataframe">
                        { loading ? <p>Loading...</p> : "" }
                        { loading === false && filteredStarships.length === 0 ? "No results" : ""}
                        { filteredStarships.map(starship => {
                                return <StarshipCard
                                    name={starship.name}
                                    maker={starship.manufacturer}
                                    shipClass={starship.starship_class}
                                    crew={starship.crew}
                                    passengers={starship.passengers}
                                    cargo={new Intl.NumberFormat().format(starship.cargo_capacity)}
                                    cost={new Intl.NumberFormat().format(starship.cost_in_credits)}
                                    key={starship.name}/>
                            })
                        }
                    </div>
                </div>
            </div>
        );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App />, document.getElementById('root'));
}
