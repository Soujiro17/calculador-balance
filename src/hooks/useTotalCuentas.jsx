function useTotalCuentas({ movimientos, desgasteUtilidad }) {
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

    if (mT == 0 || mT == 1 || mT == 6 || mT == 4 || mT == 7 || mT == 10) {
      valor = -valor;
    } else if (mT == 8) {
      valor = valor * ((100 - desgasteUtilidad) / 100);
    }

    return a + Number(valor);
  }, 0);

  const totalCuentasPorCobrar = cuentasPorCobrar.reduce((a, b) => {
    return a + Number(b.valor);
  }, 0);

  return {
    totalIngresos,
    totalGastos,
    totalCostos,
    totalCaja,
    totalCuentasPorCobrar,
    ingresos,
    caja,
    gastos,
    cuentasPorCobrar,
    costos,
  };
}

export default useTotalCuentas;
