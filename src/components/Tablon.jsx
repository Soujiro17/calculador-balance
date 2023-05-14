/* eslint-disable react/prop-types */
import useMovValues from "../hooks/useMovValues";
import toCLP from "../utils/toCLP";

function Tablon({ movimientos = [], costoVenta, desgasteUtilidad }) {
  const {
    totalActivosCirculantes,
    totalPasivos,
    totalActivosFijos,
    totalInventario,
    totalCuentasPorCobrar,
    totalPatrimonio,
    totalUtilidades,
    activosCirculantesMapeado,
    activosFijosMapeado,
    patrimonioMapeado,
    utilidadesMapeado,
    inventarioMapeado,
    cuentasPorCobrarMapeado,
    pasivosMapeado,
  } = useMovValues({ movimientos, desgasteUtilidad, costoVenta });

  return (
    <div className="tabla-grid bs pd br-s">
      {/* ACTIVOS */}
      <div className="left-grid">
        <section className="balance-section">
          <h4>Activos circulantes ({toCLP(totalActivosCirculantes)})</h4>
          {activosCirculantesMapeado}
        </section>
        <section className="balance-section">
          <h4>Activos fijos ({toCLP(totalActivosFijos)})</h4>
          {activosFijosMapeado}
        </section>
        <section className="balance-section">
          <h4>Cuentas por cobrar ({toCLP(totalCuentasPorCobrar)})</h4>
          {cuentasPorCobrarMapeado}
        </section>
        <section className="balance-section">
          <h4>Inventario ({toCLP(totalInventario)})</h4>
          {inventarioMapeado}
        </section>
        <section className="balance-section total-pos">
          <h4>
            Total (activos circulantes + activos fijos + inventario + cuentas
            por cobrar):
          </h4>
          {toCLP(
            totalActivosFijos +
              totalActivosCirculantes +
              totalInventario +
              totalCuentasPorCobrar
          )}
        </section>
      </div>
      {/* PASIVOS */}
      <div className="right-grid">
        <section className="balance-section">
          <h4>Pasivos ({toCLP(totalPasivos)})</h4>
          {pasivosMapeado}
        </section>
        <section className="balance-section">
          <h4>Patrimonio ({toCLP(totalPatrimonio)})</h4>
          {patrimonioMapeado}
        </section>
        <section className="balance-section">
          <h4>Utilidad ({toCLP(totalUtilidades)})</h4>
          {utilidadesMapeado}
        </section>
        <section className="balance-section total-neg">
          <h4>Total (patrimonio + utilidades + pasivos):</h4>
          {toCLP(totalPatrimonio + totalUtilidades + totalPasivos)}
        </section>
      </div>
    </div>
  );
}

export default Tablon;
