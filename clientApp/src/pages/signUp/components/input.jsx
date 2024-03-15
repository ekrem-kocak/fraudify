export function Input(props) {
  // eslint-disable-next-line react/prop-types
  const { id, label, type, error, onChange } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className={error ? "form-control is-invalid" : "form-control"}
        id="username"
        onChange={onChange}
      />
      <div className="invalid-feedback">{error}</div>
    </div>
  );
}
