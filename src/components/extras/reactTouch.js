import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, TouchableOpacity } from "react-native";

const ReactTouch = (props) => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value
                });
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y }
                ]
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
            }
        })
    ).current;

    return (
            <View style={styles.container}>
                <Animated.View
                onTouchStart={() => { props.setScrollEnabled(false); }}
                    style={{
                        transform: [{ translateX: pan.x }, { translateY: pan.y }]
                    }}
                    {...panResponder.panHandlers}
                >
                    <View style={styles.box} />
                </Animated.View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: "bold"
    },
    box: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5
    }
});

export default ReactTouch;