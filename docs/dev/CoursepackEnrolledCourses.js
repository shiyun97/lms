import React, { Component } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import {
  MDBContainer, MDBTabPane, MDBNavItem, MDBNavLink, MDBTabContent, MDBRow, MDBCol, MDBNav, MDBFormInline, MDBIcon,
  MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBCardBody, MDBCardText, MDBCardImage, MDBCard, 
  MDBCardTitle, MDBCardGroup, MDBJumbotron, MDBProgress
} from "mdbreact";
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import CoursepackTopNav from "./CoursepackTopNav";
import CoursepackCoursesTeacher from "./Teacher/CoursepackCoursesTeacher";

const API = "http://localhost:8080/LMS-war/webresources/";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class CoursepackEnrolledCourses extends Component {
  state = {
    coursepackList: [],
    modalAddRating: false,
    ratingCommentInput: "",
    ratingStarsInput: 5,
    message: "",
    openSnackbar: false,
    addRatingCoursepackId: "",

    modalEditRating: false,
    editRatingCommentInput: "",
    editRatingStarsInput: 5,
    editRatingCoursepackId: "",
    editRatingId: ""
  };

  componentDidMount() {
    this.initPage();
  }

  initPage() {
    axios.get(`${API}Coursepack/getUserCoursepack/${sessionStorage.getItem("userId")}`)
      .then(result => {
        console.log(result)
        this.setState({ coursepackList: result.data.coursepack })
      })
      .catch(error => {
        console.error("error in axios " + error);
      });
  }

  heading = () => {
    return (
      <div>
        <h3>
          <b>My Courses</b>
        </h3>
        <hr />
      </div>
    );
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  handleChange = (event) => {
    this.setState({ searchItem: event.target.value })
  }

  getAllEnrolledCourses = () => {
    return (
      <MDBContainer>
        <MDBFormInline className="md-form">
          <MDBIcon icon="search" />
          <input
            className="form-control form-control-sm ml-3 w-75"
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={this.handleChange}
          />

          <MDBDropdown>
            <MDBDropdownToggle caret color="ins">
              Recently Accessed
          </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem>Recently Enrolled</MDBDropdownItem>
              <MDBDropdownItem>Alphebatical (A-Z)</MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBFormInline>

        {this.displayEnrolledCourses()}

      </MDBContainer>
    );
  };

  displayEnrolledCourses = () => {
    return (

      <MDBCardGroup deck className="mt-3">
        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Others/images/16.jpg"
            alt="MDBCard image cap"
            top
            hover
            overlay="white-slight"
          />
          <MDBCardBody>
            <MDBCardTitle tag="h5">Course Title</MDBCardTitle>
            <MDBCardText>Prof Name</MDBCardText>
            <MDBCardText>Rating</MDBCardText>
            <MDBCardText>Price</MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Others/images/14.jpg"
            alt="MDBCard image cap"
            top
            hover
            overlay="white-slight"
          />

          <MDBCardBody>
            <MDBCardTitle tag="h5">Course Title</MDBCardTitle>
            <MDBCardText>Prof Name</MDBCardText>
            <MDBCardText>Rating</MDBCardText>
            <MDBCardText>Price</MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg"
            alt="MDBCard image cap"
            top
            hover
            overlay="white-slight"
          />

          <MDBCardBody>
            <MDBCardTitle tag="h5">Course Title</MDBCardTitle>
            <MDBCardText>Prof Name</MDBCardText>
            <MDBCardText>Rating</MDBCardText>
            <MDBCardText>Price</MDBCardText>
          </MDBCardBody>
        </MDBCard>

        <MDBCard>
          <MDBCardImage
            src="https://mdbootstrap.com/img/Photos/Others/images/15.jpg"
            alt="MDBCard image cap"
            top
            hover
            overlay="white-slight"
          />

          <MDBCardBody>
            <MDBCardTitle tag="h5">Course Title</MDBCardTitle>
            <MDBCardText>Prof Name</MDBCardText>
            <MDBCardText>Rating</MDBCardText>
            <MDBCardText>Price</MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCardGroup>

    )
  }

  tab = () => {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="12">
            <MDBNav className="nav-tabs">
              <MDBNavItem>
                <MDBNavLink
                  to='#'
                  active={this.state.activeItem === "1"}
                  onClick={this.toggle("1")}
                  role="tab"
                >
                  All Courses
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  active={this.state.activeItem === "2"}
                  onClick={this.toggle("2")}
                  role="tab"
                >
                  In progress
                </MDBNavLink>
              </MDBNavItem>
              <MDBNavItem>
                <MDBNavLink
                  to="#"
                  active={this.state.activeItem === "3"}
                  onClick={this.toggle("3")}
                  role="tab"
                >
                  Completed
                </MDBNavLink>
              </MDBNavItem>
            </MDBNav>
            <MDBTabContent activeItem={this.state.activeItem}>
              <MDBTabPane tabId="1" role="tabpanel">
                {this.getAllEnrolledCourses()}
              </MDBTabPane>
              <MDBTabPane tabId="2" role="tabpanel">
                {/* {this.getWishList()} */}
              </MDBTabPane>
              <MDBTabPane tabId="2" role="tabpanel">
                {/* {this.getWishList()} */}
              </MDBTabPane>
            </MDBTabContent>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };

  // for adding rating
  toggleModal = nr => () => {
    let modalNumber = "modal" + nr;
    if (nr == "UploadMultimedia") {
      this.setState({
        ...this.state,
        uploadedMultimedia: [],
        [modalNumber]: !this.state[modalNumber]
      })
    }
    else {
      this.setState({
        ...this.state,
        [modalNumber]: !this.state[modalNumber]
      });
    }
  };

  addRating = (coursepackId) => {
    this.setState({
      modalAddRating: true,
      addRatingCoursepackId: coursepackId
    })
  }

  inputChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.name + " " + e.target.value)
  }

  setValue = (newValue) => {
    console.log(newValue)
    this.setState({
      ratingStarsInput: newValue
    })
  }

  setEditStarsValue = (newValue) => {
    console.log(newValue)
    this.setState({
      editRatingStarsInput: newValue
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state.ratingCommentInput);
    console.log(this.state.ratingStarsInput);
    console.log(sessionStorage.getItem('userId'));
    let ratingCommentInput = this.state.ratingCommentInput;
    let ratingStarsInput = this.state.ratingStarsInput;
    if (ratingCommentInput && ratingStarsInput) {
      let request = {
        userId: sessionStorage.getItem('userId'),
        coursepackId: this.state.addRatingCoursepackId,
        rating: ratingStarsInput,
        comment: ratingCommentInput
      }
      axios
        .post(`${API}feedback/createRating`, request)
        .then((result) => {
          console.log(result);
          this.setState({
            addRatingCoursepackId: "",
            ratingStarsInput: "",
            ratingCommentInput: "",
            modalAddRating: false,
            message: "Rating added successfully",
            openSnackbar: true
          })
          return this.initPage();
        })
        .catch(error => {
          this.setState({
            message: error.response.data.errorMessage,
            openSnackbar: true
          })
          console.error("error in axios " + error);
        });
    }
  }

  submitEditRatingHandler = (e) => {
    e.preventDefault();
    let editRatingCommentInput = this.state.editRatingCommentInput;
    let editRatingStarsInput = this.state.editRatingStarsInput;
    if (editRatingCommentInput && editRatingStarsInput) {
      let request = {
        userId: sessionStorage.getItem('userId'),
        coursepackId: this.state.editRatingCoursepackId,
        rating: editRatingStarsInput,
        comment: editRatingCommentInput
      }
      axios
        .put(`${API}feedback/editRating?ratingId=${this.state.editRatingId}`, request)
        .then((result) => {
          console.log(result);
          this.setState({
            editRatingId: "",
            editRatingCoursepackId: "",
            editRatingStarsInput: "",
            editRatingCommentInput: "",
            modalEditRating: false,
            message: "Rating edited successfully",
            openSnackbar: true
          })
          return this.initPage();
        })
        .catch(error => {
          this.setState({
            message: error.response.data.errorMessage,
            openSnackbar: true
          })
          console.error("error in axios " + error);
        });
    }
  }
 
  editRating = (coursepack) => {
    console.log(coursepack)
    this.setState({
      editRatingId: coursepack.ratingList[0].ratingId,
      editRatingCoursepackId: coursepack.coursepackId,
      editRatingStarsInput: coursepack.ratingList[0].rating,
      editRatingCommentInput: coursepack.ratingList[0].comment,
      modalEditRating: true
    })
  }

  handleOpenSnackbar = () => {
    this.setState({ openSnackbar: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnackbar: false });
  };

  showEditRatingDialog() {
    return <Dialog
      open={this.state.modalEditRating}
      onClose={this.toggleModal("EditRating")}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth="80px"
      className={this.props.className}
    >
      <DialogTitle id="alert-dialog-title">
        Edit Rating
    </DialogTitle>
      <form className="needs-validation" noValidate onSubmit={this.submitEditRatingHandler}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ maxWidth: "100%" }}>
            <MDBContainer>
              <Rating name="simple-controlled"
                value={this.state.editRatingStarsInput}
                precision={1}
                size="large"
                onChange={(event, newValue) => {
                  this.setEditStarsValue(newValue);
                }} />
              <TextField
                name="editRatingCommentInput"
                label="Share your opinion of this course."
                multiline
                fullWidth
                rows="4"
                margin="normal"
                variant="outlined"
                value={this.state.editRatingCommentInput}
                onChange={this.inputChangeHandler}
              /></MDBContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={this.toggleModal("EditRating")}>
            Cancel
          </Button>
          <Button color="primary" type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  }

  showAddRatingDialog() {
    return <Dialog
      open={this.state.modalAddRating}
      onClose={this.toggleModal("AddRating")}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth="80px"
      className={this.props.className}
    >
      <DialogTitle id="alert-dialog-title">
        Add Rating
    </DialogTitle>
      <form className="needs-validation" noValidate onSubmit={this.submitHandler}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ maxWidth: "100%" }}>
            <MDBContainer>
              <Rating name="simple-controlled"
                value={this.state.ratingStarsInput}
                precision={1}
                size="large"
                onChange={(event, newValue) => {
                  this.setValue(newValue);
                }} />
              <TextField
                name="ratingCommentInput"
                label="Share your opinion of this course."
                multiline
                fullWidth
                rows="4"
                margin="normal"
                variant="outlined"
                value={this.state.ratingCommentInput}
                onChange={this.inputChangeHandler}
              /></MDBContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={this.toggleModal("AddRating")}>
            Cancel
            </Button>
          <Button color="primary" type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  }

  showMyCoursepacks = () => {
    let coursepackList = this.state.coursepackList;
    if (coursepackList.length == 0) {
      return (
        <div className={this.props.className}>
          <MDBRow>
            No coursepacks enrolled yet.
          </MDBRow>
        </div>
      )
    }
    return (
      <div className={this.props.className}>
        <MDBRow>
          {coursepackList && coursepackList.map((course, index) => {
            return (
              <MDBCol size="3" key={course.coursepackId} style={{ paddingBottom: 30 }}>
                <Card style={{ display: "flex" }}>
                  <CardActionArea>
                  <NavLink to={`/coursepack/${course.coursepackId}/`} style={{ marginBottom: 0 }}>
                    <CardMedia
                      style={{ height: 140 }}
                      image={course.imageLocation}
                      title={course.title}
                    />
                      <CardContent>
                        <Typography gutterBottom variant="h5" style={{ color: "#000000" }}>
                          {course.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {course.assignedTeacher.firstName + " " + course.assignedTeacher.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <MDBProgress value={course.progress*100} className="my-2" height="5px" />
                          {(course.progress*100).toFixed(0) + "% complete"}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          <div style={{ width: 200, display: "flex", marginTop: 10 }}>
                            <Rating name="hover-side" value={course.ratingList.length > 0 && course.ratingList[0].rating} precision={0.1} readOnly size="small" />
                          </div>
                        </Typography>
                      </CardContent>
                    </NavLink>
                    {
                      course.ratingList.length > 0 && <div>
                        <Button variant="contained" color="primary" onClick={e => this.editRating(course)}>
                          Edit rating
                        </Button>
                        {this.showEditRatingDialog()}
                      </div>
                    }
                    {
                      course.ratingList.length == 0 && <div>
                        <Button variant="contained" color="primary" onClick={e => this.addRating(course.coursepackId)}>
                          Leave rating
                        </Button>
                        {this.showAddRatingDialog()}
                      </div>
                    }
                  </CardActionArea>
                </Card>
              </MDBCol>
            )
          })}
        </MDBRow>
      </div>
    )
  }

  renderSnackbar = () => {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.openSnackbar}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.message}</span>}
        action={[
          <MDBIcon icon="times" color="white" onClick={this.handleClose} style={{ cursor: "pointer" }} />,
        ]}
      />
    )
  }

  render() {
    if (sessionStorage.getItem("accessRight") === "Teacher") {
      return (
        <MDBContainer style={{ paddingBottom: 240 }}>
          <CoursepackCoursesTeacher />
        </MDBContainer>
      )
    } else {
      let cart = sessionStorage.getItem("cart");
      let cartObjs = []
      if (cart != undefined && cart != null) {
        cartObjs = JSON.parse(cart);
      }
      return (
        <div>
          <CoursepackTopNav cartNum={cartObjs.length} />
          <MDBJumbotron style={{ padding: 0, backgroundColor: "#505763", width: "100%" }}>
            <MDBCol className="text-white">
              <MDBCol className="py-3">
                <MDBCardTitle className="h1-responsive pt-5 m-3 ml-5 px-5">
                  <MDBRow></MDBRow>
                  <MDBRow>My Courses</MDBRow>
                </MDBCardTitle>
              </MDBCol>
            </MDBCol>
          </MDBJumbotron>
          <MDBContainer style={{ paddingBottom: 240 }}>
            <br />
            {this.showMyCoursepacks()}
            {this.renderSnackbar()}
          </MDBContainer>
        </div>
      )
    };
  }
}

export default CoursepackEnrolledCourses;
