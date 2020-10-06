import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from 'react-native';

const JoueurDetails = ({ joueur }) => {
    return (
        <View style={styles.main_container}>
            <Image
                style={styles.image}
                source={require('../res/avatar.png')}
            />
            <View style={styles.content_container}>
                <View style={styles.headercontainer}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>Prénom : {joueur.firstname}</Text>
                        <Text style={styles.title_text}>Club : {joueur.club}</Text>
                    </View>

                    <View style={styles.header_container2}>
                        <Text style={styles.title_text}>Nom :{joueur.lastname}</Text>
                        <Text style={styles.id}>N°:{joueur.ultraPosition}</Text>
                    </View>
                </View>
                <View style={styles.description_container}>
                    {joueur.description ? <Text style={styles.description_text} numberOfLines={6}>{joueur.description}</Text> : (
                        <View style={styles.headercontainer}>
                            <View style={styles.header_container}>
                                <Text>cote :</Text>
                                <Text style={styles.description_text}>{joueur.quotation}</Text>
                                <Text>Championship :</Text>
                                <Text style={styles.description_text}>{joueur.stats.currentChampionship}</Text>
                                <Text style={styles.description_text}>Moyenne : {joueur.stats.avgRate}</Text>
                            </View>
                            <View style={styles.header_container}>
                                <Text>percentageStarter</Text>
                                <Text style={styles.description_text}>{joueur.stats.percentageStarter}</Text>
                                <Text>sumGoals</Text>
                                <Text style={styles.description_text}>{joueur.stats.sumGoals}</Text>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main_container: {
        height: 190,
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 2
    },
    image: {
        width: 120,
        height: 180,
        margin: 5,
        backgroundColor: 'gray'
    },
    content_container: {
        flex: 1,
        margin: 5
    },
    header_container: {
        flex: 3,
        flexDirection: 'column',
    },
    header_container2: {
        flex: 3,
        flexDirection: 'row',
    },
    headercontainer: {
        flex: 3,
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 12,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5

    },
    id: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#666666'
    },
    description_container: {
        flex: 7
    },
    description_text: {
        fontStyle: 'italic',
        color: '#666666'
    },
    date_container: {
        flex: 1
    },
    date_text: {
        textAlign: 'right',
        fontSize: 14
    }
});

export default JoueurDetails;