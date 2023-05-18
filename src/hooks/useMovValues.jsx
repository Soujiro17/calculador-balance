import {
  activosFijosFilter,
  activosFilters,
  cuentasPorCobrarFilter,
  inventarioFilter,
  pasivosFilter,
  patrimonioFilters,
  utilidadesPerdidasFilter,
} from "../data/filters";
import {
  activosCirculantesMap,
  activosFijosMap,
  cuentasPorCobrarMap,
  inventarioMap,
  pasivosMap,
  patrimonioMap,
  utilidadesMap,
} from "../data/maps";

const useMovValues = ({ movimientos, desgasteUtilidad, costoVenta }) => {
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

  return {
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
    activosCirculantes,
    activosFijos,
    inventario,
    patrimonio,
    utilidades,
    cuentasPorCobrar,
    pasivos,
  };
};

export default useMovValues;
