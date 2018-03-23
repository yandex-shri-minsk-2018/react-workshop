import * as React from 'react';
import {connect} from 'react-redux';

import {Cards} from './Cards';
import {fetchNext} from '../actions/fetchNext';

const stateToProps = (state) => ({
    tag: state.tags.current,
    cards: state.feed.cards,
    error: state.feed.error
});

export const Feed = connect(stateToProps) (
    class Feed extends React.Component {

        state = {
            loading: true
        };

        constructor(props) {
            super(props);

            this.fetch = this.fetch.bind(this);
        }

        componentDidMount() {
            this.fetch()
                .then(() => {
                    this.setState({loading: false});
                })
                .catch((error) => {
                    this.setState({
                        loading: false,
                        error
                    });
                });
        }

        componentWillReceiveProps(props) {
            if (props.tag !== this.props.tag) {
                this.props.dispatch({
                    type: 'FEED_RESET'
                });
            }
        }

        fetch() {
            return this.props.dispatch(fetchNext({
                tag: this.props.tag
            }));
        }

        render() {
            let {error, cards} = this.props,
                loading = this.state.loading;

            if (loading) {
                return (
                    <div className="screen">
                        <div className="spinner"/>
                    </div>
                );
            }

            if (error) {
                return (
                    <div className="screen">
                        <h1>ERROR: {error.message}</h1>
                    </div>
                );
            }

            return (
                <Cards
                    cards={cards}
                    fetchNext={this.fetch}
                />
            );
        }

    }
);
