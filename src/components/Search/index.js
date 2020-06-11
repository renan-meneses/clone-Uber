import React, { Component } from 'react';
import { Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class Search extends Component {
    state = {
        searchFocused: false
    }
    render() {
        const { onLocationSelected } = this.props;
        const { searchFocused } = this.state;
        return (
            <GooglePlacesAutocomplete
                placeholder="Para onde?"
                placeholderTextColor="#333"
                onPress={onLocationSelected}
                query={{
                    key: "AIzaSyBEUR3Mo84MBRKpy4XRPbV-xY6W4S1z4So",
                    language: "pt"
                }}
                textInputProps={{
                    autoCapitalize: "none",
                    autoCorrect: false,
                    onFocus: () => { this.setState({ searchFocused: true }) },
                    onBlur: () => { this.setState({ searchFocused: false }) }
                }}
                listViewDisplayed={searchFocused}
                fetchDetails
                enablePoweredByContainer={false}
                styles={{
                    container: {
                        position: 'absolute',
                        top: Platform.select({ ios: 60, android: 40 }),
                        width: '100%'
                    },
                    textInputContainer: {
                        felx: 1,
                        backgroundColor: 'transparent',
                        height: 54,
                        marginHorizontal: 20,
                        borderTopWidth: 0,
                        borderBottomWifth: 0
                    },
                    textInput: {
                        height: 54,
                        margin: 0,
                        borderRadius: 0,
                        paddingTop: 0,
                        paddingBottom: 0,
                        paddingLeft: 20,
                        paddingRight: 20,
                        padding: 0,
                        marginTop: 0,
                        marginLeft: 0,
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOpacity: 0.1,
                        shadowOffset: { x: 0, y: 1 },
                        shadowRadius: 15,
                        borderWidth: 1,
                        borderColor: '#DDD',
                        fontSize: 18
                    },
                    listView: {
                        borderWidth: 1,
                        borderColor: '#ddd',
                        backgroundColor: '#fff',
                        marginHorizontal: 20,
                        elevation: 5,
                        shadowColor: '#000',
                        shadowOpacity: 0.1,
                        shadowOffset: { x: 0, y: 1 },
                        shadowRadius: 15,
                        marginTop: 10
                    },
                    description: {
                        fontSize: 16
                    },
                    row: {
                        padding: 20,
                        height: 58
                    },
                }}
            />
        );
    }
}