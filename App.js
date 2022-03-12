import React, { useEffect, useRef, useState } from 'react';
import Navigation from './src/Navigation';
import { DefaultTheme, DarkTheme, Provider as PaperProvider } from 'react-native-paper';
import globalVars from './src/helpers/globalVars';
import { getData } from './src/helpers/cache';
import { setCustomText } from 'react-native-global-props';
import MainStatusBar from './src/components/extras/statusBar';
import HomeInitScreen from './src/screens/homeInit';

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
  globalVars.selectedColors.backopaque = globalVars.defaultTheme.backopaqueColor;
  globalVars.selectedColors.backgroundSecondColor = globalVars.defaultTheme.backgroundSecondColor;

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
    globalVars.selectedColors.backopaque = globalVars.darkTheme.backopaqueColor;
    globalVars.selectedColors.backgroundSecondColor = globalVars.darkTheme.backgroundSecondColor;

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
    themeName: 'default',
  }

  return info;
}

export default function App() {
  var [theme, setTheme] = useState(null);
  var [isLogged, setIsLogged] = useState(false);
  var [loadingCache, setLoadingCache] = useState(true);

  var [globalRefresh, setGlobalRefresh] = useState(false);

  global.globalRefresh = () => {
    setGlobalRefresh(!globalRefresh);
  };

  useEffect(() => {
    getLoginFromLocalStorage();
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
    }).catch(e => {
      globalVars.theme.mode = 'default';
      setTheme(themeConfig());
    });
  }, [globalRefresh]);

  var getLoginFromLocalStorage = () => {
    getData('token').then(data => {
      setIsLogged(data ? true : false);
    }).catch(e => {
      setIsLogged(false);
    });
  }

  return (
    <>
      {
        !loadingCache ?
          <>
            {
              !isLogged ?
                <>
                  <HomeInitScreen setIsLogged={setIsLogged} />
                </>
                :
                <>
                  {
                    theme ? <>
                      <MainStatusBar backgroundColor={globalVars.selectedColors.secundary} />
                      <PaperProvider theme={theme}>
                        <Navigation />
                      </PaperProvider>
                    </> : null
                  }
                </>
            }
          </>
          : null
      }
    </>
  );
}


