// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract StudentRegistryV2 {
    // Custom errors
    error NameIsEmpty();
    error UnderAge(uint8 age, uint8 expectedAge);
    error InsufficientFee(uint256 sent, uint256 required);
   
    // Student struct
    struct Student {
        address studentAddr;
        string name;
        uint256 studentId;
        uint8 age;
        bool hasPaid;
        bool isAuthorized;
    }
   
    // Dynamic array of students
    Student[] private students;
    
    // Mappings for Student Registry Contract
    mapping(address => Student) public studentsMapping;
    mapping(address => Student) public tempstudentsMapping;
    mapping(address => bool) public hasPaidMapping;

    // Events for Student Registry Contract
    event RegisterStudent(address _studentAddress, string _StName, uint8 _stAge);
    event AuthorizeStudentReg(address _studentAddress);
    event AddStud(address _studentAddr);
    event UpdateStudent(address _studentAddress, string _StName, uint8 _stAge);
    event FeePaid(address _studentAddress, uint256 _amount);

    // State variable for contract owner
    address private owner;

    // Fee amount
    uint256 public constant FEE_AMOUNT = 0.0001 ether;

    // Constructor to set the contract owner
    constructor() {
        owner = msg.sender;
    }

    // Modifier to restrict access to owner only
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // Modifier to check if address is not zero
    modifier isNotAddressZero() {
        require(msg.sender != address(0), "Invalid address");
        _;
    }

    // Function for paying fee
    function payFee() public payable {
        if (msg.value != FEE_AMOUNT) {
            revert InsufficientFee(msg.value, FEE_AMOUNT);
        }
        hasPaidMapping[msg.sender] = true;
        emit FeePaid(msg.sender, msg.value);
    }

    // Function to receive ETH
    receive() external payable {}

    // Function for student registration
    function register(
        address _studentAddr,
        string memory _name,
        uint8 _age
    ) public {
        require(tempstudentsMapping[_studentAddr].studentAddr == address(0), "You're already registered");
        require(hasPaidMapping[msg.sender], "You must pay first");
        if (bytes(_name).length == 0) revert NameIsEmpty();
        if (_age < 18) revert UnderAge(_age, 18);

        uint256 _studentId = students.length + 1;
        Student memory tempStudent = Student({
            studentAddr: _studentAddr,
            name: _name,
            age: _age,
            studentId: _studentId,
            hasPaid: true,
            isAuthorized: false
        });
        students.push(tempStudent);

        tempstudentsMapping[_studentAddr] = tempStudent;
        emit RegisterStudent(_studentAddr, _name, _age);
    }

    // Function for authorizing registered student
    function authorizeStudentRegistration(address _studentAddr) public onlyOwner {
        require(tempstudentsMapping[_studentAddr].studentAddr != address(0), "Invalid Address");
        require(studentsMapping[_studentAddr].studentAddr == address(0), "You're already registered");
        addStudent(_studentAddr);
        emit AuthorizeStudentReg(_studentAddr);
    }

    // Private function for adding student
    function addStudent(address _studentAddr) private {
        uint256 _studentId = students.length + 1;
        Student memory student = Student({
            studentAddr: tempstudentsMapping[_studentAddr].studentAddr,
            name: tempstudentsMapping[_studentAddr].name,
            age: tempstudentsMapping[_studentAddr].age,
            studentId: _studentId,
            hasPaid: true,
            isAuthorized: true
        });
        students.push(student);

        studentsMapping[_studentAddr] = student;
        emit AddStud(_studentAddr);
    }

    // Function to get student by ID
    function getStudent(uint8 _studentId)
        public
        view
        isNotAddressZero
        onlyOwner
        returns (Student memory)
    {
        require(_studentId > 0 && _studentId <= students.length, "Invalid student ID");
        return students[_studentId - 1];
    }

    // Function to get student from mapping
    function getStudentFromMapping(address _studentAddr)
        public
        view
        isNotAddressZero
        returns (Student memory)
    {
        return studentsMapping[_studentAddr];
    }

    // Function to get student from temporary mapping
    function getStudentTemporaryMapping(address _studentAddr)
        public
        view
        isNotAddressZero
        onlyOwner
        returns (Student memory)
    {
        return tempstudentsMapping[_studentAddr];
    }

    // Function to check if student has paid
    function getStudentHasPaidMapping(address _studentAddr)
        public
        view
        isNotAddressZero
        returns (bool)
    {
        return hasPaidMapping[_studentAddr];
    }

    // Function for deleting a student
    function deleteStudent(address _studentAddr)
        public
        onlyOwner
        isNotAddressZero
    {
        require(
            studentsMapping[_studentAddr].studentAddr != address(0),
            "Student does not exist"
        );

        delete studentsMapping[_studentAddr];
    }

    // Function to change contract owner
    function changeOwner(address payable _newOwner) public onlyOwner {
        require(_newOwner != address(0), "Invalid new owner address");
        owner = _newOwner;
    }

    // Function for updating student mapping
    function updateStudentMapping(address _studentAddr, string memory _name, uint8 _age) 
        public 
        onlyOwner 
    {
        require(studentsMapping[_studentAddr].studentAddr != address(0), "Student does not exist");
        if (bytes(_name).length == 0) revert NameIsEmpty();
        if (_age < 18) revert UnderAge(_age, 18);

        Student storage currentStudent = studentsMapping[_studentAddr];
        currentStudent.name = _name;
        currentStudent.age = _age;
        emit UpdateStudent(_studentAddr, _name, _age);
    }

    // Function to withdraw collected fees
    function withdrawFees() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        (bool success, ) = owner.call{value: balance}("");
        require(success, "Failed to withdraw fees");
    }
}