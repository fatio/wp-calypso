/**
 * External dependencies
 */
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import InfoPopover from 'components/info-popover';

export default class InfoLink extends Component {
	render() {
		return (
			<div className="info-link">
				<InfoPopover>
					{ this.props.children }
				</InfoPopover>
			</div>
		);
	}
}
