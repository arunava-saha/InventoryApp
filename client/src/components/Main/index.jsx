import { Provider } from "react-redux";
import store from "../../store/store";
import Navbar from "../Navbar";
import Products from "../Products";

const Main = () => {
  return (
    <div
      className="App"
      style={{ backgroundColor: "white", padding: "2rem", borderRadius: "5px" }}
    >
      <div className="Appcon">
        <Provider store={store}>
          <Navbar />
          <section>
            <h5
              style={{
                textAlign: "center",
                margin: "1rem",
                fontSize: "1.5rem",
              }}
            >
              Products we offer
            </h5>
            <Products />
          </section>
        </Provider>
      </div>
    </div>
  );
};

export default Main;
