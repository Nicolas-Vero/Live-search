import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ResultScreen from './src/Screens/ResultScreen';
import SearchScreen from './src/Screens/Search';

const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    Result: ResultScreen
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      title: 'MPG',
    },
  }
);
export default createAppContainer(navigator);
