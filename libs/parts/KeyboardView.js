import React from "react";
import {
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  I18nManager,
  Image,
} from "react-native";

const KeyboardView = ({
  keyboardOnPress,
  keyboardViewStyle,
  keyboardViewTextStyle,
  pinLength,
  onComplete,
  bgColor,
  returnType,
  textColor,
  animatedDeleteButton,
  deleteText,
  animatedDeleteButtonOnPress,
  styles,
  onPress,
}) => {
  let data;
  if (I18nManager.isRTL) {
    data = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "",
      "0",
      deleteText,
      null,
    ].reverse();
  } else {
    data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", deleteText];
  }
  const renderItem = ({ item, index }) => {
    let style;
    let onPressInactive;
    if (item === deleteText) {
      onPressInactive = animatedDeleteButtonOnPress;
      style = [
        styles[0],
        {
          opacity: animatedDeleteButton,
        },
      ];
      return (
        <TouchableOpacity
          key={"key-item-" + index}
          activeOpacity={0.9}
          onPress={() =>
            keyboardOnPress(item, returnType, pinLength, onComplete, onPress)
          }
          disabled={onPressInactive}
        >
          <Animated.View
            style={[
              style,
              {
                backgroundColor: bgColor,
              },
              keyboardViewStyle,
            ]}
          >
            <Image
              style={[
                styles[1],
                {
                  color: textColor,
                  opacity: 1,
                },
                keyboardViewTextStyle,
              ]}
              source={require("../../backspace.png")}
            />
          </Animated.View>
        </TouchableOpacity>
      );
    } else {
      onPressInactive = false;
      style = [styles[0]];
    }
    return (
      <TouchableOpacity
        key={"key-item-" + index}
        activeOpacity={0.9}
        onPress={() =>
          keyboardOnPress(item, returnType, pinLength, onComplete, onPress)
        }
        disabled={onPressInactive || item === ""}
      >
        <Animated.View
          style={[
            style,
            {
              backgroundColor: bgColor,
            },
            keyboardViewStyle,
          ]}
        >
          <Text
            style={[
              styles[1],
              {
                color: textColor,
                opacity: 1,
              },
              keyboardViewTextStyle,
            ]}
          >
            {item}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      contentContainerStyle={{
        flexDirection: I18nManager.isRTL ? "column-reverse" : "column",
        alignItems: I18nManager.isRTL ? "flex-end" : "flex-start",
      }}
      scrollEnabled={false}
      horizontal={false}
      vertical={true}
      numColumns={3}
      renderItem={renderItem}
      data={data}
      keyExtractor={(val, index) => "pinViewItem-" + index}
    />
  );
};
export default KeyboardView;
