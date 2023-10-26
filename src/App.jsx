import { Navbar } from "./components/index";
import "./App.css";
import DrawersContextProvider from "./context/DrawersContextProvider";
import Drawers from "./components/layout/Drawers";
import FavoriteOrWhatchConextProvider from "./context/FavoriteOrWhatchConextProvider";
import Footer from "./components/layout/Footer";
import Router from "./routing/router";
import GridCol from "./components/layout/GridCol";
function App() {
  return (
    <FavoriteOrWhatchConextProvider>
      <DrawersContextProvider>
        <GridCol>
          <Drawers />
          <div className="grid  place-items-center h-fit  ">
            <Navbar />
            <div className="w-full overflow-hidden ">
              <main className="m-auto min-h-[64.2vh]  ">
                <Router />
              </main>
              <Footer />
            </div>
          </div>
        </GridCol>
      </DrawersContextProvider>
    </FavoriteOrWhatchConextProvider>
  );
}

export default App;
