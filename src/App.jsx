/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import "./App.css";
import tiposMovimientos from "./data/tiposMovimientos";
import uniqueId from "./utils/generateId";
import { movInitialValue } from "./data/initialValues";
import {
  activosFijosFilter,
  activosFilters,
  cuentasPorCobrarFilter,
  inventarioFilter,
  pasivosFilter,
  patrimonioFilters,
  utilidadesPerdidasFilter,
} from "./data/filters";
import {
  activosCirculantesMap,
  activosFijosMap,
  cuentasPorCobrarMap,
  inventarioMap,
  pasivosMap,
  patrimonioMap,
  utilidadesMap,
} from "./data/maps";
import toCLP from "./utils/toCLP";
import useLocalStorage from "./hooks/useLocalStorage";

function FormGroup({ label, id, sufix, ...props }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      &nbsp;{sufix}
    </div>
  );
}

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

function AddMovimiento({ pushMovimiento }) {
  const [values, setValues] = useState(movInitialValue);

  const selectRef = useRef(null);

  const handleValues = (e) =>
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const resetValues = () => {
    setValues({
      ...movInitialValue,
      id: uniqueId(),
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    pushMovimiento({ ...values, valor: Number(values.valor) });

    selectRef.current.focus();

    resetValues();
  };

  return (
    <div className="movimientos bs pd br-s">
      <form onSubmit={onSubmitForm} className="add-movement">
        <select
          ref={selectRef}
          required
          onChange={handleValues}
          name="movType"
          value={values.movType}
        >
          <option value="">Seleccionar movimiento</option>
          {tiposMovimientos.map((tipoMovimiento) => (
            <option value={tipoMovimiento.id} key={tipoMovimiento.id}>
              {tipoMovimiento.title}
            </option>
          ))}
        </select>
        <FormGroup
          id="valor"
          label="Valor del movimiento"
          type="number"
          min="0"
          value={values.valor}
          name="valor"
          onChange={handleValues}
          required
        />
        <FormGroup
          id="desc"
          label="Descripción del movimiento"
          type="text"
          placeholder="Descripción..."
          value={values.desc}
          name="desc"
          onChange={handleValues}
          required
        />
        <FormGroup
          id="fecha"
          label="Fecha"
          type="text"
          placeholder="Fecha"
          value={values.fecha}
          name="fecha"
          onChange={handleValues}
        />
        <input type="submit" />
      </form>
    </div>
  );
}

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

function Tablon({ movimientos = [], costoVenta, desgasteUtilidad }) {
  const activosCirculantes = movimientos.filter(activosFilters);
  const activosFijos = movimientos.filter(activosFijosFilter);
  const inventario = movimientos.filter(inventarioFilter);
  const patrimonio = movimientos.filter(patrimonioFilters);
  const utilidades = movimientos.filter(utilidadesPerdidasFilter);
  const cuentasPorCobrar = movimientos.filter(cuentasPorCobrarFilter);
  const pasivos = movimientos.filter(pasivosFilter);

  let totalActivosCirculantes = 0,
    totalPasivos = 0,
    totalActivosFijos = 0,
    totalInventario = 0,
    totalCuentasPorCobrar = 0,
    totalPatrimonio = 0,
    totalUtilidades = 0;

  const activosCirculantesMapeado = activosCirculantes.map((m) => {
    const { valor, component } = activosCirculantesMap(m, desgasteUtilidad);

    totalActivosCirculantes += valor;

    return component;
  });

  const activosFijosMapeado = activosFijos.map((m) => {
    const { valor, component } = activosFijosMap(m);

    totalActivosFijos += valor;

    return component;
  });

  const patrimonioMapeado = patrimonio.map((m) => {
    const { valor, component } = patrimonioMap(m);

    totalPatrimonio += valor;

    return component;
  });

  const utilidadesMapeado = utilidades.map((m) => {
    const { valor, component } = utilidadesMap(m, costoVenta, desgasteUtilidad);

    totalUtilidades += valor;

    return component;
  });

  const inventarioMapeado = inventario.map((m) => {
    const { valor, component } = inventarioMap(m, costoVenta);

    totalInventario += valor;

    return component;
  });

  const cuentasPorCobrarMapeado = cuentasPorCobrar.map((m) => {
    const { valor, component } = cuentasPorCobrarMap(m);

    totalCuentasPorCobrar += valor;

    return component;
  });

  const pasivosMapeado = pasivos.map((m) => {
    const { valor, component } = pasivosMap(m);

    totalPasivos += valor;

    return component;
  });

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
          <h4>Total:</h4>
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
          <h4>Total:</h4>
          {toCLP(totalPatrimonio + totalUtilidades + totalPasivos)}
        </section>
      </div>
    </div>
  );
}

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

  return (
    <main className="container">
      <div className="left-container">
        <Configuraciones
          costoVenta={costoVenta}
          handleCostoVenta={handleCostoVenta}
          desgasteUtilidad={desgasteUtilidad}
          handleDesgasteUtilidad={handleDesgasteUtilidad}
        />
        <button onClick={clearLocalStorage}>Limpiar localstorage</button>
        <AddMovimiento pushMovimiento={pushMovimiento} />
        <Movimientos
          movimientos={movimientos}
          deleteMovimiento={deleteMovimiento}
        />
      </div>
      <Tablon
        movimientos={movimientos}
        costoVenta={costoVenta}
        desgasteUtilidad={desgasteUtilidad}
      />
    </main>
  );
}

export default App;
