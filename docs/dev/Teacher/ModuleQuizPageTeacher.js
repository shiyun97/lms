import React, { Component } from "react";
import styled from 'styled-components';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBCardBody, MDBCard, MDBDataTable } from "mdbreact";
import ModuleSideNavigation from "../ModuleSideNavigation";
import { Snackbar } from '@material-ui/core';

class ModuleQuizPageTeacher extends Component {

    state = {
        modal1: false,
        modal2: false,
        moduleId: 0,
        quizId: 0,
        name: "",
        openingDate: "",
        closingDate: "",
        quizStatus: "",
        columns: [
            {
                "label": "Quiz Id",
                "field": "quizId",
                "width": 50,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Name",
                "field": "name",
                "width": 150,
                "attributes": {
                    "aria-controls": "DataTable",
                    "aria-label": "Name"
                }
            },
            {
                "label": "Opening Date",
                "field": "openingDate",
                "width": 200
            },
            {
                "label": "Closing Date",
                "field": "closingDate",
                "width": 100
            },
            {
                "label": "Status",
                "field": "quizStatus",
                "width": 100
            },
            {
                "label": "Max Marks",
                "field": "maxMarks",
                "width": 100
            },
            {
                "label": "",
                "field": "",
                "width": 100
            },
            {
                "label": "Review Students Answers",
                "field": "view",
                "width": 100
            }
        ],
        rows: [{ label: "Retrieving data..." }],
        openSnackbar: false,
        message: ""
    }

    componentDidMount() {
        this.initPage();
    }

    handleChange = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    }

    toggle = (nr, row) => {
        let modalNumber = "modal" + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });

        if (row !== undefined) {
            // this.updateQuizState(row);
        }
    };

    initPage() {
        let moduleId = this.props.moduleId;
        if (moduleId) {
            // console.log(moduleId);
            // retrieve module & set state
            this.setState({ moduleId: moduleId })
        }
    }

    render() {
        var quiz = this.props.quizzes;
        console.log(quiz)
        if (this.props.quizzes.length !== 0) {
            var tempQuizzes = []
            for (let i = 0; i < this.props.quizzes.length; i++) {
                tempQuizzes.push({
                    quizId: quiz[i].quizId,
                    name: quiz[i].title,
                    openingDate: quiz[i].openingDate,
                    closingDate: quiz[i].closingDate,
                    status: quiz[i].publish ? "Open" : "Closed",
                    // description: quiz[i].description,
                    // order: quiz[i].questionsOrder,
                    // publishAnswer: quiz[i].publishAnswer,
                    // numOfAttempts: quiz[i].noOfAttempts,
                    // maxTimeToFinish: quiz[i].maxTimeToFinish,
                    // quizType: quiz[i].quizType,
                    maxMarks: quiz[i].maxMarks,
                    editButton: <MDBRow align="center">
                        <MDBCol md={6}><MDBIcon onClick={() => this.toggle(2, quiz[i])} style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="edit" /></MDBCol>
                        <MDBCol md={6}><MDBIcon onClick={() => this.deleteQuiz(quiz[i].quizId)} style={{ cursor: "pointer", textShadow: "1px 0px 1px #000000" }} icon="trash" /></MDBCol>
                    </MDBRow>,
                    viewButton: <center><MDBBtn color="primary" outline size="sm" href={`/modules/${this.state.moduleId}/quiz/${quiz[i].quizId}/review`}>Review</MDBBtn></center>
                })
            }
        } else {
            var tempQuizzes = [{ label: "No quizzes found." }];
        }

        const data = () => ({ columns: this.state.columns, rows: tempQuizzes })
        // clickEvent: () => goToProfilePage(1)

        const widerData = {
            columns: [...data().columns.map(col => {
                col.width = 150;
                return col;
            })], rows: [...data().rows.map(row => {
                // row.clickEvent = () => goToProfilePage(1)
                return row;
            })]
        }

        return (
            <div className={this.props.className}>
                <ModuleSideNavigation moduleId={this.props.moduleId}></ModuleSideNavigation>
                <div className="module-content">
                    <MDBContainer className="mt-3">
                        <MDBRow style={{ paddingTop: 60 }}>
                            <MDBCol md="8">
                                <h2 className="font-weight-bold">
                                    Quiz
                </h2>
                            </MDBCol>
                            <MDBCol md="4" align="right">
                                <MDBBtn href="/modules/:moduleId/quiz/create" color="primary">Create Quiz</MDBBtn>
                            </MDBCol>
                        </MDBRow>
                        {/* {this.renderEditQuizModalBox()} */}
                        <MDBRow className="py-3">
                            <MDBCol md="12">
                                <MDBCard>
                                    <MDBCardBody>
                                        <MDBDataTable striped bordered hover scrollX scrollY maxHeight="400px" data={widerData} pagesAmount={4} />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
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
                    </MDBContainer>
                </div>
            </div>
        )
    }
}

export default styled(ModuleQuizPageTeacher)`
.module-content{
    margin-left: 270px;
    margin-top: 40px;
}
`;
