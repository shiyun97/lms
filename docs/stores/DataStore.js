import { action, computed, observable } from "mobx"

class DataStore {
  @observable signInStatus = false
  @observable email = ""
  @observable password = ""
  @observable userType = ""
  @observable path = "/"

  @action setSignInStatus(status, email, password, userType) {
    this.signInStatus = status;
    this.email = email;
    this.password = password;
    this.userType = userType;
  }

  @action setSignOutStatus() {
    this.signInStatus = false;
    this.email = "";
    this.password = "";
    this.userType = "";
    this.path = "/"
  }

  @action setPath(path) {
    this.path = path;
  }

  @computed get getSignInStatus() {
    return this.signInStatus;
  }

  @computed get getUserType() {
    return this.userType;
  }

  @computed get getPath() {
    return this.path;
  }
}

export default DataStore;