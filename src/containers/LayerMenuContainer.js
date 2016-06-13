import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LayerControlContainer from './LayerControlContainer';
import * as layerActions from '../actions/LayerActions';
import Button from 'react-toolbox/lib/button';
import MiscUtil from '../utils/MiscUtil';

export class LayerMenuContainer extends Component {
    render() {
        let totalNum = this.props.layers.get("data").size;
        let activeNum = this.props.layers.get("data").reduce((acc, el) => {
            if (el.get("isActive")) {
                return acc + 1;
            }
            return acc;
        }, 0);

        // css classes
        let layerMenuClasses = MiscUtil.generateStringFromSet({
            "open": this.props.layerMenuOpen
        });

        return (
            <div id="layerMenu" className={layerMenuClasses}>
                <div id="layer-header-row" className="row middle-xs">
                    <div className="col-xs-8 text-left">
                        <span className="menu-header">Layer Controls</span>
                        <span className="note">({activeNum} of {totalNum} active)</span>
                    </div>
                    <div className="col-xs-4 text-right">
                        <Button flat className="small" label={this.props.layerMenuOpen ? "close" : "open"} onClick={this.props.toggleLayerMenu} />
                    </div>
                </div>
                <div id="layer-subheader-row" className="row middle-xs">
                    <span className="col-xs-8 text-left menu-subheader">drag title to rearrange display order</span>
                    <span className="col-xs-4 text-right menu-subheader">value at cursor</span>
                </div>
                <hr className="divider medium wide no-margin" />
                <div id="layerMenuContent">
                    {this.props.layers.get("data").map((layer) =>
                        <LayerControlContainer
                            key={layer.get("id") + "_layer_listing"}
                            layer={layer}
                        />
                    )}
                </div>
            </div>
        );
    }
}

LayerMenuContainer.propTypes = {
    toggleLayerMenu: PropTypes.func.isRequired,
    layerMenuOpen: PropTypes.bool.isRequired,
    layers: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        layerMenuOpen: state.view.get("layerMenuOpen"),
        layers: state.map.get("layers")
    };
}

function mapDispatchToProps(dispatch) {
    return {
        toggleLayerMenu: bindActionCreators(layerActions.toggleLayerMenu, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LayerMenuContainer);