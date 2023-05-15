/* eslint-disable react/prop-types */
import "./App.css";
import useLocalStorage from "./hooks/useLocalStorage";
import Configuraciones from "./components/Configuraciones";
import AddMovimiento from "./components/AddMovimiento";
import Movimientos from "./components/Movimientos";
import Tablon from "./components/Tablon";
import EstadoResultados from "./components/EstadoResultados";

function App() {
  const [costoVenta, setCostoVenta] = useLocalStorage("costoVenta", 90);
  const [desgasteUtilidad, setDesgasteUtilidad] = useLocalStorage(
    "desgasteUtilidad",
    0
  );
  const [movimientos, setMovimientos] = useLocalStorage("movimientos", []);

  const pushMovimiento = (value) => setMovimientos((prev) => [...prev, value]);

  const clearLocalStorage = () => {
    localStorage.removeItem("costoVenta");
    localStorage.removeItem("movimientos");
  };

  const deleteMovimiento = (valueId) => {
    setMovimientos((prev) => prev.filter((value) => value.id !== valueId));
  };

  const handleDesgasteUtilidad = (e) => setDesgasteUtilidad(e.target.value);
  const handleCostoVenta = (e) => setCostoVenta(e.target.value);

  const calcularCostoVenta = () => {
    const compras = movimientos
      .filter((m) => m.movType == 6)
      .reduce((a, b) => {
        return a + b.valor;
      }, 0);

    const perdidaBien = movimientos
      .filter((m) => m.movType == 5)
      .reduce((a, b) => {
        return a + b.valor;
      }, 0);

    const ventas = movimientos
      .filter((m) => m.movType == 2)
      .reduce((a, b) => {
        return a + b.valor;
      }, 0);

    console.log(compras, ventas);

    console.log(movimientos.filter((m) => m.movType == 6));

    const valor = Math.floor(((compras - perdidaBien) / ventas) * 100);

    setCostoVenta(valor);
  };

  return (
    <main className="container">
      <div className="left-container">
        <Configuraciones
          costoVenta={costoVenta}
          handleCostoVenta={handleCostoVenta}
          desgasteUtilidad={desgasteUtilidad}
          handleDesgasteUtilidad={handleDesgasteUtilidad}
          calcularCostoVenta={calcularCostoVenta}
        />
        <button onClick={clearLocalStorage}>Limpiar localstorage</button>
        <AddMovimiento pushMovimiento={pushMovimiento} />
        <Movimientos
          movimientos={movimientos}
          deleteMovimiento={deleteMovimiento}
        />
      </div>
      <div className="right-container">
        <Tablon
          movimientos={movimientos}
          costoVenta={costoVenta}
          desgasteUtilidad={desgasteUtilidad}
        />
        <EstadoResultados
          movimientos={movimientos}
          desgasteUnidad={desgasteUtilidad}
        />
      </div>
    </main>
  );
}

export default App;
