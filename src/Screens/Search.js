import Axios from "axios";
import filter from "lodash.filter";
import React, { Component } from "react";
import { FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import JoueurDetails from "../component/JoueurDetails";
class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            temp: [],
            error: null,
            search: null
        };
    }
    componentDidMount() {
        this.players();
    }
    players = () => {
        try {
            Axios.get('https://api.monpetitgazon.com/stats/championship/1/2018')
                .then(res => {
                    this.setResult(res.data);
                }).then(() => {
                    this.setState({ loading: true })
                })
        } catch (err) {
            console.log(err);
        }
    };
    setResult = (res) => {
        this.setState({
            data: [...this.state.data, ...res],
            temp: [...this.state.temp, ...res],
            error: res.error || null,
            loading: false
        });
    }
    contains = ({ firstname, lastname, ultraPosition }, query) => {
        if (firstname) {
            if (lastname && ultraPosition) {
                ultraPosition = String(ultraPosition)
                firstname = firstname.toLowerCase();
                lastname = lastname.toLowerCase();
                query = query.toLowerCase();
                if (
                    firstname.includes(query) ||
                    lastname.includes(query) ||
                    ultraPosition.includes(query)
                ) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            if (lastname && ultraPosition) {
                ultraPosition = String(ultraPosition)
                lastname = lastname.toLowerCase();
                query = query.toLowerCase();
                if (lastname.includes(query) || ultraPosition.includes(query)
                ) {
                    return true
                } else {
                    return false
                }
            }
        }
    }
    handleSearch = text => {
        const formattedQuery = text.toLowerCase()
        const data = filter(this.state.temp, joueur => {
            return this.contains(joueur, formattedQuery)
        })
        this.setState({ data, query: text })
    }
    renderHeader = () => {
        return <SearchBar placeholder="Search Here..."
            lightTheme round editable={true}
            value={this.state.search}
            onChangeText={this.handleSearch}
        />;
    };
    render() {
        return (
            <FlatList
                ListHeaderComponent={this.renderHeader}
                data={this.state.data}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Result', { item: item.id })}>
                        <JoueurDetails joueur={item} />
                    </TouchableOpacity>
                )}
            />
        );
    }
}
export default SearchScreen;