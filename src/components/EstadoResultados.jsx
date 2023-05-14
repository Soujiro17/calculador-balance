import toCLP from "../utils/toCLP";
import TablaBalanceRow from "./TablaBalanceRow";

/* eslint-disable react/prop-types */
function EstadoResultados({ movimientos, desgasteUnidad }) {
  const ingresos = movimientos.filter((m) => m.movType == 2);
  const caja = movimientos.filter((m) => m.movType != 5);
  const gastos = movimientos.filter(
    (m) => m.movType == 1 || m.movType == 0 || m.movType == 4
  );

  const cuentasPorCobrar = movimientos.filter((m) => m.movType == 7);

  const costos = movimientos.filter((m) => m.movType == 6);

  const totalIngresos = ingresos.reduce((a, b) => {
    return a + Number(b.valor);
  }, 0);

  const totalGastos = gastos.reduce((a, b) => {
    return a + Number(b.valor);
  }, 0);

  const totalCostos = costos.reduce((a, b) => {
    return a + Number(b.valor);
  }, 0);

  const totalCaja = caja.reduce((a, b) => {
    const { movType: mT } = b;

    let valor = b.valor;

    if (mT == 0 || mT == 1 || mT == 6 || mT == 4 || mT == 7) {
      valor = -valor;
    } else if (mT == 8) {
      valor = valor * ((100 - desgasteUnidad) / 100);
    }

    return a + Number(valor);
  }, 0);

  const totalCuentasPorCobrar = cuentasPorCobrar.reduce((a, b) => {
    return a + Number(b.valor);
  }, 0);

  return (
    <section className="estado-resultados balance-section br-s">
      <div className="estado-resultados-wrapper">
        <div>
          <h4>Ingresos: {toCLP(totalIngresos)}</h4>
          {ingresos.map((ingreso) => (
            <TablaBalanceRow
              key={ingreso.id}
              fecha={ingreso.fecha}
              desc={ingreso.desc}
              valor={ingreso.valor}
            />
          ))}
        </div>
        <div>
          <h4>Gastos: {toCLP(totalGastos)}</h4>
          {gastos.map((ingreso) => (
            <TablaBalanceRow
              key={ingreso.id}
              fecha={ingreso.fecha}
              desc={ingreso.desc}
              valor={ingreso.valor}
            />
          ))}
        </div>
        <div>
          <h4>Costos: {toCLP(totalCostos)}</h4>
          {costos.map((ingreso) => (
            <TablaBalanceRow
              key={ingreso.id}
              fecha={ingreso.fecha}
              desc={ingreso.desc}
              valor={ingreso.valor}
            />
          ))}
        </div>
      </div>
      <div className="estado-resultados-wrapper resumen">
        <h4>
          <span>Ingresos:</span> {toCLP(totalIngresos)}
        </h4>
        <h4>
          <span>Costos:</span> {toCLP(totalCostos)}
        </h4>
        <h4>
          <span>Gastos:</span> {toCLP(totalGastos)}
        </h4>
        <hr />
        <h4>
          <span>Utilidad:</span>{" "}
          {toCLP(totalIngresos - totalCostos - totalGastos)}
        </h4>
        <h4>
          <span>Total:</span>{" "}
          {toCLP(
            totalCaja +
              totalCuentasPorCobrar -
              (totalIngresos - totalCostos - totalGastos)
          )}
        </h4>
      </div>
    </section>
  );
}

export default EstadoResultados;
