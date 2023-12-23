import Form from 'react-bootstrap/Form';

function SelectField({onChange, options, label, value, name, required = true}) {
  return (
    <>
        <Form.Label>{label}</Form.Label>
        <Form.Select onChange={onChange} required={required} value={value} name={name}>
          <option value="">{`Please select ${label}`}</option>
            {
                options.map((option) => (<option value={option.code}>{option.value}</option>))
            }
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          Please select {label}
        </Form.Control.Feedback>
    </>
  );
}

export default SelectField;