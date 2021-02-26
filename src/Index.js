import ReactDOM from "react-dom";
import React from "react";

import RestaurantCard from "./Restaurant.js";
import "./styles.css";
import FooterTag from "./footer.js";

class App extends React.Component {
  state = {
    loading: true,
    hotels: [],
    query: "",
    desc: "",
  };

  onChange = (event) => {
    this.setState({ ...this.state, query: event.target.value });
  };
  async componentDidMount() {
    const url = "https://api.mocki.io/v1/9c4b27d4";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ hotels: Object.values(data.DelhiHotels), loading: false });
  }

  render() {
    // filtering hotel by name
    const filterHotels = this.state.hotels.filter((hotel) => {
      return (
        hotel.name.toLowerCase().indexOf(this.state.query.toLowerCase()) !== -1
      );
    });

    return (
      <>
        {this.state.loading ? (
          <h1>loading...</h1>
        ) : (
          <>
            {/* Navbar */}
            <nav className="navbar navbar-dark bg-dark">
              <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Holidaying</span>
                <form className="d-flex">
                  <input
                    id="inputText"
                    className="form-control me-2"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={this.onChange}
                    value={this.state.query}
                  />
                </form>
              </div>
            </nav>

            {/* Heading and card call*/}
            <h1>Restaurants</h1>
            <h3>Location: Delhi</h3>
            <div className="innerBox">
              {/* When search do not match name */}
              {this.state.hotels.map((hotel, i) => {
                <RestaurantCard
                  key={i}
                  name={hotel.name}
                  image={hotel.image}
                  description={hotel.description}
                  rating={hotel.rating}
                />;
              })}

              {/* When search match name */}
              {filterHotels.length > 0
                ? filterHotels.map((hotel, i) => (
                    <RestaurantCard
                      key={i}
                      name={hotel.name}
                      image={hotel.image}
                      description={hotel.description}
                      rating={hotel.rating}
                    />
                  ))
                : this.state.hotels.map((hotel, i) => (
                    <RestaurantCard
                      key={i}
                      name={hotel.name}
                      image={hotel.image}
                      description={hotel.description}
                      rating={hotel.rating}
                    />
                  ))}
            </div>
          </>
        )}
        <FooterTag />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
