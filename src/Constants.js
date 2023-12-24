export const BranchOptions = [
    { code: 'Thane', value: 'Thane'},
    { code: 'navi mumbai', value: 'navi mumbai'},
    { code: 'mumbai', value: 'mumbai'},
    { code: 'kurla', value: 'kurla'},
    { code: 'vile parle', value: 'vile parle'},
    { code: 'lower parel', value: 'lower parel'},
    { code: 'andheri', value: 'andheri'},
    { code: 'byculla', value: 'byculla'},
  ];

export const TypeOptions = [
    { code: 'Full', value: 'Full'},
    { code: 'Short', value: 'Short'},
];

export const StatusOptions = [
    { code: 'Pending', value: 'Pending'},
    { code: 'Approved', value: 'Approved'},
    { code: 'Rejected', value: 'Rejected'},
];

// Used to init and reset form data
export const defaultFormData = {
  id: "",
  date: "",
  branch: "",
  type: "",
  amount: "",
  bank: "",
  employeeName: "",
  employeeId: "",
  status: ""
};

export const defaultFilterData = {
  fromdate: '',
  todate: '',
  branch: '',
  type: '',
  status: '',
  id: ''
};

  // Data to be rendered in a table
export const defaultTableData = [
    {
      id: "1",
      date: '2023-11-20',
      branch: "mumbai",
      type: "Full",
      amount: "1000",
      bank: "SBI",
      status: "Rejected",
      employeeName: "Employee Name",
      employeeId: "A123",
    },
    {
      id: "2",
      date: '2023-11-15',
      branch: "Thane",
      type: "Short",
      amount: "10001",
      bank: "SBI1",
      status: "Pending",
      employeeName: "Employee Name",
      employeeId: "A124",
    },
    {
      id: "3",
      date: '2023-11-25',
      branch: "Thane",
      type: "Short",
      amount: "10001",
      bank: "SBI1",
      status: "Pending",
      employeeName: "Employee Name",
      employeeId: "A124",
    }
  ];