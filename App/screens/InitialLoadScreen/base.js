import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native-elements';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { finishedFirstLoad } from '../../../actions';
import { connect as connectNavigation, setTabsRoot } from '../../../navigation';
import { registerBackgroundUpdates } from '../../../navigation/background';
import { get as getStore } from '../../../store';
import { initialLoad, startWebsockets } from '../../../thunks/boot';
import { navigationProp } from '../../../types/props';
import BigCenter from '../../components/BigCenter';
import VerticalPadding from '../../components/VerticalPadding';
import RotatingView from '../../components/RotatingView';

class BaseInitialLoadScreen extends React.Component {
  static propTypes = {
    navigation: navigationProp.isRequired,
    firstLoad: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { firstLoad } = this.props;

    requestAnimationFrame(async () => {
      if (firstLoad) {
        await this.props.dispatch(initialLoad(1));
        this.props.dispatch(finishedFirstLoad());
      }
      this.props.dispatch(startWebsockets());

      // Set initial navigation.
      setTabsRoot();

      // background updates have to be registered after tabs have been set.
      registerBackgroundUpdates(getStore());
    });
  }

  render() {
    return (
      <BigCenter>
        <RotatingView>
          <Entypo name="chevron-with-circle-down" size={100} />
        </RotatingView>
        <VerticalPadding size={25} />
        <Text>
          Loading assets, orders, and every thing else... This may take a couple
          of minutes.
        </Text>
        <VerticalPadding size={25} />
        <VerticalPadding size={25} />
      </BigCenter>
    );
  }
}

export default connect(
  ({ settings: { firstLoad } }) => ({ firstLoad }),
  dispatch => ({ dispatch })
)(connectNavigation(BaseInitialLoadScreen));
