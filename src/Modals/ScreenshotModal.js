import React, {Component} from 'react';
import {customStyles} from "../styles/ModalStyle";
import PropTypes from 'prop-types';
import Modal from "react-modal";

export class ScreenshotModal extends Component {
    static propTypes = {
        handler: PropTypes.func.isRequired,
        canvas: PropTypes.string.isRequired,
        canvasMobile: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
        }
    }

    render() {
        return (
            <div onClick={this.props.handler}>
                <Modal
                    isOpen={this.state.isOpen}
                    onRequestClose={this.props.handler}
                    style={customStyles}
                >
                    <img
                        className="screenshot"
                        src={this.props.canvas ? this.props.canvas : this.props.canvasMobile}
                        alt="Screenshot"/>
                </Modal>
            </div>
        )
    }
}