/* eslint-disable react/prop-types */
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  activosCirculantesMap,
  activosFijosMap,
  cuentasPorCobrarMap,
  inventarioMap,
  pasivosMap,
  patrimonioMap,
  utilidadesMap,
} from "../data/maps";
import useMovValues from "../hooks/useMovValues";
import useTotalCuentas from "../hooks/useTotalCuentas";
import toCLP from "../utils/toCLP";

const typeFile = "xlsx";
const parserMap = (m) => [m.fecha, toCLP(m.valor), m.desc];

function ExportToExcel({ movimientos, desgasteUtilidad, costoVenta }) {
  const {
    totalActivosCirculantes,
    totalPasivos,
    totalActivosFijos,
    totalInventario,
    totalCuentasPorCobrar,
    totalPatrimonio,
    totalUtilidades,
    activosCirculantes,
    activosFijos,
    patrimonio,
    utilidades,
    inventario,
    cuentasPorCobrar,
    pasivos,
  } = useMovValues({ movimientos, desgasteUtilidad, costoVenta });

  const {
    totalIngresos,
    totalGastos,
    totalCostos,
    totalCaja,
    costos,
    gastos,
    ingresos,
  } = useTotalCuentas({ movimientos, desgasteUtilidad });

  function exportToCSV() {
    const activosXLSX = XLSX.utils.json_to_sheet([
      [`Activos circulantes (${toCLP(totalActivosCirculantes)})`],
      ...activosCirculantes.map((m) => {
        const { valor } = activosCirculantesMap(m, desgasteUtilidad);
        return [m.fecha, toCLP(valor), m.desc];
      }),
      [],
      [`Activos fijos (${toCLP(totalActivosFijos)})`],
      ...activosFijos.map((m) => {
        const { valor } = activosFijosMap(m);
        return [m.fecha, toCLP(valor), m.desc];
      }),
      [],
      [`Cuentas por cobrar (${toCLP(totalCuentasPorCobrar)})`],
      ...cuentasPorCobrar.map((m) => {
        const { valor } = cuentasPorCobrarMap(m);

        return [m.fecha, toCLP(valor), m.desc];
      }),
      [],
      [`Inventario (${toCLP(totalInventario)})`],
      ...inventario.map((m) => {
        const { valor } = inventarioMap(m, costoVenta);
        return [m.fecha, toCLP(valor), m.desc];
      }),
      [],
      [
        `Total: ${toCLP(
          totalActivosFijos +
            totalActivosCirculantes +
            totalInventario +
            totalCuentasPorCobrar
        )}`,
      ],
    ]);
    const pasivosXLSX = XLSX.utils.json_to_sheet([
      [`Pasivos (${toCLP(totalPasivos)})`],
      ...pasivos.map((m) => {
        const { valor } = pasivosMap(m);
        return [m.fecha, toCLP(valor), m.desc];
      }),
      [],
      [`Patrimonio (${toCLP(totalPatrimonio)})`],
      ...patrimonio.map((m) => {
        const { valor } = patrimonioMap(m);
        return [m.fecha, toCLP(valor), m.desc];
      }),
      [],
      [`Utilidades/pérdidas (${toCLP(totalUtilidades)})`],
      ...utilidades.map((m) => {
        const { valor } = utilidadesMap(m, costoVenta, desgasteUtilidad);
        return [m.fecha, toCLP(valor), m.desc];
      }),
      [],
      [`Total: ${toCLP(totalPatrimonio + totalUtilidades + totalPasivos)}`],
    ]);

    const estadoXLSX = XLSX.utils.json_to_sheet([
      [`Ingresos`],
      ...ingresos.map(parserMap),
      [],
      [`Gastos`],
      ...gastos.map(parserMap),
      [],
      [`Costos`],
      ...costos.map(parserMap),
      [],
      [`Ingresos: ${toCLP(totalIngresos)}`],
      [`Costos: ${toCLP(totalCostos)}`],
      [`Gastos: ${toCLP(totalGastos)}`],
      [],
      [`Utilidad: ${toCLP(totalIngresos - totalCostos - totalGastos)}`],
      [`Caja: ${toCLP(totalCaja + totalCuentasPorCobrar)}`],
      [
        `Total: ${toCLP(
          totalCaja +
            totalCuentasPorCobrar -
            (totalIngresos - totalCostos - totalGastos)
        )}`,
      ],
    ]);
    const wb = {
      Sheets: {
        "ACT+CxC+INV": activosXLSX,
        "PAS+PAT+UTPERD": pasivosXLSX,
        "Estado de resultados": estadoXLSX,
      },
      SheetNames: ["ACT+CxC+INV", "PAS+PAT+UTPERD", "Estado de resultados"],
    };
    const excelBuffer = XLSX.write(wb, { bookType: typeFile, type: "array" });
    const data = new Blob([excelBuffer], { type: typeFile });
    FileSaver.saveAs(data, `contabilidad.${typeFile}`);
  }

  return <button onClick={exportToCSV}>Exportar a Excel</button>;
}

export default ExportToExcel;
