import React from 'react';
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import MUIRichTextEditor from '../../';
import { TMUIRichTextEditorStyles } from '../../';

export const defaultTheme = createTheme({
    palette: {
        primary: {
            main: "#000000"
        }
    }
});

const muiRteTheme = {
    overrides: {
        MUIRichTextEditor: {
            root: {
                backgroundColor: "#ebebeb",
            },
            container: {
                display: "flex",
                flexDirection: "column-reverse"
            },
            editor: {
                backgroundColor: "#ebebeb",
                padding: "20px",
                height: "200px",
                maxHeight: "200px",
                overflow: "auto"
            },
            toolbar: {
                borderTop: "1px solid gray",
                backgroundColor: "#ebebeb"
            },
            placeHolder: {
                backgroundColor: "#ebebeb",
                paddingLeft: 20,
                width: "inherit",
            },
            anchorLink: {
                color: "#333333",
                textDecoration: "underline"
            }
        }
    }
};

Object.assign(defaultTheme, muiRteTheme);

const save = (data) => {
    console.log(data);
};

const Themed = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <MUIRichTextEditor
                label="Type something here..."
                onSave={save}
            />
        </ThemeProvider>
    );
};

export default Themed;
