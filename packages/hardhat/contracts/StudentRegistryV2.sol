// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
import "./Ownable.sol";
import "./Student.sol";

contract StudentRegistryV2 is Ownable {
    //custom erros
    error NameIsEmpty();
    error UnderAge(uint8 age, uint8 expectedAge);
   
    //dynamic array of students
    Student[] private students;
    

    // Mappings for my Student Registery Contract
    mapping(address => Student) public studentsMapping;
    mapping(address => Student) public tempstudentsMapping;
    mapping(address => bool) public hasPaidMapping;



    // Events for my student registry Contract
    event registerStudent( address _studentAddress, string  _StName, uint8 _stAge );
    event authorizeStudentReg (address _studentAddress);
    event addStud(address _studentAddr);


    // Function For Paying
    function payFee() public payable{
        require(msg.value > 0, "No ether sent");
        owner.transfer(msg.value);
        // require(msg.value == 1 ether, "Oga you no go like pay");
        hasPaidMapping[msg.sender] = true;
    }


    // Function for Registration
    function register(
        address _studentAddr,
        string memory _name,
        uint8 _age
    ) public payable {
        require(tempstudentsMapping[_studentAddr].studentAddr == address(0), "You're already registered");
        require(hasPaidMapping[msg.sender], "You must pay first");
        require(bytes(_name).length > 0, "No name has been inputed");
        require(_age >= 18,"name should be 18 or more");

        uint256 _studentId = students.length + 1;
        // A variable is defined to match the array format and datatype
        Student memory tempstudent = Student({
            studentAddr: _studentAddr,
            name: _name,
            age: _age,
            studentId: _studentId,
            hasPaid : true,
            isAuthorized: false
        });
        students.push(tempstudent);

        // add student to Studentmapping
        tempstudentsMapping[_studentAddr] = tempstudent;
        emit registerStudent(_studentAddr, _name, _age);
    }


    // Function for authorizing registered Student
    function authorizeStudentRegistration (address _studentAddr) public onlyOwner {
        require(tempstudentsMapping[_studentAddr].studentAddr != address(0), "Invalid Address");
        require(studentsMapping[_studentAddr].studentAddr == address(0), "You're already registered");
        addStudent(_studentAddr);
        emit authorizeStudentReg (_studentAddr);

    }

    // Function for Adding student, this function is called in the authorizeStudentRegistration() function
    function addStudent(
        address _studentAddr
    ) private {
        uint256 _studentId = students.length + 1;
        // A variable is defined to match the array format and datatype
        Student memory student = Student({
            studentAddr: tempstudentsMapping[_studentAddr].studentAddr,
            name: tempstudentsMapping[_studentAddr].name,
            age: tempstudentsMapping[_studentAddr].age,
            studentId: _studentId,
            hasPaid : true, 
            isAuthorized: false


        });
        students.push(student);

        // add student to Studentmapping
        studentsMapping[_studentAddr] = student;
        emit addStud(_studentAddr);

    } 


    // Function to get student by call the ID
    function getStudent(uint8 _studentId)
        public
        view
        isNotAddressZero
        onlyOwner
        returns (Student memory)
    {
        return students[_studentId - 1];
    }









    //Functions for getting a student by address
    function getStudentFromMapping(address _studentAddr)
        public
        view
        isNotAddressZero
        onlyOwner
        returns (Student memory)
    {
        return studentsMapping[_studentAddr];
    }

    function getStudentTemporaryMapping(address _studentAddr)
        public
        view
        isNotAddressZero
        onlyOwner
        returns (Student memory)
    {
        return tempstudentsMapping[_studentAddr];
    }

    function getStudentHaspaidMapping(address _studentAddr)
        public
        view
        isNotAddressZero
        onlyOwner
        returns (bool)
    {
        return hasPaidMapping[_studentAddr];
    }








    // Function for deleting a student by using the student Address
    function deleteStudent(address _studentAddr)
        public
        onlyOwner
        isNotAddressZero
    {
        require(
            studentsMapping[_studentAddr].studentAddr != address(0),
            "Student does not exist"
        );

        // delete studentsMapping[_studentAddr];

        Student memory student = Student({
            studentAddr: address(0),
            name: "",
            age: 0,
            studentId: 0,
            hasPaid: false,
            isAuthorized: false
        });

        studentsMapping[_studentAddr] = student;
    }


    
    function modifyOwner(address payable  _newOwner) public {
        changeOwner(_newOwner);
    }




    // @notice, function for updating student mapping 
    // @params, address, name, and age are the parameter for this function
    function updateStudentMapping(address _studentAddr, string memory _name, uint8 _age) onlyOwner public  {
        Student storage currentStudent = studentsMapping[_studentAddr];
        currentStudent.name = _name;
        currentStudent.age = _age;
        currentStudent.studentAddr = _studentAddr;
        
     

} 

    
}