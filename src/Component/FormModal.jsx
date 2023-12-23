import React, { useState, useEffect } from "react";
import { Button, Form, Modal, InputGroup } from 'react-bootstrap';
import SelectField from "./BaseComponents/SelectField";
import { BranchOptions } from "../Constants";

// Used to init and reset form data
const defaultFormData = {
  id: "",
  date: "",
  branch: "",
  type: "",
  amount: "",
  bank: "",
  employeeName: "",
  employeeId: "",
  status: ""
}

const FormModal = ({ show, handleClose, rowData, onRowAddOrUpdate }) => {

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState(defaultFormData);

    // Handle input value on change
    const handleChange = (event) => {
      let { name, value } = event.target;
      console.log("Name: ", name, "value: ", value);
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

    // Handle form submit
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.stopPropagation();
        event.preventDefault();
        setValidated(true);
        return;
      }
      onRowAddOrUpdate(formData, rowData ? true : false);
      handleModalClose();
      event.preventDefault();
    };

    // Handle modal close and reset form data
    const handleModalClose = () => {
      setFormData(defaultFormData);
      setValidated(false);
      handleClose();
    }
  
    // Set Transaction data if need to update
    useEffect(() => {
        if(rowData){
            setFormData(rowData);   
        }
    }, [rowData]);

  return (
    <Modal show={show} onHide={handleModalClose} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="controlInput1">
                  <Form.Label>Transaction ID</Form.Label>
                  <Form.Control
                      type="number"
                      required
                      disabled={rowData ? true : false}
                      min="0"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter transaction id.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="controlInput2">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                      type="date"
                      required
                      placeholder="DD/MM/YYYY"
                      name="date"
                      onChange={handleChange}
                      value={formData.date}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please select date.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="controlInput3">
                  <SelectField
                    onChange={handleChange}
                    options={BranchOptions}
                    value={formData.branch}
                    name="branch"
                    label="Branch"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="controlInput4">
                  <Form.Label>Type</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Check
                      inline
                      type="radio"
                      checked={formData.type === "Full"}
                      required={formData.type === ""}
                      id="Full"
                      label="Full"
                      value="Full"
                      name="type"
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      id="short-type"
                      label="Short"
                      name="type"
                      value="Short"
                      required={formData.type === ""}
                      checked={formData.type === "Short"}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="controlInput5">
                  <Form.Label>Amount</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                        type="number"
                        required
                        min="0"
                        name="amount"
                        onChange={handleChange}
                        value={formData.amount}
                    />
                    <InputGroup.Text>/-</InputGroup.Text>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    Please enter transaction amount.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="controlInput6">
                  <Form.Label>Bank Name</Form.Label>
                  <Form.Control
                      type="input"
                      required
                      placeholder="SBI Bank"
                      name="bank"
                      onChange={handleChange}
                      value={formData.bank}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter brank name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="controlInput7">
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                      type="input"
                      required
                      name="employeeName"
                      onChange={handleChange}
                      value={formData.employeeName}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter employee name.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="controlInput8">
                  <Form.Label>Employee Code</Form.Label>
                  <Form.Control
                      type="input"
                      required
                      placeholder="A1234"
                      name="employeeId"
                      onChange={handleChange}
                      value={formData.employeeId}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter employee code.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="controlInput9">
                  <Form.Label>Status</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Check
                      inline
                      type="radio"
                      id="Pending"
                      label="Pending"
                      name="status"
                      value="Pending"
                      checked={formData.status === "Pending"}
                      required={formData.status === ""}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      id="Approved"
                      label="Approved"
                      name="status"
                      value="Approved"
                      checked={formData.status === "Approved"}
                      required={formData.status === ""}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      type="radio"
                      id="Rejected"
                      label="Rejected"
                      name="status"
                      value="Rejected"
                      checked={formData.status === "Rejected"}
                      required={formData.status === ""}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleModalClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Add Transaction
                  </Button>
                </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
  );
};

export default FormModal;
