'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, PanResponder, View } from 'react-native';

import SwipeableListItem from './SwipeableListItem';


export default class SwipeableFlatList extends Component {
	static propTypes = {
		data: PropTypes.arrayOf(PropTypes.object).isRequired,
		renderItem: PropTypes.func.isRequired,
		renderLeft: PropTypes.func,
		renderRight: PropTypes.func,
		itemBackgroundColor: PropTypes.string,
	};

	static defaultProps = {
		backgroundColor: '#fff',
	};

	constructor(props) {
		super(props);
		this._itemRef = React.createRef();
    }
    
    //https://github.com/gitboss2000/react-native-swipeable-flat-list/issues/8#issuecomment-399783964
    closeChild = () => {
        this._itemRef && this._itemRef.close();
    }

	_handleOpenChild = (ref) => {
		this._itemRef?.current?.close?.();
        this._itemRef = ref;
	}

	_handleCloseChild = () => {
		this._itemRef = undefined;
	}

	_handleScroll = (event) => {
		const { onScroll } = this.props;
		this._itemRef?.close?.();
		onScroll?.(event);
	}

	render = () => {
		const {
			data,
			itemBackgroundColor,
			onScroll,
			renderItem,
			renderLeft,
			renderRight,
			...otherProps
		} = this.props;
		return (
			<FlatList
				{...otherProps}
				data={data}
				renderItem={({ item }) =>
					<SwipeableListItem
						item={renderItem({ item })}
						left={renderLeft && renderLeft({ item })}
						right={renderRight && renderRight({ item })}
						backgroundColor={itemBackgroundColor}
						onOpen={this._handleOpenChild}
						onClose={this._handleCloseChild}
					/>
				}
				onScroll={this._handleScroll}
			/>
		);
	}
}
