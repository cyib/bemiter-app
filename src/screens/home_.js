import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function HomeScreen() {
    const baseURL = '';
    const userToken = '';
    const perPage = 5;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {

    },[]);

    async function loadApi(params) {
        if(loading) return;
        setLoading(true);

        const response = await fetch(`${baseURL}/`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            }
        });
    }

    return (
        <View>
            <FlatList
                style={{ marginTop: 35 }}
                contentContainerStyle={{ marginHorizontal: 20 }}
                data={data}
                keyExtractor={item => String(item.id)}
                renderItem={ ({ item }) => <ListItem data={item} /> }
            />
        </View>
    );

}

function ListItem({ data }) {
    return(
        <View style={styles.listItem}>
            <Text style={styles.listText}>
                TESTE
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listItem: {
        
    }
});