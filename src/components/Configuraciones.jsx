/* eslint-disable react/prop-types */
import FormGroup from "./FormGroup";

function Configuraciones({
  costoVenta,
  handleCostoVenta,
  handleDesgasteUtilidad,
  desgasteUtilidad,
  calcularCostoVenta,
}) {
  return (
    <div className="configuraciones bs br-s">
      <FormGroup
        id="costo-venta"
        label="Costo por venta"
        min="0"
        max="100"
        type="number"
        placeholder="Costo por venta"
        value={costoVenta}
        onChange={handleCostoVenta}
        sufix="%"
      />
      <FormGroup
        id="ganancia-venta"
        label="Ganancia por venta"
        min="0"
        max="100"
        disabled
        type="number"
        value={100 - costoVenta}
        sufix="%"
      />
      <FormGroup
        id="desgaste-utilidad"
        label="Desgaste por utilidad"
        min="0"
        max="100"
        type="number"
        onChange={handleDesgasteUtilidad}
        value={desgasteUtilidad}
        sufix="%"
      />
      <h6>
        El cálculo automático se realiza sumando todas las compras de activo
        fijo (tipo 0) menos las pérdidas de bien (tipo 5) dividido entre las
        ventas de inventario (tipo 2)
      </h6>
      <button onClick={calcularCostoVenta}>Calcular automáticamente</button>
    </div>
  );
}

export default Configuraciones;
