import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class WriteExam extends Component {
  state = {
    option: "",
    questions: null
  }

  componentWillMount() {
    const { match: { params: { subjectId }}} = this.props;
    // get questions for current subject
    this.getCurrentSubjectQuestions(subjectId);
  
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { subjectId }}} = nextProps;
    this.getCurrentSubjectQuestions(subjectId);
  }

  getLastSubject = () => {
    const { match: { params: { subjectId }}} = this.props;
    return subjectId;
  }

  getCurrentSubjectQuestions = (subjectId) => {
    const { questions } = this.props; // questions from props
    // get questions for current subject
    const all = questions[subjectId];
    // update component state
    this.setState({ questions: all });
  }

  render() {
    const { questions } = this.state;
    const length = (75 / questions.length);

    if(questions.length <= 0) {
      return (
        <h5>
          Sorry :) no question found for current subject
        </h5>
      )
    }
    return (
      <div className="col-md-12">
        <form>
          {this.state.questions.map((data, i) => {
           return <Question key={i} mark={length} question={data} index={i}/>
          })}
          <br />
          <button className="btn btn-success">Next >></button>
        </form>
      </div>
    );
  }

}

const mapStateToProps = state => ({ 
  questions: state.questions.all
});

export default connect(mapStateToProps)(WriteExam);
