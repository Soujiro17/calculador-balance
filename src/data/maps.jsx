import TablaBalanceRow from "../components/TablaBalanceRow";

export function activosCirculantesMap(m) {
  const { valor, movType: mT, desc } = m;

  let valorRow = valor,
    signo = "+";

  if (mT == 0 || mT == 1 || mT == 6 || mT == 4 || mT == 7) {
    signo = "-";
  }

  return {
    valor: signo === "+" ? valorRow : -valorRow,
    component: (
      <TablaBalanceRow signo={signo} valor={valorRow} desc={desc} key={m.id} />
    ),
  };
}

export function patrimonioMap(m) {
  const { valor, desc } = m;

  return {
    valor: valor,
    component: (
      <TablaBalanceRow signo="+" valor={valor} desc={desc} key={m.id} />
    ),
  };
}

export function activosFijosMap(m) {
  const { valor, desc } = m;

  return {
    valor,
    component: (
      <TablaBalanceRow signo={"+"} valor={valor} desc={desc} key={m.id} />
    ),
  };
}

export function inventarioMap(m, costoVenta) {
  const { valor, movType: mT, desc } = m;

  let valorRow = valor,
    signo = "+";

  if (mT == 2) {
    signo = "-";
    valorRow = valor * (costoVenta / 100);
  } else if (mT == 5) {
    signo = "-";
  }

  return {
    valor: signo === "+" ? valorRow : -valorRow,
    component: (
      <TablaBalanceRow signo={signo} valor={valorRow} desc={desc} key={m.id} />
    ),
  };
}

export function cuentasPorCobrarMap(m) {
  const { valor, desc } = m;

  return {
    valor,
    component: (
      <TablaBalanceRow signo={"+"} valor={valor} desc={desc} key={m.id} />
    ),
  };
}

export function utilidadesMap(m, costoVenta) {
  const { valor, movType: mT, desc } = m;

  let valorRow = valor,
    signo = "+";

  if (mT == 1) {
    signo = "-";
  } else if (mT == 2) {
    valorRow = valor * ((100 - costoVenta) / 100);
  } else if (mT == 5 || mT == 4) {
    signo = "-";
  }

  return {
    valor: signo === "+" ? valorRow : -valorRow,
    component: (
      <TablaBalanceRow signo={signo} valor={valorRow} desc={desc} key={m.id} />
    ),
  };
}
