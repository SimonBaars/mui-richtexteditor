import React, { FunctionComponent } from 'react';
import { Chip, Avatar, Button } from '@mui/material';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import MUIRichTextEditor, { TToolbarComponentProps } from '../../';
import { EditorState } from 'draft-js';

const save = (data) => {
    console.log(data);
};

const MyBlock = (props) => {
    return (
        <div style={{
            padding: 10,
            backgroundColor: "#ebebeb"
        }}>
            My Block says:
            {props.children}
        </div>
    );
};

const MyCallbackComponent = (props) => {
    return (
        <Chip
            id={props.id}
            avatar={<Avatar>C</Avatar>}
            onClick={props.onMouseDown}
            label="Callback"
            disabled={props.disabled}
        />
    );
};

const ClearComponent = (props) => {
    return (
        <Chip
            id={props.id}
            onClick={props.onMouseDown}
            label="Clear all"
            disabled={props.disabled}
        />
    );
};

const MyBlockComponent = (props) => {
    return (
        <Button
            id={props.id}
            variant="contained"
            onMouseDown={props.onMouseDown}
            color={props.active ? "primary" : "inherit"}
            disabled={props.disabled}
        >
            My Block
        </Button>
    );
};

const CustomControls = () => {
    return (
        <MUIRichTextEditor
            label="Type something here..."
            onSave={save}
            controls={["title", "bold", "my-block", "my-style", "clear", "my-callback", "clear-callback", "save"]}
            customControls={[
                {
                    name: "my-style",
                    icon: <InvertColorsIcon />,
                    type: "inline",
                    inlineStyle: {
                        backgroundColor: "black",
                        color: "white"
                    }
                },
                {
                    name: "my-block",
                    component: MyBlockComponent,
                    type: "block",
                    blockWrapper: <MyBlock />
                },
                {
                    name: "my-callback",
                    component: MyCallbackComponent,
                    type: "callback",
                    onClick: (_editorState, name, _anchor) => {
                        console.log(`Clicked ${name} control`);
                    }
                },
                {
                    name: "clear-callback",
                    component: ClearComponent,
                    type: "callback",
                    onClick: () => {
                        return EditorState.createEmpty();
                    }
                }
            ]}
        />
    );
};

export default CustomControls;
