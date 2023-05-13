import toCLP from "../utils/toCLP";

/* eslint-disable react/prop-types */
function TablaBalanceRow({ signo = "+", valor, desc }) {
  return (
    <h6 className="tabla-resumen-row">
      <span className="signo">{signo}</span>
      <span className="valor">{toCLP(valor)}</span>
      <span className="desc">{desc}</span>
    </h6>
  );
}

export default TablaBalanceRow;
