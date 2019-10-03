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

  @action setSignInStatus(status, email, password, accessRight) {
    this.signInStatus = status;
    this.email = email;
    this.password = password;
    this.accessRight = accessRight;
    localStorage.setItem("email", this.email)
    localStorage.setItem("password", this.password)
    localStorage.setItem("accessRight", this.accessRight)
  }

  @action setSignOutStatus() {
    this.signInStatus = false;
    this.email = "";
    this.password = "";
    this.accessRight = "";
    this.path = "/dashboard"
    localStorage.clear();
  }

  @action setPath(path) {
    this.path = path;
  }

  @computed get getPath() {
    return this.path;
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
}

export default DataStore;