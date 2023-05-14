/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { movInitialValue } from "../data/initialValues";
import tiposMovimientos from "../data/tiposMovimientos";
import uniqueId from "../utils/generateId";
import FormGroup from "./FormGroup";

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
          title="Tipo de movimiento"
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

export default AddMovimiento;
