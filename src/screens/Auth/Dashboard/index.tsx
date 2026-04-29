import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Login from '../Login';
import Header from '../Header';

const LOGIN_OOPTIONS = [
  { id: 0, title: 'Login with Email', color: 'lightblue' },
  { id: 1, title: 'Login with Phone', color: 'lightgreen' },
  { id: 2, title: 'Login Anonymously', color: 'lightpink' },
]

const Dashboard = () => {
  const [select, setSelect] = useState<{
    status: boolean,
    data: Object | null
  }>({
    status: false,
    data: null
  });

  const renderItem = ({ item }: { item: { id: number; title: string, color: string } }) => {
    return (
      <TouchableOpacity style={[styles.listItem, { backgroundColor: item.color }]} onPress={() => setSelect({ status: true, data: item })}>
        <Text style={styles.itemTxt}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  const handleBack = () => {
    setSelect({ status: false, data: null })
  }

  return (
    <>
      {select.status && <Header title={select?.data?.title} onBack={handleBack} />}
      <View style={styles.container}>
        {!select.status ?
          <>
            <Text style={styles.title}>{'Select Your Choice'}</Text>
            <FlatList
              data={LOGIN_OOPTIONS}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItem}
              contentContainerStyle={styles.listContainer}
            />
          </> :
          <Login select={select} />}
      </View>
    </>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
  listContainer: {
    justifyContent: 'center',
    flex: .7
  },
  listItem: { padding: 15, marginVertical: 10 },
  itemTxt: { fontSize: 16, textAlign: 'center', color: 'black' },

})
