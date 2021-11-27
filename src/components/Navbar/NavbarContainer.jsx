import {connect} from "react-redux";
import Navbar from "./Navbar";


const mapStateToProps = (state) => {
    return {
        sidebar: state.sidebar
    }
}

const NavbarContainer = connect(mapStateToProps, null)(Navbar)

export default NavbarContainer;