import { action, computed, observable } from "mobx"

class DataStore {
  @observable signInStatus = false
  @observable path = "/dashboard"

  // student details
  @observable email = ""
  @observable password = ""
  @observable accessRight = ""
  @observable gender = ""
  @observable firstName = ""
  @observable lastName = ""
  @observable username = ""
  @observable userId = ""

  // year and sem details
  @observable semester = 0
  @observable year = ""

  // module details
  @observable modules = []
  @observable currentModuleId = 0;

  @observable test = 0

  //questionsList
  @observable elements = [
    //   {
    //   type: "radiogroup",
    //   name: 1,
    //   number: 1,
    //   title: "",
    //   isRequired: true,
    //   level: 1, //only for adaptive,
    //   explanation : "",
    //   correctAnswer : "",
    //   points: 0,
    //   choices: [
    //     {
    //       text: ""
    //     }
    //   ],
    // }
  ]

  @action setTest(test) {
    this.test = 1
  }

  @computed get getTest() {
    return this.test;
  }

  @action setSignInStatus(status, email, password, accessRight) {
    this.signInStatus = status;
    this.email = email;
    this.password = password;
    this.accessRight = accessRight;
    localStorage.setItem("email", this.email)
    localStorage.setItem("password", this.password)
    localStorage.setItem("accessRight", this.accessRight)
    if (this.accessRight === "Public")
      this.path = "/coursepack/dashboard"
    else
      this.path = "/dashboard"
  }

  @action setSignOutStatus() {
    this.signInStatus = false;
    if (this.accessRight === "Public")
      this.path = "/coursepack/dashboard"
    else
      this.path = "/dashboard"
    this.email = "";
    this.password = "";
    this.accessRight = "";
    this.modules = [];
    this.userId = "";
    this.username = "";
    this.gender = "";
    this.firstName = "";
    this.lastName = "";
    localStorage.clear();
  }

  @action setPath(path) {
    this.path = path;
  }

  @computed get getPath() {
    return this.path;
  }

  @computed get getPassword() {
    return this.password;
  }

  @action setCurrModId(id) {
    this.currentModuleId = id;
  }

  @computed get getCurrModId() {
    return this.currentModuleId;
  }

  @action setUserDetails(id, gender, firstName, lastName, username) {
    this.userId = id;
    this.gender = gender;
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    localStorage.setItem("userId", this.userId)
    localStorage.setItem("gender", this.gender)
    localStorage.setItem("firstName", this.firstName)
    localStorage.setItem("lastName", this.lastName)
    localStorage.setItem("username", this.username)
  }

  @computed get getSignInStatus() {
    return this.signInStatus;
  }

  @computed get getAccessRight() {
    return this.accessRight;
  }

  @computed get getUserId() {
    return this.userId;
  }

  @computed get getUsername() {
    return this.username;
  }

  @computed get getFirstName() {
    return this.firstName;
  }

  @computed get getLastName() {
    return this.lastName;
  }

  @computed get getEmail() {
    return this.email;
  }

  @computed get getGender() {
    return this.gender;
  }

  @action updateModules(modules) {
    this.modules = modules;
  }

  @computed get getModules() {
    return this.modules;
  }

  @action updateYearSem(year, sem) {
    this.year = year;
    this.semester = sem;
  }

  @computed get getYear() {
    return this.year;
  }

  @computed get getSem() {
    return this.semester;
  }

  @computed get getQuestions() {
    return this.elements;
  }

  @action addAnswerToQuestion(number, answer) {
    this.elements[number-1].choices.push(answer)
    // console.log(this.elements[number-1].level)
  }
}

export default DataStore;