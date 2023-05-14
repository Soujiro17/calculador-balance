/* eslint-disable react/prop-types */
import toCLP from "../utils/toCLP";

function Movimientos({ movimientos = [], deleteMovimiento }) {
  return (
    <div className="movimientos bs pd br-s">
      <table className="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Valor</th>
            <th>Descripción</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((movimiento) => (
            <tr key={movimiento.id}>
              <td>{movimiento.fecha}</td>
              <td>{movimiento.movType}</td>
              <td>{toCLP(movimiento.valor)}</td>
              <td>{movimiento.desc}</td>
              <td>
                <button onClick={() => deleteMovimiento(movimiento.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Movimientos;
