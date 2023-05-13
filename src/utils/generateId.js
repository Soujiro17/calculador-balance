function uniqueId() {
  return parseInt(Date.now() * Math.random());
}

export default uniqueId;
