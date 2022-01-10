import React, { useEffect, useRef, useState } from 'react';
import Navigation from './src/Navigation';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import { View, Text } from 'react-native';
import globalVars from './src/helpers/globalVars';
import TopLoading from './src/components/extras/topLoading';
import { getData } from './src/helpers/cache';
import { setCustomText } from 'react-native-global-props';
import MainStatusBar from './src/components/extras/statusBar';

function themeConfig() {
  var theme_ = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: globalVars.theme.primaryColor,
      accent: globalVars.theme.accentColor,
    },
  };

  globalVars.selectedColors = DefaultTheme.colors;
  globalVars.selectedColors.primary = globalVars.defaultTheme.primaryColor;
  globalVars.selectedColors.secundary = globalVars.defaultTheme.secundaryColor;

  var customTextProps;

  if (globalVars.theme.mode == 'dark') {
    theme_ = {
      ...DarkTheme,
      roundness: 2,
      colors: {
        ...DarkTheme.colors,
        primary: globalVars.darkTheme.primaryColor,
        accent: globalVars.theme.accentColor,
      },
    };
    globalVars.selectedColors = DarkTheme.colors;
    globalVars.selectedColors.primary = globalVars.darkTheme.primaryColor;
    globalVars.selectedColors.secundary = globalVars.darkTheme.secundaryColor;

    customTextProps = {
      style: {
        color: globalVars.darkTheme.textColor,
      }
    }
  } else {
    customTextProps = {
      style: {
        color: globalVars.defaultTheme.textColor,
      }
    }
  }

  globalVars.currentTheme = theme_;

  setCustomText(customTextProps);

  return theme_;
}

async function getUserInfo() {
  var info = {
    userId: '123asd456',
    themeName: 'default',
  }

  return info;
}

export default function App() {
  var [theme, setTheme] = useState(null);
  var [loadingCache, setLoadingCache] = useState(true);

  useEffect(() => {
    getData('userTheme').then(data => {
      if (data) {
        globalVars.theme.mode = data;
        setTheme(themeConfig());
      }
      if (!data) {
        getUserInfo().then(info => {
          globalVars.theme.mode = info.themeName;
          setTheme(themeConfig());
        })
      }
        setLoadingCache(false);
    });
  }, []);

  const squareRef = useRef(null);
  const doMeasure = square => {
    squareRef.current.measure((width, height, px, py, fx, fy) => {
      const location = {
        fx: fx,
        fy: fy,
        px: px,
        py: py,
        width: width,
        height: height,
      };
      console.log('location', location);
      square.x = fx;
      square.y = fy;
      square.xMax = fx + px;
      square.yMax = fy + py;
    });
  };

  return (
    <>
      {
        !loadingCache ?
          <>
            <MainStatusBar backgroundColor={globalVars.selectedColors.secundary} />
            <PaperProvider theme={theme}>
              <Navigation />
            </PaperProvider>
          </>
          : null
      }
    </>
  );
}


