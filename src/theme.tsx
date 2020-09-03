import { createMuiTheme } from "@material-ui/core/styles"
import { zhCN, idID } from "@material-ui/core/locale"
// A custom theme for this app
const theme = createMuiTheme(
  {
    palette: {
      primary: {
        main: "#FFD100",
      },
      secondary: {
        main: "#FFED9E",
      },
      error: {
        main: "#E02020",
      },
      background: {
        default: "#F2F2F0",
      },
      text: {
        primary: "#222222",
        secondary: "#555555",
        disabled: "#959593",
        hint: "#959593",
      },
    },
    typography: {
      fontSize: 12,
    },
    overrides: {
      MuiInputLabel: {
        root: {
          "&$focused": {
            color: "#222222",
          },
          "&$formControl": {
            left: 15,
            paddingTop: 12,
          },
        },
      },
      MuiInputBase: {
        root: {
          "&$disabled": {
            color: "#222222"
          }
        }
      },
      MuiInput: {
        input: {
          marginLeft: 4,
          marginRight: 4,
          padding: 12,
          minHeight: 26,
          fontWeight: 500,
          "&::placeholder": {
            color: "#444444",
            fontWeight: "normal",
          },
        },
        underline: {
          "&:before": {
            borderBottom: "1px solid #D8D8D8",
          },
          "&:hover:not($disabled):not($focused):not($error):before": {
            borderBottom: "0px solid #D8D8D8 !important",
          },
        },
      },
      MuiFormLabel: {
        root: {
          "&$disabled": {
            color: "#555555"
          }
        }
      },
      MuiFormHelperText: {
        root: { paddingLeft: 12 },
      },
      MuiTab: {
        root: {
          textTransform: "inherit",
        },
      },
      MuiButton: {
        root: {
          lineHeight: "0",
          textTransform: "inherit",
        },
        label: {
          fontWeight: 600,
        },
        outlined: {
          borderWidth: "2px",
          borderColor: "#FFD100",
          color: "#292929",
        },
      },
      MuiFormControl: {
        root: {
          backgroundColor: "#fff",
        },
      },

      MuiAccordion: {
        root: {
          "&$expanded": {
            margin: 0,
            borderTop: "1px solid #dedede",
            borderBottom: "1px solid #dedede",
          },
        },
      },
      MuiAccordionSummary: {
        content: {
          "&$expanded": {
            marginBottom: "0",
          },
        },
      },
    },
  },
  process.env.REACT_APP_LANG === "en" ? zhCN : idID
)

export default theme
