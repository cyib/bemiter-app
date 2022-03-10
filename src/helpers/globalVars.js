module.exports = {
    //Theme
    theme: {
        mode: 'default', //default, dark
        primaryColor: '#3498db',
        secundaryColor: '#95c5e5',
        accentColor: 'gray',
    },
    defaultTheme: {
        textColor: '#1a1a1a',
        primaryColor: '#369ae1',
        secundaryColor: '#8ec9f3',
        backopaqueColor: '#00000007',
        backgroundSecondColor: '#e5ebef',
    },
    darkTheme: {
        textColor: '#F1FAEE',
        primaryColor: '#3381ca',
        secundaryColor: '#3c4043',
        backopaqueColor: '#ffffff0c',
        backgroundSecondColor: '#45454533',
    },
    selectedColors: {
        secundary: '',
        primary: '',
        background: '',
        surface: '',
        accent: '',
        error: '',
        text: '',
        onSurface: '',
        disabled: '',
        placeholder: '',
        backdrop: '',
        notification: '',
        backopaque: ''
    },
    currentTheme: {
        colors: {
            primary: '',
            background: '',
            surface: '',
            accent: '',
            error: '',
            text: '',
            onSurface: '',
            disabled: '',
            placeholder: '',
            backdrop: '',
            notification: '',
        }
    },

    devlog: "",
    placeholders: {
        images: {
            profile: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl8UcJiZxXc_q-Zr-1dohkW5sd8lTxvpPj-g&usqp=CAU`
        },
    },

    //Header
    header: {
        style: {
            backgroundColor: 'gray',
            color: 'white',
        },
        title: 'Bemiter alpha v0.01',
    },

    //Footer
    footer: {
        bottonBarColor: 'gray',
    },

    //Tab
    tab: {
        tabIconColorPrimary: 'black',
        tabIconColorSecundary: 'gray',
    }
}