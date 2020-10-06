import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem } from "react-native-elements";
import Axios from 'axios';
const ResultScreen = ({ navigation }) => {
  const joueur = navigation.getParam('item')
  const JoueurId = joueur.substring(7)
  const [result, setResult] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const player = () => {
    try {
      Axios.get(`https://api.monpetitgazon.com/stats/player/${JoueurId}?season=2018`)
        .then(res => {
          setResult(res.data);
        }).then(() => {
          setIsLoaded(true);
        })
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => { player(); }, [])

  if (!isLoaded) {
    return (
      <View style={[styles.Activitycontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#696969" />
      </View>
    )
  } else {
    console.log('stttaattt', result.stats.matches[0].id, result.id);

    return (
      <View style={styles.content_container}>
        <View style={styles.content_container}>
          <View style={styles.headercontainer}>
            <View style={styles.header_container}>
              <Text style={styles.title_text}>Prénom : {result.firstname}</Text>
              <Text style={styles.title_text}>Club : {result.club}</Text>
            </View>

            <View style={styles.header_container2}>
              <Text style={styles.title_text}>Nom :{result.lastname}</Text>
              <Text style={styles.id}>N°:{result.ultraPosition}</Text>
            </View>
          </View>
          {result.stats.percentageSaveShot ? <View style={styles.description_container}>
            <View style={styles.headercontainer}>
              <View style={styles.header_container}>
                <Text>percentageSaveShot :</Text>
                <Text style={styles.description_text}>{result.stats.percentageSaveShot}</Text>
                <Text>percentageStarter :</Text>
                <Text style={styles.description_text}>{result.stats.percentageStarter}</Text>
                <Text>sumCleanSheet</Text>
                <Text style={styles.description_text}>{result.stats.sumCleanSheet}</Text>
                <Text>sumGoals</Text>
                <Text style={styles.description_text}>{result.stats.sumGoals}</Text>
              </View>
              <View style={styles.header_container}>
                <Text>sumPenaltyFaced</Text>
                <Text style={styles.description_text}>{result.stats.sumPenaltyFaced}</Text>
                <Text>sumPenaltySave</Text>
                <Text style={styles.description_text}>{result.stats.sumPenaltySave}</Text>
                <Text>sumRedCard</Text>
                <Text style={styles.description_text}>{result.stats.sumRedCard}</Text>
                <Text>sumSaves</Text>
                <Text style={styles.description_text}>{result.stats.sumSaves}</Text>
              </View>
            </View>
          </View> : <View style={styles.description_container}>
              <View style={styles.headercontainer}>
                <View style={styles.header_container}>
                  <Text>minutesByMatch :</Text>
                  <Text style={styles.description_text}>{result.stats.minutesByMatch}</Text>
                  <Text>AccurateFwdZone :</Text>
                  <Text style={styles.description_text}>{result.stats.percentageAccurateFwdZone}</Text>
                  <Text>AccurateLongPass :</Text>
                  <Text style={styles.description_text}>{result.stats.percentageAccurateLongPass}</Text>
                  <Text>AccuratePassBackZone</Text>
                  <Text style={styles.description_text}>{result.stats.percentageAccuratePassBackZone}</Text>
                </View>
                <View style={styles.header_container}>
                  <Text>percentageLostBall :</Text>
                  <Text style={styles.description_text}>{result.stats.percentageLostBall}</Text>
                  <Text>SucceedPass</Text>
                  <Text style={styles.description_text}>{result.stats.percentageSucceedPass}</Text>
                  <Text>percentageWonDuel</Text>
                  <Text style={styles.description_text}>{result.stats.percentageWonDuel}</Text>
                  <Text>sumGoalAssist</Text>
                  <Text style={styles.description_text}>{result.stats.sumGoalAssist}</Text>
                </View>
              </View>


            </View>}


        </View>
        <View>
        
        </View>
        
        <View style={styles.header_container2}>
        <FlatList
          data={result.stats.matches}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
            
                <ListItem key={item} bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>info du match: </ListItem.Title>
                    <ListItem.Subtitle> a joué {item.info.minsPlayed} min || Note du match {item.info.rate}</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
               
            )
          }}
        />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  Activitycontainer: {
    flex: 1,
    justifyContent: "center"
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
});

export default ResultScreen;
