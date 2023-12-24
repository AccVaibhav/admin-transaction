import {useState, useEffect, useCallback } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import SelectField from './SelectField';
import { BranchOptions, TypeOptions, StatusOptions, defaultFilterData } from '../../Constants';

function FilterTable({ handleFilterChange }) {
  const [validateDate, setValidateDate] = useState(false);
  const [filterData, setFilterData] = useState(defaultFilterData);

  // Send filter values to Layout component
  useEffect(() => {
    if(validateDate){
        return;
    }
    handleFilterChange(filterData);
  }, [filterData]);

  // Handle filter on change and date validation
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    
    setFilterData((prevState) => ({
        ...prevState,
        [name]: value,
      }));

    if(name === 'fromdate'){
        if(filterData.todate){
            const endDate = new Date(filterData.todate).getTime();
            const startDate = new Date(value).getTime();
            if(startDate > endDate){
                setValidateDate(true);
                return;
            }
        }
    }
    
    if(name === 'todate'){
        if(filterData.fromdate){
            const startDate = new Date(filterData.fromdate).getTime();
            const endDate = new Date(value).getTime();
            if(startDate > endDate){
                setValidateDate(true);
                return;
            }
        }
    }
    setValidateDate(false);
  }, [setFilterData, filterData, setValidateDate]);

  return (
    <div id="filterContainer">
      <Row>
        <Col className="contentCenter mb-3">Filter by : </Col>
        <Col>
            <Form.Group className="contentCenter mb-3">
                <div className="lebelLeft">
                    <Form.Label>From</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="DD/MM/YYYY"
                        name="fromdate"
                        value={filterData.fromdate}
                        onChange={handleChange}
                    />
                </div>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="contentCenter mb-3">
                <div className="lebelLeft">
                    <Form.Label>To</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="DD/MM/YYYY"
                        name="todate"
                        value={filterData.todata}
                        onChange={handleChange}
                        className={validateDate ? 'is-invalid' : ''}
                    />
                    {
                        validateDate && <div class="error-message">"From" date should be less than "To" date</div>
                    }
                </div>
                
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="contentCenter mb-3">
                <div className="lebelLeft">
                    <SelectField
                        onChange={handleChange}
                        options={BranchOptions}
                        name="branch"
                        value={filterData.branch}
                        label="Branch"
                    />
                </div>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="contentCenter mb-3">
                <div className="lebelLeft">
                    <SelectField
                        onChange={handleChange}
                        options={TypeOptions}
                        value={filterData.type}
                        name="type"
                        label="Type"
                    />
                </div>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="contentCenter mb-3">
                <div className="lebelLeft">
                    <SelectField
                        onChange={handleChange}
                        options={StatusOptions}
                        value={filterData.status}
                        name="status"
                        label="Status"
                    />
                </div>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="contentCenter mb-3">
                <div className="lebelLeft">
                    <Form.Label>Transaction ID</Form.Label>
                    <Form.Control
                        type="input"
                        placeholder="A1234"
                        value={filterData.id}
                        name="id"
                        onChange={handleChange}
                    />
                </div>
            </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default FilterTable;