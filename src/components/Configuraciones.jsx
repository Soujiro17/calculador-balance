/* eslint-disable react/prop-types */
import FormGroup from "./FormGroup";

function Configuraciones({
  costoVenta,
  handleCostoVenta,
  handleDesgasteUtilidad,
  desgasteUtilidad,
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
    </div>
  );
}

export default Configuraciones;
