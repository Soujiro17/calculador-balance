export function activosFilters(m) {
  const { movType: mT } = m;
  return mT != 5;
}

export function patrimonioFilters(m) {
  const { movType: mT } = m;
  return mT == 3;
}

export function utilidadesPerdidasFilter(m) {
  const { movType: mT } = m;

  return mT == 1 || mT == 2 || mT == 4 || mT == 5 || mT == 8;
}

export function activosFijosFilter(m) {
  const { movType: mT } = m;

  return mT == 0 || mT == 8;
}

export function pasivosFilter(m) {
  const { movType: mT } = m;

  return mT == 9;
}

export function inventarioFilter(m) {
  const { movType: mT } = m;

  return mT == 6 || mT == 5 || mT == 2;
}

export function cuentasPorCobrarFilter(m) {
  const { movType: mT } = m;

  return mT == 7;
}
