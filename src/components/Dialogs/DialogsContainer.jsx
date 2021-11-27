import {addMessage} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import React, {Component} from 'react';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class DialogsContainer extends Component {
    render() {
        return (
            <Dialogs addMessage={this.props.addMessage}
                     dialogsPage={this.props.dialogsPage}/>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

export default compose(
    connect(mapStateToProps, {addMessage}),
    withAuthRedirect
)(DialogsContainer)
