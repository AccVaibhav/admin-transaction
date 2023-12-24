import {useEffect, useState, useCallback } from "react";
import Table from "./VTable";
import Header from "./BaseComponents/Header";
import FormModal from "./FormModal";
import FilterTable from "./BaseComponents/FilterTable";
import { defaultTableData } from "../Constants";
import { Container, Row, Col } from "react-bootstrap";

const AdminPage = () => {

const [modal, setModal] = useState(false);
const [rowDataForForm, setRowDataForForm] = useState(false);
const [originalData, setOriginalData] = useState(defaultTableData);
const [filteredData, setFilteredData] = useState(originalData);

  // toggle modal ON or OFF
  const toggleModal = useCallback(() => {
    if(modal){
      setRowDataForForm(false);
    }
    setModal(!modal);
  }, [modal, setRowDataForForm, setModal]);

  // Handle row click: Open modal to edit the row
  const onRowClick = useCallback((item) => {
    setRowDataForForm(item);
    toggleModal();
  }, [setRowDataForForm, toggleModal]);

  // update data when added or updated from transaction form
  const onRowAddOrUpdate = useCallback((data, isUpdate) => {
    if(isUpdate){
      const updatedTransactions = originalData.map((item) => {
        return item.id === data.id ? data : item;
      });
      setOriginalData(() => updatedTransactions);
    }else{
      setOriginalData((previousData) => [...previousData, data]);
    }
  }, [originalData, setOriginalData]);

  // Handle delete transaction item
  const handleDeleteTransaction = useCallback((e, id) => {
    if(id){
      const updatedTransactions = originalData.filter((item) => {
        return item.id !== id;
      });
      setOriginalData(() => updatedTransactions);
    }
    e.stopPropagation()
  }, [originalData, setOriginalData]);

  //Util to get filtered value for key
  const getFilterValue = useCallback((arr, filterKeys, key) => {
    if(filterKeys[key]){
      const filterArray = arr.filter((item) => {
        return filterKeys[key] ? item[key] === filterKeys[key] : true;
      });
      return filterArray;
    }
    return arr;
  }, []);

  // Filter table data
  const handleFilterChange = useCallback((filterKeys) => {
    const filterByBranch = getFilterValue(originalData, filterKeys, 'branch');
    const filterByType = getFilterValue(filterByBranch, filterKeys, 'type');
    const filterByStatus = getFilterValue(filterByType, filterKeys, 'status');
    const filterById = getFilterValue(filterByStatus, filterKeys, 'id');
    let filterByDate = filterById;
    if(filterKeys.fromdate && filterKeys.todate){
      filterByDate = filterById.filter((data) => {
        const currentDate = new Date(data.date).getTime();
        const startDate = new Date(filterKeys.fromdate).getTime();
        const endDate = new Date(filterKeys.todate).getTime();
        return currentDate >= startDate && currentDate <= endDate;
      });
    }
    setFilteredData(() => filterByDate);
  }, [originalData, getFilterValue, setFilteredData]);

  // Format display of date in table
  const formatDateDisplay = useCallback((value) => {
    const dateElements = value.split('-');
    const formatedDate = `${dateElements[2]}/${dateElements[1]}/${dateElements[0]}`;
    return formatedDate;
  }, []);

  // Columns of table: Renders titles and each cell in format
  const columns = [
    {
      title: "ID",
      dataKey: "id",
      key: "id",
    },
    {
      title: " DATE (DD/MM/YYYY)",
      render: (item) => (
        <>{formatDateDisplay(item.date)}</>
      ),
      key: "date",
      sortable: true,
    },
    {
      title: "BRANCH",
      dataKey: "branch",
      key: "branch",
    },
    {
      title: "TYPE",
      dataKey: "type",
      key: "type",
    },
    {
      title: "AMOUNT(IN RUPEES)",
      dataKey: "amount",
      key: "amount",
    },
    {
      title: "BANK",
      dataKey: "bank",
      key: "bank",
    },
    {
      title: "REQUESTED BY(EMPLOYEE CODE)",
      key: "requested",
      render: (item) => (
        <div className="contentCenter">
          <div className="itemsLeft">
              <span>{item.employeeName}</span>
              <span className="text-sm">{item.employeeId}</span>
          </div>
        </div>
      ),
    },
    {
      title: "STATUS",
      dataKey: "status",
      key: "status",
    },

    {
      title: "ACTION",
      render: (item) => (
        <>
          <div
            onClick={(e) => handleDeleteTransaction(e, item.id)}
            style={{ cursor: "pointer" }}
          >
            <span class="material-symbols-outlined">cancel</span>
          </div>
        </>
      ),
      key: "action",
      width: 90,
    },
  ];

  // Reset filtered data if original array is updated
  useEffect(() => {
    setFilteredData(() => originalData);
  }, [originalData]);

  return (
    <>
      <Header />
      <div>
        <div class="row header layout-style margin-bt-20">
          <Container>
            <Row>
              <Col md={2} className="lebelLeft">
                <span className="fw-semibold fs-4">{`Total: ${originalData.length}`}</span>
              </Col>
              <Col md={2} className="lebelLeft">
                <span className="fw-semibold fs-4">{`Filtered Total: ${filteredData.length}`}</span>
              </Col>
              <Col>
                <div className="col-auto flex-end">
                  <button type="button" className="btn btn-outline-secondary" onClick={toggleModal}>
                  Create +
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div>
          <FilterTable handleFilterChange={handleFilterChange} />
        </div>
        <div>
          <FormModal
            show={modal}
            handleClose={toggleModal}
            rowData={rowDataForForm}
            onRowAddOrUpdate={onRowAddOrUpdate}
            allExistingIds = {originalData && originalData.length > 0 ? originalData.map((item) => item.id) : []}
          />
        </div>
       
        <div>
          <Table cols={columns} tableData={filteredData} onRowClick={onRowClick}/>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
