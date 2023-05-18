import useTotalCuentas from "../hooks/useTotalCuentas";
import toCLP from "../utils/toCLP";
import TablaBalanceRow from "./TablaBalanceRow";

/* eslint-disable react/prop-types */
function EstadoResultados({ movimientos, desgasteUtilidad }) {
  const {
    totalIngresos,
    totalGastos,
    totalCostos,
    totalCaja,
    totalCuentasPorCobrar,
    costos,
    gastos,
    ingresos,
  } = useTotalCuentas({ movimientos, desgasteUtilidad });

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
          <span>Caja:</span> {toCLP(totalCaja + totalCuentasPorCobrar)}
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
