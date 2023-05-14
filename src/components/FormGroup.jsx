/* eslint-disable react/prop-types */
function FormGroup({ label, id, sufix, ...props }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
      &nbsp;{sufix}
    </div>
  );
}

export default FormGroup;
