function toCLP(num) {
  return Number(num).toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
  });
}

export default toCLP;
